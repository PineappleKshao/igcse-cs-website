(function(){
  const script = document.currentScript;
  const chapterId = Number(script.dataset.chapter || new URLSearchParams(location.search).get("id"));
  const chapter = window.getChapter(chapterId);
  const root = document.getElementById("chapterRoot");
  if(!chapter || !root){
    if(root) root.innerHTML = "<section class='panel'><h2>Chapter not found</h2><a class='btn' href='../dashboard.html'>Back to dashboard</a></section>";
    return;
  }

  const progressKey = "igcse_revision_progress";
  const user = JSON.parse(localStorage.getItem(progressKey) || '{"completed":[],"scores":{}}');
  const isComplete = (user.completed || []).includes(chapter.id);

  document.title = `Chapter ${chapter.id}: ${chapter.title}`;
  document.documentElement.style.setProperty("--accent", chapter.accent);

  root.innerHTML = `
    <div class="topbar">
      <div>
        <p class="kicker">${chapter.section}</p>
        <h1 style="font-size:clamp(2rem,4vw,4.2rem);color:var(--teal-dark)">Chapter ${chapter.id}: ${chapter.title}</h1>
      </div>
      <div class="toolbar">
        <a class="btn secondary" href="../dashboard.html">Dashboard</a>
        <button class="btn ${isComplete ? "secondary" : ""}" id="completeBtn">${isComplete ? "Completed" : "Mark Complete"}</button>
      </div>
    </div>
    <section class="chapter-hero">
      <div class="panel">
        <p class="chapter-summary">${chapter.summary}</p>
        <div class="exam-strip">
          ${chapter.exam.map((item,index)=>`<div class="exam-tile"><b>Exam focus ${index+1}</b>${item}</div>`).join("")}
        </div>
      </div>
      <div class="panel">
        <h3>Paper Link</h3>
        <p>${chapter.id <= 6 ? "Paper 1: Computer Systems" : "Paper 2: Algorithms, Programming and Logic"}</p>
        <p class="note">Revision move: learn the concept, then practise the exact answer shape.</p>
      </div>
    </section>
    <section class="lesson-layout">
      <nav class="side-menu" aria-label="Chapter sections">
        <a href="#mindmap">Mindmap</a>
        <a href="#concepts">Core Concepts</a>
        <a href="#diagram">Visual Model</a>
        <a href="#exam">Frequent Questions</a>
        <a href="#quiz">Quick Quiz</a>
      </nav>
      <div>
        <section class="panel" id="mindmap">
          <h2>Big-Picture Mindmap</h2>
          <div class="mindmap">${renderMindmap(chapter)}</div>
        </section>
        <section class="panel" id="concepts">
          <h2>Core Concepts</h2>
          <div class="concept-grid">
            ${chapter.concepts.map(([title,body])=>`<article class="concept"><b>${title}</b><p>${body}</p></article>`).join("")}
          </div>
        </section>
        <section class="panel" id="diagram">
          <h2>${chapter.diagram.title}</h2>
          <div class="diagram">
            <div class="flow">${chapter.diagram.steps.map((step,index)=>`${index ? "<span class='arrow'>→</span>" : ""}<span>${step}</span>`).join("")}</div>
          </div>
        </section>
        <section class="panel" id="exam">
          <h2>Frequent Exam Questions</h2>
          <div class="qa-list">
            ${chapter.frequent.map(([q,a])=>`<details class="qa-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}
          </div>
        </section>
        <section class="panel" id="quiz">
          <h2>Quick Quiz</h2>
          <div id="quizMount"></div>
          <p id="quizFeedback" class="feedback" aria-live="polite"></p>
        </section>
      </div>
    </section>
  `;

  renderQuiz(chapter);
  document.getElementById("completeBtn").onclick = () => markComplete(chapter.id);

  function renderMindmap(chapter){
    return `<div class="map-canvas">
      <div class="map-center">Chapter ${chapter.id}<br>${chapter.title}</div>
      ${chapter.map.map((node,index)=>`<div class="map-node n${index+1}">${node}</div>`).join("")}
    </div>`;
  }

  function renderQuiz(chapter){
    const answers = new Map();
    document.getElementById("quizMount").innerHTML = chapter.quiz.map((item,qIndex)=>`
      <article class="qa-item" data-question="${qIndex}">
        <h3>${qIndex + 1}. ${item[0]}</h3>
        ${item[1].map((option,oIndex)=>`<button class="quiz-option" data-q="${qIndex}" data-o="${oIndex}">${option}</button>`).join("")}
      </article>
    `).join("");

    document.querySelectorAll(".quiz-option").forEach(button => {
      button.addEventListener("click", () => {
        const q = Number(button.dataset.q);
        const o = Number(button.dataset.o);
        answers.set(q,o);
        document.querySelectorAll(`.quiz-option[data-q="${q}"]`).forEach(choice => {
          choice.classList.remove("correct-choice","wrong-choice");
          choice.disabled = true;
        });
        button.classList.add(o === chapter.quiz[q][2] ? "correct-choice" : "wrong-choice");
        document.querySelector(`.quiz-option[data-q="${q}"][data-o="${chapter.quiz[q][2]}"]`).classList.add("correct-choice");
        const score = [...answers.entries()].filter(([qIndex,answer]) => answer === chapter.quiz[qIndex][2]).length;
        const done = answers.size === chapter.quiz.length;
        document.getElementById("quizFeedback").textContent = done ? `Score: ${score}/${chapter.quiz.length}. Chapter marked complete.` : `Score so far: ${score}/${answers.size}`;
        document.getElementById("quizFeedback").className = `feedback ${score === answers.size ? "correct" : "wrong"}`;
        if(done) markComplete(chapter.id, score);
      });
    });
  }

  function markComplete(id, score){
    const current = JSON.parse(localStorage.getItem(progressKey) || '{"completed":[],"scores":{}}');
    current.completed = current.completed || [];
    current.scores = current.scores || {};
    if(!current.completed.includes(id)) current.completed.push(id);
    if(typeof score === "number") current.scores[id] = score;
    localStorage.setItem(progressKey, JSON.stringify(current));
    const button = document.getElementById("completeBtn");
    button.textContent = "Completed";
    button.classList.add("secondary");
  }
})();
