#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const basePath = "/Users/shaokaiwen/Library/Mobile Documents/com~apple~CloudDocs/TEACHER/INC/Powerpoint";
const outputPath = path.join(__dirname, "../js/powerpoint-resources.js");
const ignoredNames = new Set([".DS_Store", "Thumbs.db"]);
const allowedExtensions = new Set([
  ".ppt",
  ".pptx",
  ".pdf",
  ".doc",
  ".docx",
  ".url",
  ".py",
  ".txt",
  ".csv",
  ".html",
  ".htm",
  ".bmp",
  ".png",
  ".jpg",
  ".jpeg",
  ".mp3",
  ".mp4"
]);

function walk(folder){
  if(!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    if(ignoredNames.has(entry.name) || entry.name.startsWith("~$")) return [];
    const fullPath = path.join(folder, entry.name);
    if(entry.isDirectory()) return walk(fullPath);
    const ext = path.extname(entry.name).toLowerCase();
    if(!allowedExtensions.has(ext)) return [];
    return [fullPath];
  });
}

function cleanTitle(filePath){
  return path.basename(filePath, path.extname(filePath))
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferChapter(filePath){
  const relative = path.relative(basePath, filePath);
  const match = relative.match(/chapter\s*0?(\d+)/i) || relative.match(/\bch(?:apter)?\s*0?(\d+)/i);
  return match ? Number(match[1]) : null;
}

function inferTopic(filePath){
  const parts = path.relative(basePath, filePath).split(path.sep);
  const topicPart = parts.find(part => /^T\d+\b/i.test(part));
  if(!topicPart) return { topicNumber: null, topic: "Chapter resources" };
  const match = topicPart.match(/^T(\d+)\s*(.*)$/i);
  return {
    topicNumber: match ? Number(match[1]) : null,
    topic: match && match[2] ? match[2].replace(/[-_]+/g, " ").trim() : topicPart
  };
}

function inferKind(filePath){
  const text = filePath.toLowerCase();
  const ext = path.extname(filePath).toLowerCase();
  if(ext === ".ppt" || ext === ".pptx") return "presentation";
  if(ext === ".url") return "video-link";
  if(text.includes("answer")) return "answer";
  if(text.includes("homework") || /\bhw\b/.test(text)) return "homework";
  if(text.includes("worksheet") || /\bws\b/.test(text)) return "worksheet";
  if(text.includes("lesson plan")) return "lesson-plan";
  if(ext === ".py") return "code";
  if([".bmp", ".png", ".jpg", ".jpeg"].includes(ext)) return "media";
  if([".mp3", ".mp4"].includes(ext)) return "media";
  if(ext === ".pdf") return "pdf";
  if(ext === ".doc" || ext === ".docx") return "document";
  return "resource";
}

function readUrlShortcut(filePath){
  if(path.extname(filePath).toLowerCase() !== ".url") return null;
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^URL=(.+)$/im);
  return match ? match[1].trim() : null;
}

function toResource(filePath, index){
  const ext = path.extname(filePath).toLowerCase().replace(".", "");
  const topic = inferTopic(filePath);
  const externalUrl = readUrlShortcut(filePath);
  return {
    id: `ppt-${String(index + 1).padStart(4, "0")}`,
    chapter: inferChapter(filePath),
    topicNumber: topic.topicNumber,
    topic: topic.topic,
    kind: inferKind(filePath),
    title: cleanTitle(filePath),
    ext,
    href: externalUrl || pathToFileURL(filePath).href,
    path: filePath
  };
}

const resources = walk(basePath)
  .map(toResource)
  .filter(item => Number.isInteger(item.chapter) && item.chapter >= 1 && item.chapter <= 10)
  .sort((a, b) => (
    a.chapter - b.chapter ||
    (a.topicNumber || 99) - (b.topicNumber || 99) ||
    a.kind.localeCompare(b.kind) ||
    a.title.localeCompare(b.title)
  ));

const payload = `window.POWERPOINT_RESOURCES = ${JSON.stringify({
  generatedAt: new Date().toISOString(),
  basePath,
  resources
}, null, 2)};

window.getChapterResources = id => window.POWERPOINT_RESOURCES.resources.filter(item => item.chapter === Number(id));
`;

fs.writeFileSync(outputPath, payload);
console.log(`Indexed ${resources.length} PowerPoint-folder resources.`);
