#!/usr/bin/env node

const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

global.window = {};
require(path.join(__dirname, "../js/powerpoint-resources.js"));

const outputPath = path.join(__dirname, "../js/lesson-slides.js");
const thumbnailDir = path.join(__dirname, "../assets/lesson-thumbnails");
const thumbnailTempDir = path.join(thumbnailDir, ".tmp");
const presentations = window.POWERPOINT_RESOURCES.resources.filter(item => item.kind === "presentation" && item.ext === "pptx");

fs.mkdirSync(thumbnailDir, { recursive: true });
fs.rmSync(thumbnailTempDir, { recursive: true, force: true });
fs.mkdirSync(thumbnailTempDir, { recursive: true });

function unzipList(filePath){
  return execFileSync("unzip", ["-Z1", filePath], { encoding: "utf8", maxBuffer: 1024 * 1024 * 12 })
    .split(/\r?\n/)
    .filter(name => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => Number(a.match(/slide(\d+)\.xml/)[1]) - Number(b.match(/slide(\d+)\.xml/)[1]));
}

function unzipEntry(filePath, entry){
  return execFileSync("unzip", ["-p", filePath, entry], { encoding: "utf8", maxBuffer: 1024 * 1024 * 12 });
}

function decodeXml(text){
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function extractParagraphs(xml){
  const paragraphs = [];
  const paragraphMatches = xml.match(/<a:p[\s\S]*?<\/a:p>/g) || [];
  paragraphMatches.forEach(paragraphXml => {
    const runs = [...paragraphXml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map(match => decodeXml(match[1]));
    const text = runs.join(" ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .replace(/\b([A-Z]) ([a-z]{2,})\b/g, "$1$2")
      .replace(/\s+/g, " ")
      .trim();
    if(text && !isDecorativeFooter(text)) paragraphs.push(text);
  });
  return [...new Set(paragraphs)];
}

function slugify(text){
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70) || "lesson";
}

function makeThumbnail(resource){
  const fileName = `chapter-${resource.chapter}-topic-${resource.topicNumber || "x"}-${slugify(resource.title)}.png`;
  const outPath = path.join(thumbnailDir, fileName);
  if(fs.existsSync(outPath)) return `../assets/lesson-thumbnails/${fileName}`;

  fs.rmSync(thumbnailTempDir, { recursive: true, force: true });
  fs.mkdirSync(thumbnailTempDir, { recursive: true });
  execFileSync("qlmanage", ["-t", "-s", "1440", "-o", thumbnailTempDir, resource.path], { encoding: "utf8", stdio: "pipe" });
  const generated = fs.readdirSync(thumbnailTempDir).find(name => name.toLowerCase().endsWith(".png"));
  if(!generated) return "../assets/lesson-backgrounds/cs-fallback.png";

  const generatedPath = path.join(thumbnailTempDir, generated);
  try{
    execFileSync("sips", ["-s", "format", "png", "--resampleWidth", "1440", generatedPath, "--out", outPath], { encoding: "utf8", stdio: "pipe" });
  }catch(error){
    fs.copyFileSync(generatedPath, outPath);
  }
  return `../assets/lesson-thumbnails/${fileName}`;
}

function isDecorativeFooter(text){
  return /^kevin shao\b/i.test(text) || /^office:/i.test(text) || /^8282$/.test(text);
}

function normaliseSlide(resource, entry, xml){
  const slideNumber = Number(entry.match(/slide(\d+)\.xml/)[1]);
  const paragraphs = extractParagraphs(xml);
  const title = paragraphs.find(line => line.length >= 3) || `Slide ${slideNumber}`;
  const body = paragraphs.filter(line => line !== title).slice(0, 10);
  return {
    number: slideNumber,
    title,
    lines: body
  };
}

function extractDeck(resource){
  try{
    const entries = unzipList(resource.path);
    const slides = entries
      .map(entry => normaliseSlide(resource, entry, unzipEntry(resource.path, entry)))
      .filter(slide => slide.title || slide.lines.length);
    return {
      resourceId: resource.id,
      chapter: resource.chapter,
      topicNumber: resource.topicNumber,
      topic: resource.topic,
      title: resource.title,
      href: resource.href,
      path: resource.path,
      thumbnail: makeThumbnail(resource),
      fallbackBackground: "../assets/lesson-backgrounds/cs-fallback.png",
      slideCount: slides.length,
      slides
    };
  }catch(error){
    return {
      resourceId: resource.id,
      chapter: resource.chapter,
      topicNumber: resource.topicNumber,
      topic: resource.topic,
      title: resource.title,
      href: resource.href,
      path: resource.path,
      slideCount: 0,
      slides: [],
      error: error.message
    };
  }
}

const decks = presentations.map(extractDeck).filter(deck => deck.slideCount > 0);
const chapters = decks.reduce((acc, deck) => {
  const key = String(deck.chapter);
  acc[key] = acc[key] || { decks: [] };
  acc[key].decks.push(deck);
  return acc;
}, {});

Object.values(chapters).forEach(chapter => {
  chapter.decks.sort((a, b) => (a.topicNumber || 99) - (b.topicNumber || 99) || a.title.localeCompare(b.title));
});

const payload = `window.LESSON_SLIDES = ${JSON.stringify({
  generatedAt: new Date().toISOString(),
  source: window.POWERPOINT_RESOURCES.basePath,
  chapters
}, null, 2)};

window.getChapterLessonDecks = id => {
  const chapter = window.LESSON_SLIDES.chapters[String(Number(id))];
  return chapter ? chapter.decks : [];
};
`;

fs.writeFileSync(outputPath, payload);
fs.rmSync(thumbnailTempDir, { recursive: true, force: true });
console.log(`Extracted ${decks.length} PowerPoint lesson decks.`);
