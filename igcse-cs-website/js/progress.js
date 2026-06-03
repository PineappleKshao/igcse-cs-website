(()=>{
  const key = "igcse_revision_progress";
  const user = JSON.parse(localStorage.getItem(key) || '{"completed":[],"scores":{}}');

  document.getElementById("welcomeText").textContent = "Course Dashboard";
  document.getElementById("studentInfo").textContent = "Chapter overview, concept mindmaps, exam-style checks.";
  const total = window.CHAPTERS.length;
  const done = (user.completed || []).length;
  const percent = Math.round(done / total * 100);
  document.getElementById("progressText").textContent = `${done}/${total} chapters completed (${percent}%)`;
  document.getElementById("progressBar").style.width = `${percent}%`;

  const grid = document.getElementById("chapterGrid");
  grid.innerHTML = window.CHAPTERS.map(chapter => {
    const complete = (user.completed || []).includes(chapter.id);
    const score = user.scores && user.scores[chapter.id] !== undefined ? `Quiz ${user.scores[chapter.id]}/3` : "Quiz ready";
    return `<article class="chapter-card" style="--accent:${chapter.accent}">
      <span class="tag">Chapter ${chapter.id} · ${chapter.section}</span>
      <h3>${chapter.title}</h3>
      <p>${chapter.summary}</p>
      <p><span class="chip">${complete ? "Complete" : "Open"}</span> <span class="chip">${score}</span></p>
      <a class="btn" href="chapters/chapter${chapter.id}.html">Open Chapter</a>
    </article>`;
  }).join("");

  document.getElementById("resetProgressBtn").onclick = () => {
    localStorage.removeItem(key);
    location.reload();
  };
})();
