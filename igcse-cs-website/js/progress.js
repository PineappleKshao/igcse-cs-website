(()=>{
  const progressKey = "igcse_revision_progress";
  const notesKey = "igcse_teacher_panel_notes";
  const projectorKey = "igcse_projector_mode";
  const user = JSON.parse(localStorage.getItem(progressKey) || '{"completed":[],"scores":{}}');
  const chapters = window.CHAPTERS || [];

  const $ = selector => document.querySelector(selector);

  const select = $("#todayChapterSelect");
  const grid = $("#chapterGrid");
  const notes = $("#teacherNotes");
  const notesStatus = $("#notesStatus");

  if($("#welcomeText")) $("#welcomeText").textContent = "Teacher Control Panel";
  if($("#studentInfo")) $("#studentInfo").textContent = "Open a classroom-ready flow for teaching, checking, discussing and revealing model answers.";

  function chapterHref(id, hash = ""){
    return `chapters/chapter${id}.html${hash}`;
  }

  function selectedChapterId(){
    return Number(select && select.value ? select.value : 3);
  }

  function updateLaunchLinks(){
    const id = selectedChapterId();
    const teach = $("#openTeachMode");
    const activity = $("#openActivityMode");
    const exam = $("#openExamMode");
    const exit = $("#openExitTicket");
    if(teach) teach.href = chapterHref(id, "#teacher-companion");
    if(activity) activity.href = chapterHref(id, "#sectionBrowser");
    if(exam) exam.href = chapterHref(id, "#exam-training");
    if(exit) exit.href = chapterHref(id, "#quiz");
  }

  if(select){
    select.innerHTML = chapters.map(chapter => `<option value="${chapter.id}">Chapter ${chapter.id}: ${chapter.title}</option>`).join("");
    select.value = "3";
    select.addEventListener("change", updateLaunchLinks);
    updateLaunchLinks();
  }

  function setProjectorMode(on){
    document.body.classList.toggle("projector-mode", on);
    localStorage.setItem(projectorKey, on ? "on" : "off");
    document.querySelectorAll("#panelProjectorBtn,#quickProjectorBtn").forEach(button => {
      button.textContent = on ? "Exit Projector Mode" : "Start Projector Mode";
    });
  }

  setProjectorMode(localStorage.getItem(projectorKey) === "on");
  document.querySelectorAll("#panelProjectorBtn,#quickProjectorBtn").forEach(button => {
    button.addEventListener("click", () => setProjectorMode(!document.body.classList.contains("projector-mode")));
  });

  const exitTicket = $("#exitTicketBtn");
  if(exitTicket) exitTicket.addEventListener("click", () => {
    const id = selectedChapterId();
    location.href = chapterHref(id, "#quiz");
  });

  if(notes){
    notes.value = localStorage.getItem(notesKey) || "";
    notes.addEventListener("input", () => {
      localStorage.setItem(notesKey, notes.value);
      if(notesStatus){
        notesStatus.textContent = "Saved.";
        clearTimeout(notesStatus._timer);
        notesStatus._timer = setTimeout(() => notesStatus.textContent = "Notes save automatically in this browser.", 1400);
      }
    });
  }

  const total = chapters.length;
  const done = (user.completed || []).length;
  const percent = total ? Math.round(done / total * 100) : 0;
  if($("#progressText")) $("#progressText").textContent = `${done}/${total} chapters marked complete. This is secondary; the main panel is for teaching today’s lesson.`;
  if($("#progressBar")) $("#progressBar").style.width = `${percent}%`;

  if(grid){
    grid.innerHTML = chapters.map(chapter => {
      const complete = (user.completed || []).includes(chapter.id);
      const score = user.scores && user.scores[chapter.id] !== undefined ? `Quiz ${user.scores[chapter.id]}/3` : "Ready";
      return `<article class="chapter-card" style="--accent:${chapter.accent}">
        <span class="tag">Chapter ${chapter.id} · ${chapter.section}</span>
        <h3>${chapter.title}</h3>
        <p>${chapter.summary}</p>
        <p><span class="chip">${complete ? "Complete" : "Open"}</span> <span class="chip">${score}</span></p>
        <div class="chapter-card-actions">
          <a class="btn" href="${chapterHref(chapter.id, "#teacher-companion")}">Teach</a>
          <a class="btn secondary" href="${chapterHref(chapter.id, "#exam-training")}">Class Check</a>
        </div>
      </article>`;
    }).join("");
  }

  const reset = $("#resetProgressBtn");
  if(reset) reset.onclick = () => {
    localStorage.removeItem(progressKey);
    location.reload();
  };
})();
