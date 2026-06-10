(function(){
  const plan = window.YEAR_PLAN;
  const chapters = window.CHAPTERS || [];
  const storageKey = "igcse_year1_timeline_state_v1";
  const state = loadState();

  const timelineBoard = document.getElementById("timelineBoard");
  const threeYearPath = document.getElementById("threeYearPath");
  const milestoneMount = document.getElementById("plannerMilestones");
  const filter = document.getElementById("plannerFilter");
  const chapterFilter = document.getElementById("plannerChapterFilter");
  const dialog = document.getElementById("planDialog");
  const form = document.getElementById("planForm");

  document.getElementById("plannerRationale").textContent = plan.meta.rationale;
  populateChapterFilter();
  render();

  filter.addEventListener("change", renderTimeline);
  chapterFilter.addEventListener("change", renderTimeline);
  document.getElementById("plannerResetBtn").addEventListener("click", resetPlan);
  document.getElementById("plannerExportBtn").addEventListener("click", exportPlan);
  document.getElementById("dialogSaveBtn").addEventListener("click", saveDialog);

  function loadState(){
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    const merged = {};
    plan.weeks.forEach(item => {
      const existing = saved[item.week] || {};
      merged[item.week] = {
        status: existing.status || item.defaultStatus || "not start",
        startDate: existing.startDate || "",
        lessons: existing.lessons || item.lessons,
        notes: existing.notes || ""
      };
    });
    return merged;
  }

  function saveState(){
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function populateChapterFilter(){
    const entries = [
      ...chapters.map(chapter => [String(chapter.id), `Chapter ${chapter.id}: ${chapter.title}`]),
      ["review", "Review / Assessment"]
    ];
    entries.forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      chapterFilter.append(option);
    });
  }

  function render(){
    renderThreeYearPath();
    renderMilestones();
    renderTimeline();
    updateProgress();
  }

  function renderThreeYearPath(){
    threeYearPath.innerHTML = plan.threeYearPath.map((year, index) => `
      <article class="year-path-card ${index === 0 ? "active" : ""}">
        <span>${year.year}</span>
        <h2>${escapeHtml(year.focus)}</h2>
        <b>${escapeHtml(year.chapters)}</b>
        <p>${escapeHtml(year.description)}</p>
        <em class="status-pill ${statusClass(year.status)}">${labelStatus(year.status)}</em>
      </article>
    `).join("");
  }

  function renderMilestones(){
    milestoneMount.innerHTML = plan.milestones.map(milestone => `
      <button class="milestone-item" data-week="${milestone.week}" type="button">
        <span>Week ${milestone.week}</span>
        <b>${escapeHtml(milestone.title)}</b>
        <small>${escapeHtml(milestone.description)}</small>
      </button>
    `).join("");
    milestoneMount.querySelectorAll("[data-week]").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelector(`[data-plan-week="${button.dataset.week}"]`)?.scrollIntoView({ behavior:"smooth", block:"center" });
      });
    });
  }

  function renderTimeline(){
    const statusValue = filter.value;
    const chapterValue = chapterFilter.value;
    const visible = plan.weeks.filter(item => {
      const itemState = state[item.week];
      const statusMatch = statusValue === "all" || itemState.status === statusValue;
      const chapterMatch = chapterValue === "all" || String(item.chapter) === chapterValue;
      return statusMatch && chapterMatch;
    });
    timelineBoard.innerHTML = visible.map(renderWeek).join("");
    timelineBoard.querySelectorAll("[data-plan-week]").forEach(card => {
      card.addEventListener("click", () => openDialog(Number(card.dataset.planWeek)));
    });
    updateProgress();
  }

  function renderWeek(item){
    const itemState = state[item.week];
    const chapterMeta = chapters.find(chapter => chapter.id === Number(item.chapter));
    const accent = chapterMeta ? chapterMeta.accent : "#1d1d1f";
    const date = itemState.startDate ? formatDate(itemState.startDate) : "date unset";
    return `<article class="timeline-item status-${statusClass(itemState.status)}" data-plan-week="${item.week}" style="--chapter-accent:${accent}">
      <div class="timeline-node">
        <span>${String(item.week).padStart(2, "0")}</span>
      </div>
      <div class="timeline-card">
        <div class="timeline-card-head">
          <div>
            <p class="kicker">Week ${item.week} · ${itemState.lessons} lessons · ${date}</p>
            <h2>${escapeHtml(item.title)}</h2>
            <p>${escapeHtml(item.section)}</p>
          </div>
          <em class="status-pill ${statusClass(itemState.status)}">${labelStatus(itemState.status)}</em>
        </div>
        <div class="timeline-meta">
          <span>${escapeHtml(item.chapterTitle)}</span>
          <span>${escapeHtml(item.assessment)}</span>
        </div>
        <div class="timeline-objectives">
          ${item.objectives.slice(0, 3).map(objective => `<span>${escapeHtml(objective)}</span>`).join("")}
        </div>
        ${itemState.notes ? `<p class="timeline-note">${escapeHtml(itemState.notes)}</p>` : ""}
      </div>
    </article>`;
  }

  function openDialog(week){
    const item = plan.weeks.find(entry => entry.week === week);
    const itemState = state[week];
    if(!item || !itemState) return;

    document.getElementById("dialogWeek").value = week;
    document.getElementById("dialogKicker").textContent = `Week ${week} · ${item.chapterTitle}`;
    document.getElementById("dialogTitle").textContent = item.title;
    document.getElementById("dialogStatus").value = itemState.status;
    document.getElementById("dialogStartDate").value = itemState.startDate;
    document.getElementById("dialogLessons").value = itemState.lessons;
    document.getElementById("dialogNotes").value = itemState.notes;
    document.getElementById("dialogDetail").innerHTML = renderDialogDetail(item);

    if(typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "open");
  }

  function renderDialogDetail(item){
    return `<div class="dialog-section-grid">
      <article>
        <h3>Objectives</h3>
        <ul>${item.objectives.map(text => `<li>${escapeHtml(text)}</li>`).join("")}</ul>
      </article>
      <article>
        <h3>Lesson Flow</h3>
        <ol>${item.lessonFlow.map(text => `<li>${escapeHtml(text)}</li>`).join("")}</ol>
      </article>
      <article>
        <h3>Assessment</h3>
        <p>${escapeHtml(item.assessment)}</p>
      </article>
      <article>
        <h3>Open Resources</h3>
        <div class="dialog-resource-row">
          ${item.resources.map(resource => `<a href="${escapeHtml(resource)}">${escapeHtml(resource.replace(/^chapters\//, "").replace(".html", ""))}</a>`).join("")}
        </div>
      </article>
    </div>`;
  }

  function saveDialog(){
    const week = Number(document.getElementById("dialogWeek").value);
    state[week] = {
      status: document.getElementById("dialogStatus").value,
      startDate: document.getElementById("dialogStartDate").value,
      lessons: Number(document.getElementById("dialogLessons").value || 3),
      notes: document.getElementById("dialogNotes").value.trim()
    };
    saveState();
    renderTimeline();
    if(dialog.open) dialog.close();
  }

  function updateProgress(){
    const totalLessons = Object.values(state).reduce((sum, item) => sum + Number(item.lessons || 0), 0);
    const finishedLessons = Object.values(state).reduce((sum, item) => item.status === "finished" ? sum + Number(item.lessons || 0) : sum, 0);
    const percent = totalLessons ? Math.round((finishedLessons / totalLessons) * 100) : 0;
    document.getElementById("plannerProgressText").textContent = `${percent}%`;
    document.getElementById("plannerProgressBar").style.width = `${percent}%`;
    document.getElementById("plannerLessonCount").textContent = `${finishedLessons} / ${totalLessons} lessons finished`;
  }

  function resetPlan(){
    if(!confirm("Reset all timeline status, dates and notes in this browser?")) return;
    localStorage.removeItem(storageKey);
    Object.assign(state, loadState());
    renderTimeline();
  }

  function exportPlan(){
    const headers = [
      "Week",
      "Chapter",
      "Chapter title",
      "Section",
      "Topic",
      "Status",
      "Start date",
      "Lessons",
      "Objectives",
      "Lesson flow",
      "Assessment",
      "Resources",
      "Teacher notes"
    ];
    const rows = plan.weeks.map(item => {
      const itemState = state[item.week];
      return [
        item.week,
        item.chapter === "review" ? "Review" : `Chapter ${item.chapter}`,
        item.chapterTitle,
        item.section,
        item.title,
        labelStatus(itemState.status),
        itemState.startDate,
        itemState.lessons,
        item.objectives.join("\n"),
        item.lessonFlow.join("\n"),
        item.assessment,
        item.resources.join("\n"),
        itemState.notes
      ];
    });
    const generatedAt = new Date().toLocaleString();
    const workbookRows = [
      ["IGCSE Computer Science Year 1 Teaching Timeline"],
      [plan.meta.rationale],
      [`Exported: ${generatedAt}`],
      ["Default route: Chapter 1 → Chapter 10 → Chapter 3 → Chapter 2 → Chapter 4"],
      headers,
      ...rows
    ];
    const blob = createXlsxBlob(workbookRows);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "igcse-cs-year1-teaching-plan.xlsx";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function statusClass(status){
    return String(status || "not start").replace(/\s+/g, "-");
  }

  function labelStatus(status){
    return {
      "not start":"Not started",
      "in progress":"In progress",
      "finished":"Finished"
    }[status] || status;
  }

  function formatDate(value){
    const date = new Date(`${value}T00:00:00`);
    if(Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, { month:"short", day:"numeric" });
  }

  function escapeHtml(text){
    return String(text ?? "").replace(/[&<>"']/g, char => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#039;"
    }[char]));
  }

  function excelText(value){
    const text = String(value ?? "");
    const safeText = /^[=+\-@]/.test(text.trim()) ? `'${text}` : text;
    return escapeHtml(safeText);
  }

  function createXlsxBlob(rows){
    const files = {
      "[Content_Types].xml": contentTypesXml(),
      "_rels/.rels": rootRelsXml(),
      "docProps/app.xml": appXml(),
      "docProps/core.xml": coreXml(),
      "xl/workbook.xml": workbookXml(),
      "xl/_rels/workbook.xml.rels": workbookRelsXml(),
      "xl/styles.xml": stylesXml(),
      "xl/worksheets/sheet1.xml": worksheetXml(rows)
    };
    return new Blob([buildZip(files)], {
      type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
  }

  function worksheetXml(rows){
    const colWidths = [8, 14, 24, 24, 34, 16, 14, 10, 44, 46, 34, 34, 42];
    const sheetRows = rows.map((row, rowIndex) => {
      const rowNumber = rowIndex + 1;
      const style = rowNumber === 1 ? 1 : rowNumber < 5 ? 2 : rowNumber === 5 ? 3 : 4;
      const cells = row.map((value, colIndex) => {
        const ref = `${columnName(colIndex + 1)}${rowNumber}`;
        return `<c r="${ref}" t="inlineStr" s="${style}"><is><t xml:space="preserve">${xlsxText(value)}</t></is></c>`;
      }).join("");
      const height = rowNumber === 1 ? 26 : rowNumber === 5 ? 22 : rowNumber > 5 ? 72 : 20;
      return `<row r="${rowNumber}" ht="${height}" customHeight="1">${cells}</row>`;
    }).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="5" topLeftCell="A6" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <cols>${colWidths.map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${width}" customWidth="1"/>`).join("")}</cols>
  <sheetData>${sheetRows}</sheetData>
  <mergeCells count="4"><mergeCell ref="A1:M1"/><mergeCell ref="A2:M2"/><mergeCell ref="A3:M3"/><mergeCell ref="A4:M4"/></mergeCells>
  <autoFilter ref="A5:M${rows.length}"/>
</worksheet>`;
  }

  function contentTypesXml(){
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
  }

  function rootRelsXml(){
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
  }

  function workbookXml(){
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Year 1 Plan" sheetId="1" r:id="rId1"/></sheets>
</workbook>`;
  }

  function workbookRelsXml(){
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  }

  function appXml(){
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>IGCSE CS Teaching Companion</Application>
</Properties>`;
  }

  function coreXml(){
    const now = new Date().toISOString();
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>IGCSE CS Year 1 Teaching Plan</dc:title>
  <dc:creator>IGCSE CS Teaching Companion</dc:creator>
  <cp:lastModifiedBy>IGCSE CS Teaching Companion</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`;
  }

  function stylesXml(){
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3">
    <font><sz val="11"/><name val="Arial"/></font>
    <font><b/><sz val="14"/><color rgb="FFFFFFFF"/><name val="Arial"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Arial"/></font>
  </fonts>
  <fills count="4">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF1D1D1F"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF5F5F7"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFD9DDE5"/></left><right style="thin"><color rgb="FFD9DDE5"/></right><top style="thin"><color rgb="FFD9DDE5"/></top><bottom style="thin"><color rgb="FFD9DDE5"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="5">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  }

  function buildZip(files){
    const encoder = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;
    Object.entries(files).forEach(([name, content]) => {
      const nameBytes = encoder.encode(name);
      const data = encoder.encode(content);
      const crc = crc32(data);
      const localHeader = zipLocalHeader(nameBytes, data, crc);
      localParts.push(localHeader, data);
      centralParts.push(zipCentralHeader(nameBytes, data, crc, offset));
      offset += localHeader.length + data.length;
    });
    const centralOffset = offset;
    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = zipEndRecord(Object.keys(files).length, centralSize, centralOffset);
    return concatUint8Arrays([...localParts, ...centralParts, end]);
  }

  function zipLocalHeader(nameBytes, data, crc){
    const header = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0x0800, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, zipTime(), true);
    view.setUint16(12, zipDate(), true);
    view.setUint32(14, crc, true);
    view.setUint32(18, data.length, true);
    view.setUint32(22, data.length, true);
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true);
    header.set(nameBytes, 30);
    return header;
  }

  function zipCentralHeader(nameBytes, data, crc, offset){
    const header = new Uint8Array(46 + nameBytes.length);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 20, true);
    view.setUint16(8, 0x0800, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, zipTime(), true);
    view.setUint16(14, zipDate(), true);
    view.setUint32(16, crc, true);
    view.setUint32(20, data.length, true);
    view.setUint32(24, data.length, true);
    view.setUint16(28, nameBytes.length, true);
    view.setUint16(30, 0, true);
    view.setUint16(32, 0, true);
    view.setUint16(34, 0, true);
    view.setUint16(36, 0, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, offset, true);
    header.set(nameBytes, 46);
    return header;
  }

  function zipEndRecord(fileCount, centralSize, centralOffset){
    const record = new Uint8Array(22);
    const view = new DataView(record.buffer);
    view.setUint32(0, 0x06054b50, true);
    view.setUint16(8, fileCount, true);
    view.setUint16(10, fileCount, true);
    view.setUint32(12, centralSize, true);
    view.setUint32(16, centralOffset, true);
    return record;
  }

  function crc32(data){
    let crc = 0xffffffff;
    for(let index = 0; index < data.length; index += 1){
      crc = crcTable[(crc ^ data[index]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  const crcTable = (() => {
    const table = new Uint32Array(256);
    for(let index = 0; index < 256; index += 1){
      let value = index;
      for(let bit = 0; bit < 8; bit += 1){
        value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
      }
      table[index] = value >>> 0;
    }
    return table;
  })();

  function concatUint8Arrays(parts){
    const total = parts.reduce((sum, part) => sum + part.length, 0);
    const output = new Uint8Array(total);
    let offset = 0;
    parts.forEach(part => {
      output.set(part, offset);
      offset += part.length;
    });
    return output;
  }

  function zipTime(){
    const date = new Date();
    return (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  }

  function zipDate(){
    const date = new Date();
    return ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  }

  function columnName(index){
    let name = "";
    while(index > 0){
      const remainder = (index - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      index = Math.floor((index - 1) / 26);
    }
    return name;
  }

  function xlsxText(value){
    const text = String(value ?? "");
    const safeText = /^[=+\-@]/.test(text.trim()) ? `'${text}` : text;
    return safeText.replace(/[&<>"']/g, char => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&apos;"
    }[char]));
  }
})();
