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
    const workbookHtml = `<!doctype html>
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Year 1 Plan</x:Name><x:WorksheetOptions><x:FreezePanes/><x:FrozenNoSplit/><x:SplitHorizontal>5</x:SplitHorizontal><x:TopRowBottomPane>5</x:TopRowBottomPane><x:ActivePane>2</x:ActivePane></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        <style>
          body{font-family:Arial,sans-serif;}
          table{border-collapse:collapse;}
          th,td{border:1px solid #d9dde5;padding:8px 10px;vertical-align:top;mso-number-format:"\\@";}
          th{background:#1d1d1f;color:#fff;font-weight:700;}
          .meta{background:#f5f5f7;font-weight:700;}
          .wrap{white-space:pre-wrap;}
        </style>
      </head>
      <body>
        <table>
          <tr><td class="meta" colspan="${headers.length}">IGCSE Computer Science Year 1 Teaching Timeline</td></tr>
          <tr><td class="meta" colspan="${headers.length}">${excelText(plan.meta.rationale)}</td></tr>
          <tr><td class="meta" colspan="${headers.length}">Exported: ${excelText(generatedAt)}</td></tr>
          <tr><td class="meta" colspan="${headers.length}">Default route: Chapter 1 → Chapter 10 → Chapter 3 → Chapter 2 → Chapter 4</td></tr>
          <tr>${headers.map(header => `<th>${excelText(header)}</th>`).join("")}</tr>
          ${rows.map(row => `<tr>${row.map(value => `<td class="wrap">${excelText(value)}</td>`).join("")}</tr>`).join("")}
        </table>
      </body>
      </html>`;
    const blob = new Blob([workbookHtml], { type:"application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "igcse-cs-year1-teaching-plan.xls";
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
})();
