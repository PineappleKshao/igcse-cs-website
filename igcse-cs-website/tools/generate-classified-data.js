const fs = require("fs");
const path = require("path");

const classifiedRoot = "/Users/shaokaiwen/Library/Mobile Documents/com~apple~CloudDocs/TEACHER/INC/ClassifiedPaper";
const outputPath = "/Users/shaokaiwen/Library/Mobile Documents/com~apple~CloudDocs/TEACHER/Website/igcse-cs-website/js/classified-papers.js";

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".DS_Store" || entry.name === "Thumbs.db" || entry.name.startsWith("~$")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(docx|pdf)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function inferChapter(filePath) {
  const match = filePath.match(/Chapter\s*([0-9]{1,2})/i);
  return match ? Number(match[1]) : null;
}

function inferYear(filePath) {
  const match = filePath.match(/\/(20[0-9]{2})\//);
  return match ? Number(match[1]) : null;
}

function inferKind(filePath) {
  return /ans|answer/i.test(path.basename(filePath)) ? "answer" : "question";
}

function title(filePath) {
  return path.basename(filePath).replace(/\.[^.]+$/, "").replace(/\s+/g, " ").trim();
}

const papers = walk(classifiedRoot)
  .map(filePath => ({
    chapter: inferChapter(filePath),
    year: inferYear(filePath),
    kind: inferKind(filePath),
    title: title(filePath),
    fileName: path.basename(filePath),
    href: encodeURI(`file://${filePath}`),
    path: filePath,
    ext: path.extname(filePath).slice(1).toLowerCase()
  }))
  .filter(item => item.chapter && item.year)
  .sort((a, b) => a.chapter - b.chapter || a.year - b.year || a.kind.localeCompare(b.kind));

const counts = papers.reduce((acc, paper) => {
  acc[paper.chapter] = acc[paper.chapter] || { question: 0, answer: 0, years: [] };
  acc[paper.chapter][paper.kind] += 1;
  if (!acc[paper.chapter].years.includes(paper.year)) acc[paper.chapter].years.push(paper.year);
  return acc;
}, {});

const payload = {
  generatedAt: new Date().toISOString(),
  root: classifiedRoot,
  counts,
  papers
};

fs.writeFileSync(outputPath, `window.CLASSIFIED_PAPERS = ${JSON.stringify(payload, null, 2)};\n`);
console.log(`Wrote ${papers.length} classified paper files.`);
