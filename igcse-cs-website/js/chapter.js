(function(){
  const script = document.currentScript;
  const chapterId = Number(script.dataset.chapter || new URLSearchParams(location.search).get("id"));
  const chapter = window.getChapter(chapterId);
  const pack = window.getPracticePack ? window.getPracticePack(chapterId) : null;
  const guide = window.getTextbookGuide ? window.getTextbookGuide(chapterId) : null;
  const classifiedPapers = window.CLASSIFIED_PAPERS ? window.CLASSIFIED_PAPERS.papers.filter(item => item.chapter === chapterId) : [];
  const chapterResources = window.getChapterResources ? window.getChapterResources(chapterId) : [];
  const lessonDecks = window.getChapterLessonDecks ? window.getChapterLessonDecks(chapterId) : [];
  const root = document.getElementById("chapterRoot");
  if(!chapter || !root){
    if(root) root.innerHTML = "<section class='panel'><h2>Chapter not found</h2><a class='btn' href='../dashboard.html'>Back to dashboard</a></section>";
    return;
  }

  const progressKey = "igcse_revision_progress";
  const user = JSON.parse(localStorage.getItem(progressKey) || '{"completed":[],"scores":{}}');
  const isComplete = (user.completed || []).includes(chapter.id);
  const subtopicKey = `igcse_subtopics_chapter_${chapter.id}`;
  let subtopicProgress = JSON.parse(localStorage.getItem(subtopicKey) || "[]");

  document.title = `Chapter ${chapter.id}: ${chapter.title}`;
  document.documentElement.style.setProperty("--accent", chapter.accent);
  root.classList.add("chapter-cockpit");

  root.innerHTML = `
    <section class="cockpit-hero">
      <div>
        <p class="kicker">${chapter.section}</p>
        <h1>Chapter ${chapter.id}: ${chapter.title}</h1>
        <p>${chapter.summary}</p>
      </div>
      <div class="cockpit-actions">
        <a class="icon-btn" href="../dashboard.html" aria-label="Dashboard" title="Dashboard">⌂</a>
        <a class="icon-btn" href="../classroom.html" aria-label="Classroom" title="Classroom">▦</a>
        <button class="btn coral" id="lessonModeBtn">Start Lesson</button>
        <button class="btn ${isComplete ? "secondary" : ""}" id="completeBtn">${isComplete ? "Completed" : "Mark Complete"}</button>
      </div>
    </section>
    <section class="lesson-control panel">
      <div class="mode-tabs" role="tablist" aria-label="Chapter mode">
        <button class="mode-tab active" data-mode="teach" type="button">Teach</button>
        <button class="mode-tab" data-mode="revise" type="button">Revise</button>
        <button class="mode-tab" data-mode="practise" type="button">Practise</button>
      </div>
      <div class="teacher-actions" aria-label="Teacher controls">
        <button class="btn secondary" id="toggleAnswersBtn" type="button">Hide Answers</button>
        <button class="btn secondary print-btn" onclick="window.print()" type="button">Print</button>
        <a class="btn secondary" href="../classroom.html?chapter=${chapter.id}">Resources</a>
      </div>
    </section>
    ${renderSectionBrowser(chapter, guide, pack, classifiedPapers, chapterResources)}
    <section class="chapter-hero compact-hero" data-mode-section data-modes="revise">
      <div class="panel">
        <div class="exam-strip">
          ${chapter.exam.map((item,index)=>`<div class="exam-tile"><b>Exam ${index+1}</b>${item}</div>`).join("")}
        </div>
      </div>
      <div class="panel">
        <h3>Paper Link</h3>
        <p>${chapter.id <= 6 ? "Paper 1: Computer Systems" : "Paper 2: Algorithms, Programming and Logic"}</p>
        <p class="note">Revision move: learn the concept, then practise the exact answer shape.</p>
      </div>
    </section>
    <div data-mode-section data-modes="revise">${renderChapterSummary(chapter, pack)}</div>
    <section class="lesson-layout" data-mode-section data-modes="revise practise">
      <nav class="side-menu" aria-label="Chapter sections">
        <a href="#summary">Summary Box</a>
        <a href="#mindmap">Mindmap</a>
        <a href="#concepts">Core Concepts</a>
        <a href="#diagram">Visual Model</a>
        <a href="#answer-shapes">Answer Shapes</a>
        <a href="#worked">Worked Example</a>
        <a href="#exam">Frequent Questions</a>
        <a href="#pack">Worksheet / Homework</a>
        <a href="#classified">Classified Papers</a>
        <a href="#one-page">One-Page Summary</a>
        <a href="#quiz">Quick Quiz</a>
      </nav>
      <div>
        <section class="panel cockpit-map-panel" id="mindmap" data-mode-section data-modes="revise">
          <div class="topbar">
            <div>
              <p class="kicker">Interactive Mindmap</p>
              <h2>Click One Block, Teach One Concept</h2>
            </div>
            <p class="map-hint">Each node opens a focused teaching card.</p>
          </div>
          <div class="mindmap-workspace">
            <div class="mindmap">${renderMindmap(chapter)}</div>
            ${renderMapFocusPanel(chapter, pack)}
          </div>
        </section>
        <section class="panel" id="concepts" data-mode-section data-modes="revise">
          <h2>Core Concepts</h2>
          <div class="concept-grid">
            ${chapter.concepts.map(([title,body])=>`<article class="concept"><b>${title}</b><p>${body}</p></article>`).join("")}
          </div>
        </section>
        <section class="panel" id="diagram" data-mode-section data-modes="revise">
          <h2>${chapter.diagram.title}</h2>
          <div class="diagram">
            <div class="flow">${chapter.diagram.steps.map((step,index)=>`${index ? "<span class='arrow'>→</span>" : ""}<span>${step}</span>`).join("")}</div>
          </div>
        </section>
        <section class="panel" id="answer-shapes" data-mode-section data-modes="revise">
          <h2>Exam Answer Shapes</h2>
          ${renderAnswerShapes()}
        </section>
        <div data-mode-section data-modes="revise">${pack ? renderWorkedExample(pack) : ""}</div>
        <section class="panel" id="exam" data-mode-section data-modes="revise practise">
          <h2>Frequent Exam Questions</h2>
          <div class="qa-list">
            ${chapter.frequent.map(([q,a])=>`<details class="qa-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}
          </div>
        </section>
        <div data-mode-section data-modes="practise">${pack ? renderPracticePack(pack) : ""}</div>
        <div data-mode-section data-modes="practise">${renderClassifiedPapers(classifiedPapers)}</div>
        <div data-mode-section data-modes="revise">${renderOnePageSummary(chapter, pack)}</div>
        <section class="panel" data-mode-section data-modes="practise">
          <h2>Teaching Pack</h2>
          <p>Open the classroom hub with this chapter selected to print packs or find classified-paper files.</p>
          <a class="btn" href="../classroom.html?chapter=${chapter.id}">Open Chapter ${chapter.id} Resources</a>
        </section>
        <section class="panel" id="quiz" data-mode-section data-modes="revise practise">
          <h2>Quick Quiz</h2>
          <div id="quizMount"></div>
          <p id="quizFeedback" class="feedback" aria-live="polite"></p>
        </section>
      </div>
    </section>
    ${renderLessonMode(chapter, lessonDecks)}
  `;

  renderQuiz(chapter);
  document.getElementById("completeBtn").onclick = () => markComplete(chapter.id);
  setupModes();
  setupSectionBrowser();
  setupSubtopics();
  setupMindmapFocus();
  setupAnswerToggle();
  setupLessonMode();
  setupCopyButtons();

  function renderMindmap(chapter){
    return `<div class="map-canvas">
      <div class="map-center">Chapter ${chapter.id}<br>${chapter.title}</div>
      ${chapter.map.map((node,index)=>{
        const labels = ["Concept", "Diagram", "Answer", "Question", "Practice"];
        return `<button class="map-node n${index+1}${index === 0 ? " active" : ""}" data-map-index="${index}" type="button"><span>${node}</span><small>${labels[index] || "Focus"}</small></button>`;
      }).join("")}
    </div>`;
  }

  function renderSectionBrowser(chapter, guide, pack, classifiedPapers, resources){
    const sections = getTeachingSections(chapter, guide);
    const slideCount = resources.filter(item => item.kind === "presentation").length;
    return `<section class="panel section-browser" id="sectionBrowser" data-mode-section data-modes="teach">
      <div class="section-browser-head">
        <div>
          <p class="kicker">Teach Section by Section</p>
          <h2>Open One Part of the Chapter</h2>
          <p>Use this like a classroom control panel: choose a textbook section, show the lesson flow, open slides, assign practice, or save video links for later.</p>
        </div>
        <div class="section-stats">
          <strong>${sections.length}</strong>
          <span>${sections.length === 1 ? "section" : "sections"}</span>
          <strong>${slideCount}</strong>
          <span>${slideCount === 1 ? "slide" : "slides"}</span>
        </div>
      </div>
      <div class="section-layout">
        <nav class="section-list" aria-label="Teaching sections">
          ${sections.map((section, index) => renderSectionButton(chapter, section, resources, index, sections.length)).join("")}
        </nav>
        <article class="section-detail-panel" id="sectionDetailPanel" aria-live="polite">
          ${renderSectionDetail(chapter, guide, pack, classifiedPapers, resources, 0, "teach")}
        </article>
      </div>
    </section>`;
  }

  function getTeachingSections(chapter, guide){
    const source = guide && guide.textbookSections.length ? guide.textbookSections : chapter.map;
    return source.map((title, index) => ({
      title,
      label: title.replace(/^\d+(?:\.\d+)?\s*/, ""),
      index
    }));
  }

  function renderSectionButton(chapter, section, resources, index, total){
    const sectionResources = getSectionResources(chapter.id, resources, index, total);
    const slideCount = sectionResources.filter(item => item.kind === "presentation").length;
    const practiceCount = sectionResources.filter(item => ["worksheet", "homework", "answer", "pdf", "document"].includes(item.kind)).length;
    return `<button class="section-card${index === 0 ? " active" : ""}" data-section-index="${index}" type="button">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <b>${section.label}</b>
      <small>${section.title}</small>
      <em>${slideCount} slide file${slideCount === 1 ? "" : "s"} · ${practiceCount} teaching resource${practiceCount === 1 ? "" : "s"}</em>
    </button>`;
  }

  function renderSectionDetail(chapter, guide, pack, classifiedPapers, resources, index, activeTab){
    const sections = getTeachingSections(chapter, guide);
    const section = sections[index] || sections[0];
    const sectionResources = getSectionResources(chapter.id, resources, index, sections.length);
    const tabs = [
      ["teach", "Teach"],
      ["slides", "Slides"],
      ["practice", "Practice"],
      ["video", "Video"]
    ];
    return `<div class="section-detail-head">
      <div>
        <p class="kicker">Section ${index + 1}</p>
        <h3>${section.label}</h3>
        <p>${section.title}</p>
      </div>
      <a class="btn secondary" href="../classroom.html?chapter=${chapter.id}">Hub</a>
    </div>
    <div class="section-tabs" role="tablist">
      ${tabs.map(([id, label]) => `<button class="section-tab${activeTab === id ? " active" : ""}" data-section-tab="${id}" type="button">${label}</button>`).join("")}
    </div>
    <div class="section-tab-panel">
      ${activeTab === "teach" ? renderSectionTeach(chapter, guide, pack, index) : ""}
      ${activeTab === "slides" ? renderSectionSlides(sectionResources) : ""}
      ${activeTab === "practice" ? renderSectionPractice(chapter, pack, classifiedPapers, sectionResources, index) : ""}
      ${activeTab === "video" ? renderSectionVideo(chapter.id, index, sectionResources) : ""}
    </div>`;
  }

  function renderSectionTeach(chapter, guide, pack, index){
    const flow = guide ? guide.teacherFlow : [];
    const concept = chapter.concepts[index % chapter.concepts.length] || chapter.concepts[0];
    const mustKnow = getMustKnow(chapter, pack)[index % getMustKnow(chapter, pack).length];
    const trap = getExamTraps(chapter)[index % getExamTraps(chapter).length];
    const phrase = getBestAnswerPhrases(chapter, pack)[index % getBestAnswerPhrases(chapter, pack).length];
    return `<div class="teaching-focus">
      <article class="teaching-card objective">
        <b>Lesson objective</b>
        <p>${guide ? guide.lessonObjective : chapter.summary}</p>
      </article>
      <article class="teaching-card">
        <b>Teacher flow</b>
        <ol>${flow.map(([stage, action]) => `<li><strong>${stage}:</strong> ${action}</li>`).join("")}</ol>
      </article>
      <article class="teaching-card">
        <b>Board plan</b>
        <div class="term-cloud">${(guide ? guide.boardPlan : chapter.map).map(item => `<span>${item}</span>`).join("")}</div>
      </article>
      <div class="teaching-mini-grid">
        <article><b>You must know</b><span>${mustKnow}</span></article>
        <article><b>Common exam trap</b><span>${trap}</span></article>
        <article><b>Best answer phrase</b><span>${phrase}</span></article>
        <article><b>Key concept</b><span>${concept[0]}: ${concept[1]}</span></article>
      </div>
    </div>`;
  }

  function renderSectionSlides(resources){
    const slideResources = resources.filter(item => ["presentation", "pdf", "lesson-plan", "video-link"].includes(item.kind));
    const preview = slideResources.find(item => item.ext === "pdf");
    return `<div class="resource-stage">
      <div class="resource-stage-main">
        ${preview ? `<iframe src="${preview.href}" title="${escapeHtml(preview.title)}"></iframe>` : `<div class="slide-empty">
          <b>Slide area</b>
          <p>PowerPoint files open in PowerPoint or Keynote. Add a PDF export beside the PPTX when you want an in-page preview here.</p>
        </div>`}
      </div>
      <div class="resource-list">
        ${slideResources.length ? slideResources.map(renderResourceCard).join("") : "<p class='note'>No slide or lesson-plan file found for this section yet.</p>"}
      </div>
    </div>`;
  }

  function renderSectionPractice(chapter, pack, classifiedPapers, resources, index){
    const practiceResources = resources.filter(item => ["worksheet", "homework", "answer", "pdf", "document", "code", "media"].includes(item.kind));
    const practicePool = pack ? [...pack.worksheet, ...pack.homework] : [];
    const generated = practicePool[index % practicePool.length];
    const classified = classifiedPapers.slice(0, 4);
    return `<div class="practice-section-grid">
      ${generated ? `<article class="teaching-card">
        <b>Exam-style task</b>
        <p>${generated[0]}</p>
        <details open><summary>Answer points</summary><p>${generated[1]}</p></details>
      </article>` : ""}
      <article class="teaching-card">
        <b>Local files</b>
        <div class="resource-list compact">
          ${practiceResources.length ? practiceResources.slice(0, 12).map(renderResourceCard).join("") : "<p class='note'>No worksheet or homework file found for this section yet.</p>"}
        </div>
      </article>
      <article class="teaching-card">
        <b>Classified paper follow-up</b>
        ${classified.length ? classified.map(renderClassifiedLink).join("") : "<p>No classified files indexed for this chapter yet.</p>"}
      </article>
    </div>`;
  }

  function renderSectionVideo(chapterId, sectionIndex, resources){
    const stored = getStoredVideoLinks(chapterId, sectionIndex);
    const shortcutLinks = resources.filter(item => item.kind === "video-link");
    return `<div class="video-workspace">
      <form class="video-link-form" data-video-form="${sectionIndex}">
        <input name="title" placeholder="Video title" aria-label="Video title">
        <input name="url" placeholder="https://example.com/video" aria-label="Video URL" type="url">
        <button class="btn" type="submit">Add</button>
      </form>
      <div class="video-link-list">
        ${shortcutLinks.map(renderResourceCard).join("")}
        ${stored.map(link => `<a class="video-link-card" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer"><b>${escapeHtml(link.title)}</b><span>${escapeHtml(link.url)}</span></a>`).join("")}
        ${!shortcutLinks.length && !stored.length ? "<p class='note'>No video link saved yet. Add one during planning or after class.</p>" : ""}
      </div>
    </div>`;
  }

  function renderResourceCard(item){
    return `<a class="resource-card ${item.kind}" href="${item.href}" target="_blank" rel="noreferrer">
      <span>${item.kind.replace("-", " ")}</span>
      <b>${item.title}</b>
      <small>${item.topic}${item.ext ? ` · ${item.ext.toUpperCase()}` : ""}</small>
    </a>`;
  }

  function getSectionResources(chapterId, resources, index, total){
    const topicGroups = {
      1: [[1, 2, 3], [4, 5, 6], [7]],
      2: [[1, 2], [3], [4]],
      3: [[1], [2], [3], [4]],
      4: [[1], [2]],
      5: [[1], [2], [3]],
      6: [[1], [2], [3]],
      7: [[1], [2], [3], [4], [4], [5], [5], [6], [6]],
      8: [[1, 2, 3, 4, 5, 6, 7], [8], [9]],
      10: [[1], [1], [1]]
    };
    const groups = topicGroups[chapterId];
    if(groups && groups[index]){
      const set = new Set(groups[index]);
      const matched = resources.filter(item => set.has(item.topicNumber));
      if(matched.length) return matched;
    }
    const byTopic = resources.filter(item => item.topicNumber === index + 1);
    if(byTopic.length) return byTopic;
    if(total === 1) return resources;
    return resources.slice(0, 18);
  }

  function getStoredVideoLinks(chapterId, sectionIndex){
    const key = `igcse_video_links_chapter_${chapterId}`;
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    return data[sectionIndex] || [];
  }

  function saveStoredVideoLink(chapterId, sectionIndex, link){
    const key = `igcse_video_links_chapter_${chapterId}`;
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    data[sectionIndex] = data[sectionIndex] || [];
    data[sectionIndex].push(link);
    localStorage.setItem(key, JSON.stringify(data));
  }

  function setupSectionBrowser(){
    const detail = document.getElementById("sectionDetailPanel");
    if(!detail) return;
    let activeSection = 0;
    let activeTab = "teach";
    const render = () => {
      detail.innerHTML = renderSectionDetail(chapter, guide, pack, classifiedPapers, chapterResources, activeSection, activeTab);
      document.querySelectorAll(".section-card").forEach(card => {
        card.classList.toggle("active", Number(card.dataset.sectionIndex) === activeSection);
      });
    };
    document.querySelectorAll(".section-card").forEach(card => {
      card.addEventListener("click", () => {
        activeSection = Number(card.dataset.sectionIndex);
        activeTab = "teach";
        render();
      });
    });
    detail.addEventListener("click", event => {
      const tab = event.target.closest("[data-section-tab]");
      if(tab){
        activeTab = tab.dataset.sectionTab;
        render();
      }
    });
    detail.addEventListener("submit", event => {
      const form = event.target.closest("[data-video-form]");
      if(!form) return;
      event.preventDefault();
      const title = form.elements.title.value.trim();
      const url = form.elements.url.value.trim();
      if(!title || !url) return;
      saveStoredVideoLink(chapter.id, activeSection, { title, url });
      activeTab = "video";
      render();
    });
  }

  function renderSubtopicWorkbench(chapter, pack, classifiedPapers){
    return `<section class="panel subtopic-workbench" id="subtopics" data-mode-section data-modes="teach revise">
      <div class="subtopic-header">
        <div>
          <p class="kicker">Subtopic Workspace</p>
          <h2>Choose One Idea, Then Teach It Clearly</h2>
          <p>Each tile opens a focused panel: learn, diagram, exam trap, answer phrase, quick check and practice.</p>
        </div>
        <div class="subtopic-meter" aria-label="Subtopic progress">
          <strong id="subtopicReadyCount">${subtopicProgress.length}/${chapter.concepts.length}</strong>
          <span>exam-ready</span>
        </div>
      </div>
      <div class="subtopic-shell">
        <div class="subtopic-grid" role="list">
          ${chapter.concepts.map(([title, body], index) => renderSubtopicTile(title, body, index)).join("")}
        </div>
        <aside class="subtopic-detail" id="subtopicDetail" aria-live="polite">
          ${renderSubtopicDetail(chapter, pack, classifiedPapers, 0)}
        </aside>
      </div>
    </section>`;
  }

  function renderTextbookLessonGuide(guide){
    return `<section class="panel textbook-lesson" id="textbookLesson" data-mode-section data-modes="teach">
      <div class="textbook-lesson-head">
        <div>
          <p class="kicker">Textbook-Aligned Teaching Plan</p>
          <h2>How I Would Teach This Chapter</h2>
          <p>${guide.lessonObjective}</p>
        </div>
        <div class="textbook-sections">
          ${guide.textbookSections.map(section => `<span>${section}</span>`).join("")}
        </div>
      </div>
      <div class="teacher-flow">
        ${guide.teacherFlow.map(([stage, action], index) => `<article>
          <b>${index + 1}. ${stage}</b>
          <p>${action}</p>
        </article>`).join("")}
      </div>
      <div class="board-plan">
        <article>
          <h3>Board Plan</h3>
          <div class="term-cloud">${guide.boardPlan.map(item => `<span>${item}</span>`).join("")}</div>
        </article>
        <article>
          <h3>Exit Ticket</h3>
          <p>${guide.exitTicket}</p>
        </article>
      </div>
    </section>`;
  }

  function renderSubtopicTile(title, body, index){
    const ready = subtopicProgress.includes(index);
    return `<button class="subtopic-tile${index === 0 ? " active" : ""}${ready ? " ready" : ""}" data-subtopic-index="${index}" type="button" role="listitem">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <b>${title}</b>
      <small>${ready ? "Exam ready" : "Learning"}</small>
      <em>${shortenSentence(body, 92)}</em>
    </button>`;
  }

  function renderSubtopicDetail(chapter, pack, classifiedPapers, index){
    const [title, body] = chapter.concepts[index] || chapter.concepts[0];
    const traps = getExamTraps(chapter);
    const phrases = getBestAnswerPhrases(chapter, pack);
    const frequent = chapter.frequent[index % chapter.frequent.length] || chapter.frequent[0];
    const quiz = chapter.quiz[index % chapter.quiz.length] || chapter.quiz[0];
    const practicePool = pack ? [...pack.worksheet, ...pack.homework] : [];
    const practice = practicePool[index % practicePool.length];
    const relatedPapers = classifiedPapers.slice(0, 3);
    const ready = subtopicProgress.includes(index);
    return `<div class="detail-top">
      <div>
        <p class="kicker">Subtopic ${index + 1}</p>
        <h3>${title}</h3>
      </div>
      <button class="ready-toggle${ready ? " active" : ""}" data-ready-index="${index}" type="button">${ready ? "Ready" : "Mark Ready"}</button>
    </div>
    <p class="detail-definition">${body}</p>
    <div class="learning-lane">
      <article class="lane-card">
        <b>Visual route</b>
        <div class="mini-flow">${chapter.diagram.steps.map((step, stepIndex) => `${stepIndex ? "<span>→</span>" : ""}<strong>${step}</strong>`).join("")}</div>
      </article>
      <article class="lane-card">
        <b>You must know</b>
        <span>${getMustKnow(chapter, pack)[index % getMustKnow(chapter, pack).length]}</span>
      </article>
      <article class="lane-card warning">
        <b>Common trap</b>
        <span>${traps[index % traps.length]}</span>
      </article>
      <article class="lane-card">
        <b>Best answer phrase</b>
        <span>${phrases[index % phrases.length]}</span>
      </article>
    </div>
    <div class="subtopic-actions">
      <details open>
        <summary>Quick Check</summary>
        <p>${quiz[0]}</p>
        <p><strong>Answer:</strong> ${quiz[1][quiz[2]]}</p>
      </details>
      <details open>
        <summary>Exam Pattern</summary>
        <p>${frequent[0]}</p>
        <p><strong>Model idea:</strong> ${frequent[1]}</p>
      </details>
      ${practice ? `<details open>
        <summary>Practice Now</summary>
        <p>${practice[0]}</p>
        <p><strong>Answer points:</strong> ${practice[1]}</p>
      </details>` : ""}
    </div>
    <div class="resource-strip">
      <a class="btn secondary" href="#pack" data-switch-mode="practise">Open Practice</a>
      <a class="btn secondary" href="../classroom.html?chapter=${chapter.id}">Resource Hub</a>
      ${relatedPapers.length ? `<span>${relatedPapers.length} classified files ready</span>` : "<span>No classified file indexed yet</span>"}
    </div>`;
  }

  function renderMapFocusPanel(chapter, pack){
    return `<aside class="map-focus" id="mapFocus" aria-live="polite">
      ${renderMapFocusContent(chapter, pack, 0)}
    </aside>`;
  }

  function renderMapFocusContent(chapter, pack, index){
    const concept = chapter.concepts[index] || chapter.concepts[0];
    const question = chapter.frequent[index % chapter.frequent.length] || chapter.frequent[0];
    const trap = getExamTraps(chapter)[index % getExamTraps(chapter).length];
    const phrase = getBestAnswerPhrases(chapter, pack)[index % getBestAnswerPhrases(chapter, pack).length];
    const practice = pack ? [...pack.worksheet, ...pack.homework][index % (pack.worksheet.length + pack.homework.length)] : null;
    return `<p class="kicker">Focus Block ${index + 1}</p>
      <h3>${concept[0]}</h3>
      <p>${concept[1]}</p>
      <div class="focus-stack">
        <article><b>Exam trap</b><span>${trap}</span></article>
        <article><b>Best answer phrase</b><span>${phrase}</span></article>
        <article><b>Frequent question</b><span>${question[0]}</span></article>
        ${practice ? `<article><b>Try now</b><span>${practice[0]}</span></article>` : ""}
      </div>`;
  }

  function renderChapterSummary(chapter, pack){
    const mustKnow = getMustKnow(chapter, pack).slice(0,4);
    const traps = getExamTraps(chapter).slice(0,4);
    const phrases = getBestAnswerPhrases(chapter, pack).slice(0,4);
    return `<section class="panel chapter-summary-box" id="summary">
      <div>
        <p class="kicker">Chapter Summary Box</p>
        <h2>What Students Must Carry Into the Exam</h2>
        <p>${chapter.summary}</p>
      </div>
      <div class="summary-columns">
        <article>
          <h3>You must know:</h3>
          <ul>${mustKnow.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>Common exam traps:</h3>
          <ul>${traps.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>Best answer phrases:</h3>
          <ul>${phrases.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
      </div>
    </section>`;
  }

  function renderOnePageSummary(chapter, pack){
    const keyTerms = chapter.concepts.map(([title]) => title);
    const questionPatterns = getQuestionPatterns(chapter, pack);
    const reminders = getFormulaReminders(chapter);
    return `<section class="panel one-page-summary" id="one-page">
      <div class="topbar">
        <div>
          <p class="kicker">End-of-Chapter One-Page Summary</p>
          <h2>Chapter ${chapter.id}: ${chapter.title}</h2>
        </div>
        <button class="btn secondary print-btn" onclick="window.print()">Print Summary</button>
      </div>
      <div class="one-page-grid">
        <article>
          <h3>Key Terms</h3>
          <div class="term-cloud">${keyTerms.map(term => `<span>${term}</span>`).join("")}</div>
        </article>
        <article>
          <h3>Diagram</h3>
          <p><strong>${chapter.diagram.title}</strong></p>
          <div class="mini-flow">${chapter.diagram.steps.map((step,index) => `${index ? "<span>→</span>" : ""}<b>${step}</b>`).join("")}</div>
        </article>
        <article>
          <h3>Frequent Question Patterns</h3>
          <ul>${questionPatterns.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>Formula / Command-Word Reminders</h3>
          <ul>${reminders.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
      </div>
    </section>`;
  }

  function getMustKnow(chapter, pack){
    const conceptPoints = chapter.concepts.map(([title, body]) => `${title}: ${body}`);
    return pack && pack.highlights.length ? pack.highlights.concat(conceptPoints) : conceptPoints;
  }

  function getBestAnswerPhrases(chapter, pack){
    const packPhrases = pack ? pack.frequentAnswers.map(([q, a]) => `${q} ${a}`) : [];
    const chapterPhrases = chapter.frequent.map(([q, a]) => `${q} ${a}`);
    return (packPhrases.length ? packPhrases : chapterPhrases).map(text => shortenSentence(text, 150));
  }

  function getQuestionPatterns(chapter, pack){
    const packPatterns = pack ? pack.frequentAnswers.map(([q]) => q) : [];
    const frequent = chapter.frequent.map(([q]) => q);
    return [...packPatterns, ...frequent].slice(0,5);
  }

  function getFormulaReminders(chapter){
    const shared = [
      "Explain: point, because, link to the scenario.",
      "Compare: make the same feature different on both sides.",
      "Evaluate: advantage, disadvantage, judgement."
    ];
    const byChapter = {
      1: ["Data size: bit, nibble, byte, KiB, MiB, GiB. Always show binary conversion working."],
      2: ["Check digit, checksum and parity detect errors; they do not usually correct the original data."],
      3: ["Write output device answers with the real-world purpose, not only the device name."],
      4: ["Memory and storage are different: memory is active working space; storage keeps data long term."],
      5: ["Use the correct layer term: browser, web server, URL, HTTP/HTTPS, DNS and IP address."],
      6: ["Security answers need threat, method and protection. Avoid saying only 'use a password'."],
      7: ["Algorithm trace answers must update variables in order and follow loops exactly."],
      8: ["Data type matters: integer, real, Boolean, character and string are not interchangeable."],
      9: ["Database answers need table, record, field, key and validation used in the right place."],
      10: ["Logic simplification: use truth table rows carefully and name the final gate/output clearly."]
    };
    return [...(byChapter[chapter.id] || []), ...shared].slice(0,4);
  }

  function getExamTraps(chapter){
    const common = [
      "Giving a one-word answer when the command word asks for an explanation.",
      "Using a correct technical term but not linking it to the scenario.",
      "Writing benefits without matching disadvantages when asked to compare or evaluate."
    ];
    const byChapter = {
      1: ["Confusing bit and byte, or using decimal prefixes when the question expects binary units."],
      2: ["Saying parity, checksum or check digit can fix every transmission error."],
      3: ["Naming input/output devices without explaining why that device fits the situation."],
      4: ["Mixing up RAM, ROM, cache, virtual memory and secondary storage."],
      5: ["Treating the Internet and the World Wide Web as the same thing."],
      6: ["Describing malware, phishing, hacking and pharming with the same vague wording."],
      7: ["Ignoring the order of statements when tracing pseudocode."],
      8: ["Forgetting that arrays use indexes and that strings are made from characters."],
      9: ["Calling every field a primary key, or forgetting that validation does not prove data is true."],
      10: ["Mixing up AND, OR, NOT, NAND, NOR and XOR outputs in truth tables."]
    };
    return [...(byChapter[chapter.id] || []), ...common];
  }

  function shortenSentence(text, limit){
    return text;
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

  function setupModes(){
    const setMode = mode => {
      root.dataset.mode = mode;
      document.querySelectorAll(".mode-tab").forEach(button => {
        const active = button.dataset.mode === mode;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", active ? "true" : "false");
      });
      document.querySelectorAll(".side-menu a").forEach(link => {
        const target = document.querySelector(link.getAttribute("href"));
        const wrapper = target && target.closest("[data-mode-section]");
        link.classList.toggle("hidden", Boolean(wrapper && !wrapper.dataset.modes.split(" ").includes(mode)));
      });
    };
    document.querySelectorAll(".mode-tab").forEach(button => {
      button.addEventListener("click", () => setMode(button.dataset.mode));
    });
    document.querySelectorAll("[data-switch-mode]").forEach(link => {
      link.addEventListener("click", () => setMode(link.dataset.switchMode));
    });
    setMode("teach");
  }

  function setupSubtopics(){
    const detail = document.getElementById("subtopicDetail");
    if(!detail) return;
    const updateCount = () => {
      const count = document.getElementById("subtopicReadyCount");
      if(count) count.textContent = `${subtopicProgress.length}/${chapter.concepts.length}`;
    };
    const renderIndex = index => {
      document.querySelectorAll(".subtopic-tile").forEach(tile => {
        tile.classList.toggle("active", Number(tile.dataset.subtopicIndex) === index);
        tile.classList.toggle("ready", subtopicProgress.includes(Number(tile.dataset.subtopicIndex)));
        const status = tile.querySelector("small");
        if(status) status.textContent = subtopicProgress.includes(Number(tile.dataset.subtopicIndex)) ? "Exam ready" : "Learning";
      });
      detail.innerHTML = renderSubtopicDetail(chapter, pack, classifiedPapers, index);
      detail.scrollIntoView({behavior:"smooth", block:"nearest"});
    };
    document.querySelectorAll(".subtopic-tile").forEach(tile => {
      tile.addEventListener("click", () => renderIndex(Number(tile.dataset.subtopicIndex)));
    });
    detail.addEventListener("click", event => {
      const readyButton = event.target.closest("[data-ready-index]");
      if(readyButton){
        const index = Number(readyButton.dataset.readyIndex);
        subtopicProgress = subtopicProgress.includes(index)
          ? subtopicProgress.filter(item => item !== index)
          : [...subtopicProgress, index].sort((a,b) => a - b);
        localStorage.setItem(subtopicKey, JSON.stringify(subtopicProgress));
        renderIndex(index);
        updateCount();
        return;
      }
      const modeLink = event.target.closest("[data-switch-mode]");
      if(modeLink){
        const tab = document.querySelector(`.mode-tab[data-mode="${modeLink.dataset.switchMode}"]`);
        if(tab) tab.click();
      }
    });
    updateCount();
  }

  function setupMindmapFocus(){
    const focus = document.getElementById("mapFocus");
    if(!focus) return;
    document.querySelectorAll(".map-node").forEach(button => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.mapIndex);
        document.querySelectorAll(".map-node").forEach(node => node.classList.remove("active"));
        button.classList.add("active");
        focus.innerHTML = renderMapFocusContent(chapter, pack, index);
        focus.scrollIntoView({behavior:"smooth", block:"nearest"});
      });
    });
  }

  function setupAnswerToggle(){
    const button = document.getElementById("toggleAnswersBtn");
    if(!button) return;
    let answersVisible = true;
    button.addEventListener("click", () => {
      answersVisible = !answersVisible;
      document.querySelectorAll("details").forEach(detail => {
        detail.open = answersVisible;
      });
      button.textContent = answersVisible ? "Hide Answers" : "Show Answers";
    });
  }

  function renderAnswerShapes(){
    const shapes = [
      ["Explain", "Point → because → link to the scenario."],
      ["Compare", "Feature 1 for A → feature 1 for B → clear difference."],
      ["Calculate", "Formula → substitution → conversion → final answer with units."],
      ["Evaluate", "Advantage → disadvantage → judgement based on the context."],
      ["Describe", "Ordered steps using the correct technical terms."]
    ];
    return `<div class="answer-shape-grid">
      ${shapes.map(([title,body]) => `<article class="answer-shape"><b>${title}</b><p>${body}</p></article>`).join("")}
    </div>`;
  }

  function renderWorkedExample(pack){
    const example = pack.workedExample || {
      question: pack.worksheet[0][0],
      thinking: ["Identify the command word.", "Underline the key technical terms.", "Write answer points in the order marks are likely awarded."],
      answer: pack.worksheet[0][1],
      marks: ["Use precise vocabulary.", "Show working for calculations.", "Link explanation to the scenario."]
    };
    return `<section class="panel worked-example" id="worked">
      <span class="tag">Teacher model</span>
      <h2>Worked Example</h2>
      <div class="worked-layout">
        <article>
          <h3>Question</h3>
          <p>${example.question}</p>
        </article>
        <article>
          <h3>How to Think</h3>
          <ol>${example.thinking.map(item => `<li>${item}</li>`).join("")}</ol>
        </article>
        <article>
          <h3>Model Answer</h3>
          <p>${example.answer}</p>
        </article>
        <article>
          <h3>Mark Points</h3>
          <ul>${example.marks.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
      </div>
    </section>`;
  }

  function renderPracticePack(pack){
    return `<section class="panel practice-pack" id="pack">
      <div class="topbar">
        <div>
          <h2>Compact Worksheet & Homework Pack</h2>
          <p>Original exam-style practice based on the 2018-2022 paper style and the textbook chapter content.</p>
        </div>
        <button class="btn secondary print-btn" onclick="window.print()">Print</button>
      </div>
      <div class="pack-focus">
        <article>
          <h3>Exam Style</h3>
          <ul>${pack.examStyle.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>Textbook / PPT Highlights</h3>
          <ul>${pack.highlights.map(item => `<li>${item}</li>`).join("")}</ul>
        </article>
      </div>
      <h3>Frequent Answer Patterns</h3>
      <div class="qa-list">
        ${pack.frequentAnswers.map(([q,a]) => `<details class="qa-item" open><summary>${q}</summary><p>${a}</p></details>`).join("")}
      </div>
      <div class="pack-columns">
        ${renderPackList("Worksheet", pack.worksheet)}
        ${renderPackList("Homework", pack.homework)}
      </div>
    </section>`;
  }

  function renderPackList(title, items){
    return `<article class="pack-card">
      <span class="tag">${title}</span>
      ${items.map((item,index) => `<details class="pack-question" open><summary>${index + 1}. ${item[0]}</summary><p><strong>Answer points:</strong> ${item[1]}</p></details>`).join("")}
    </article>`;
  }

  function renderClassifiedPapers(items){
    if(!items.length) return "";
    const byYear = items.reduce((acc, item) => {
      acc[item.year] = acc[item.year] || [];
      acc[item.year].push(item);
      return acc;
    }, {});
    return `<section class="panel" id="classified">
      <div class="topbar">
        <div>
          <h2>Classified Paper Practice</h2>
          <p>${items.length} local classified-paper files for Chapter ${chapter.id}. Use these after students finish the compact pack.</p>
        </div>
        <a class="btn secondary" href="../classroom.html?chapter=${chapter.id}">Open in Classroom Hub</a>
      </div>
      <div class="classified-year-grid">
        ${Object.keys(byYear).sort().map(year => `<article class="classified-year">
          <h3>${year}</h3>
          ${byYear[year].map(renderClassifiedLink).join("")}
        </article>`).join("")}
      </div>
    </section>`;
  }

  function renderClassifiedLink(item){
    return `<div class="classified-mini-row">
      <span class="chip">${item.kind === "answer" ? "Answer" : "Question"}</span>
      <a href="${item.href}">${item.title}</a>
      <button class="copy-classified" data-copy="${escapeHtml(item.path)}">Copy</button>
    </div>`;
  }

  function setupCopyButtons(){
    document.querySelectorAll("[data-copy]").forEach(button => {
      button.addEventListener("click", async () => {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = "Copied";
        setTimeout(() => button.textContent = button.classList.contains("copy-classified") ? "Copy" : "Copy Path", 1000);
      });
    });
  }

  function escapeHtml(text){
    return String(text).replace(/[&<>"']/g, char => ({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#039;"
    }[char]));
  }

  function renderLessonMode(chapter, decks){
    if(!decks.length){
      return `<section class="lesson-mode hidden" id="lessonMode" aria-label="Lesson mode">
        <div class="lesson-stage empty">
          <div class="lesson-top">
            <span>No PowerPoint lesson deck found for Chapter ${chapter.id}</span>
            <button class="lesson-close" id="lessonCloseBtn">Close</button>
          </div>
          <article class="lesson-slide active">
            <p class="kicker">PowerPoint source needed</p>
            <h2>Add a PPTX file for Chapter ${chapter.id}</h2>
            <p>Run <strong>node tools/generate-powerpoint-data.js</strong> and <strong>node tools/generate-lesson-slides-data.js</strong> after adding your PowerPoint.</p>
          </article>
        </div>
      </section>`;
    }
    return `<section class="lesson-mode hidden" id="lessonMode" aria-label="Lesson mode" style="--lesson-bg:url('../assets/lesson-backgrounds/cs-light-classroom.png')">
      <div class="lesson-stage">
        <div class="lesson-top">
          <div>
            <span id="lessonCounter">1 / ${decks[0].slideCount}</span>
            <strong id="lessonDeckTitle">${escapeHtml(decks[0].topic)} · ${escapeHtml(decks[0].title)}</strong>
          </div>
          <button class="lesson-close" id="lessonCloseBtn">Close</button>
        </div>
        <div class="lesson-deck-rail" aria-label="PowerPoint decks">
          ${decks.map((deck, deckIndex) => `<button class="${deckIndex === 0 ? "active" : ""}" data-lesson-deck="${deckIndex}" data-lesson-bg="${escapeHtml(lessonImage(deck))}" style="--deck-thumb:url('${escapeHtml(lessonImage(deck))}')" type="button">
            <span>T${deck.topicNumber || deckIndex + 1}</span>
            <b>${escapeHtml(deck.topic)}</b>
            <small>${deck.slideCount} slides</small>
          </button>`).join("")}
        </div>
        <div class="lesson-slide-stack">
          ${decks.map((deck, deckIndex) => deck.slides.map((slide, slideIndex) => renderPowerPointLessonSlide(deck, deckIndex, slide, slideIndex)).join("")).join("")}
        </div>
        <div class="lesson-controls">
          <a class="btn secondary" id="lessonOpenDeckBtn" href="${decks[0].href}" target="_blank" rel="noreferrer">Open PPT</a>
          <button class="btn secondary" id="lessonPrevBtn">Previous</button>
          <button class="btn" id="lessonNextBtn">Next</button>
        </div>
      </div>
    </section>`;
  }

  function renderPowerPointLessonSlide(deck, deckIndex, slide, slideIndex){
    const titleClass = slide.title.length > 54 ? " compact-title" : "";
    return `<article class="lesson-slide${deckIndex === 0 && slideIndex === 0 ? " active" : ""}" data-deck-index="${deckIndex}" data-slide-index="${slideIndex}">
      <div class="lesson-slide-inner">
        <div class="lesson-copy">
          <div class="lesson-meta-row">
            <span>${escapeHtml(deck.topic)}</span>
            <span>PPT slide ${slide.number}</span>
          </div>
          <h2 class="${titleClass}">${emphasiseTitle(slide.title)}</h2>
          ${renderLessonPoints(slide)}
          <p class="lesson-source">Source: ${escapeHtml(deck.title)}</p>
        </div>
        ${renderLessonVisual(deck, slide)}
      </div>
    </article>`;
  }

  function renderLessonPoints(slide){
    if(!slide.lines.length) return "";
    const important = slide.lines.slice(0, 6);
    if(important.length === 1){
      return `<p class="lesson-lead">${escapeHtml(important[0])}</p>`;
    }
    return `<div class="lesson-point-grid">
      ${important.map((line, index) => `<article class="lesson-point-card">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <p>${highlightInlineTerms(line)}</p>
      </article>`).join("")}
    </div>`;
  }

  function emphasiseTitle(text){
    const safe = escapeHtml(text);
    const words = safe.split(/\s+/);
    if(words.length < 2) return safe;
    const first = words.slice(0, Math.min(2, words.length)).join(" ");
    const rest = words.slice(Math.min(2, words.length)).join(" ");
    return `<span>${first}</span>${rest ? ` ${rest}` : ""}`;
  }

  function highlightInlineTerms(text){
    const terms = ["CPU", "ALU", "CU", "RAM", "ROM", "binary", "hexadecimal", "packet", "encryption", "SQL", "array", "loop", "algorithm", "logic", "sensor", "actuator", "compiler", "interpreter", "validation", "verification"];
    let safe = escapeHtml(text);
    terms.forEach(term => {
      safe = safe.replace(new RegExp(`\\b(${escapeRegExp(term)})\\b`, "gi"), "<strong>$1</strong>");
    });
    return safe;
  }

  function escapeRegExp(text){
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function lessonImage(deck){
    return deck.thumbnail || deck.fallbackBackground || "../assets/lesson-backgrounds/cs-fallback.png";
  }

  function renderLessonVisual(deck, slide){
    const type = getLessonVisualType(deck, slide);
    const title = escapeHtml(deck.topic || "Lesson visual");
    const subtitle = escapeHtml(shortVisualLabel(slide.title || deck.title));
    const keywords = extractVisualKeywords(deck, slide, type);
    return `<figure class="lesson-visual ${type}" aria-label="${title} visual">
      <div class="visual-orbit">
        <span></span><span></span><span></span>
      </div>
      <div class="visual-scene">${renderVisualScene(type, keywords)}</div>
      <figcaption>
        <b>${title}</b>
        <span>${subtitle}</span>
        <div class="visual-keywords">${keywords.slice(0, 4).map(word => `<em>${escapeHtml(word)}</em>`).join("")}</div>
      </figcaption>
    </figure>`;
  }

  function getLessonVisualType(deck, slide){
    const text = `${deck.topic} ${deck.title} ${slide.title} ${(slide.lines || []).join(" ")}`.toLowerCase();
    if(/robot|automated|sensor|actuator|artificial|machine learning|ai\b/.test(text)) return "robotics";
    if(/packet|transmission|network|internet|web|dns|ip address|mac address|router|server/.test(text)) return "network";
    if(/cyber|security|encryption|password|malware|phishing|firewall/.test(text)) return "security";
    if(/cpu|alu|control unit|\bcu\b|register|memory|bus|von neumann|fetch-decode-execute|fde\b/.test(text)) return "hardware";
    if(/algorithm|pseudocode|trace|flowchart|validation|verification|test data/.test(text)) return "algorithm";
    if(/program|array|file handling|procedure|function|iteration|selection|data type|operator/.test(text)) return "programming";
    if(/logic|boolean logic|logic gate|truth table|\bxor\b|\bnand\b|\bnor\b/.test(text)) return "logic";
    if(/database|sql|record|field|primary key/.test(text)) return "database";
    if(/binary|hex|image|sound|compression|ascii|unicode|data representation|storage/.test(text)) return "data";
    if(/software|operating system|translator|compiler|interpreter|ide|interrupt/.test(text)) return "software";
    return "hardware";
  }

  function renderVisualScene(type, keywords){
    const labels = getVisualLabels(type, keywords);
    const scenes = {
      hardware: `<div class="chip-core"><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></div><div class="bus-lines"><i></i><i></i><i></i></div><div class="device-row"><b>${labels[3]}</b><b>${labels[4]}</b><b>${labels[5]}</b></div>`,
      data: `<div class="binary-rain"><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span><span>${labels[3]}</span></div><div class="data-cubes"><b></b><b></b><b></b><b></b></div>`,
      network: `<div class="network-map"><b></b><b></b><b></b><b></b><i></i><i></i><i></i></div><div class="packet-train"><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></div>`,
      security: `<div class="shield-lock"><b></b><span></span></div><div class="secure-dots"><i></i><i></i><i></i><i></i></div>`,
      software: `<div class="code-window"><b></b><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></div><div class="translator-flow"><i>${labels[3]}</i><i>${labels[4]}</i><i>${labels[5]}</i></div>`,
      robotics: `<div class="control-loop"><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></div><div class="robot-arm"><b></b><b></b><b></b></div>`,
      algorithm: `<div class="flowchart-visual"><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></div><div class="trace-grid"><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
      programming: `<div class="code-window"><b></b><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></div><div class="array-blocks"><i>0</i><i>1</i><i>2</i><i>3</i></div>`,
      database: `<div class="database-cylinder"><b></b><span></span><span></span></div><div class="table-grid"><i>${labels[0]}</i><i>${labels[1]}</i><i>${labels[2]}</i><i>${labels[3]}</i><i>${labels[4]}</i><i>${labels[5]}</i></div>`,
      logic: `<div class="logic-gates"><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></div><div class="truth-mini"><i>0</i><i>1</i><i>1</i><i>0</i></div>`
    };
    return scenes[type] || scenes.hardware;
  }

  function extractVisualKeywords(deck, slide, type){
    const text = `${deck.topic} ${slide.title} ${(slide.lines || []).join(" ")}`;
    const known = [
      "CPU architecture", "fetch-decode-execute", "ALU", "CU", "register", "memory", "bus", "cache",
      "binary", "hexadecimal", "ASCII", "Unicode", "image", "sound", "compression",
      "packet", "serial", "parallel", "simplex", "duplex", "encryption", "checksum", "parity",
      "operating system", "compiler", "interpreter", "IDE", "interrupt",
      "sensor", "processor", "actuator", "robotics", "AI", "machine learning",
      "algorithm", "flowchart", "pseudocode", "trace table", "validation", "verification",
      "array", "loop", "selection", "procedure", "function", "file handling",
      "database", "SQL", "primary key", "record", "field", "table",
      "logic gate", "truth table", "XOR"
    ];
    const found = known.filter(term => new RegExp(`\\b${escapeRegExp(term)}\\b`, "i").test(text));
    const titleWords = String(slide.title || deck.topic)
      .replace(/[^a-zA-Z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter(word => word.length > 3 && !["chapter", "lesson", "updated", "slide", "understand", "objectives", "starter", "following", "common"].includes(word.toLowerCase()))
      .slice(0, 4);
    const defaults = {
      hardware: ["CPU", "ALU", "Memory", "Bus"],
      data: ["Binary", "Hex", "ASCII", "Compression"],
      network: ["Packet", "Address", "Route", "Protocol"],
      security: ["Threat", "Key", "Firewall", "Encryption"],
      software: ["Source", "Translate", "IDE", "Run"],
      robotics: ["Sensor", "Processor", "Actuator", "Feedback"],
      algorithm: ["Input", "Process", "Decision", "Output"],
      programming: ["Variable", "Selection", "Loop", "Array"],
      database: ["Table", "Record", "Field", "Key"],
      logic: ["Input", "Gate", "Truth", "Output"]
    };
    return [...new Set([...found, ...titleWords, ...(defaults[type] || [])])].slice(0, 8);
  }

  function getVisualLabels(type, keywords){
    const defaults = {
      hardware: ["CU", "ALU", "REG", "Input", "Memory", "Output"],
      data: ["1010", "0xAF", "ASCII", "JPEG", "Bits", "Bytes"],
      network: ["Header", "Data", "Trailer", "Route", "IP", "Packet"],
      security: ["Key", "Threat", "Protect", "Hash", "User", "Data"],
      software: ["Source", "Run", "IDE", "Source", "Translate", "Object"],
      robotics: ["Sensor", "Processor", "Actuator", "Feedback", "Input", "Output"],
      algorithm: ["Input", "Decision", "Output", "Trace", "Test", "Refine"],
      programming: ["FOR", "IF", "ARRAY", "Index", "Loop", "File"],
      database: ["Table", "Record", "Key", "101", "Field", "PK"],
      logic: ["AND", "OR", "NOT", "Input", "Gate", "Output"]
    };
    return [...keywords, ...(defaults[type] || defaults.hardware)].slice(0, 6).map(compactVisualLabel);
  }

  function compactVisualLabel(text){
    const value = shortVisualLabel(text);
    const replacements = {
      "CPU architecture": "CPU",
      "fetch-decode-execute": "FDE",
      "operating system": "OS",
      "machine learning": "ML",
      "primary key": "Key",
      "truth table": "Truth",
      "logic gate": "Gate",
      "data representation": "Data",
      "hexadecimal": "Hex",
      "validation": "Valid",
      "verification": "Verify",
      "pseudocode": "Pseudo",
      "file handling": "File",
      "artificial intelligence": "AI"
    };
    const matched = Object.keys(replacements).find(key => key.toLowerCase() === value.toLowerCase());
    if(matched) return replacements[matched];
    return value.length > 12 ? value.split(/\s|-/).map(part => part[0]).join("").slice(0, 5).toUpperCase() : value;
  }

  function shortVisualLabel(text){
    return String(text).replace(/\s+/g, " ").trim().slice(0, 70);
  }

  function setupLessonMode(){
    const lesson = document.getElementById("lessonMode");
    if(!lesson) return;
    const slides = [...lesson.querySelectorAll(".lesson-slide")];
    const deckButtons = [...lesson.querySelectorAll("[data-lesson-deck]")];
    const counter = document.getElementById("lessonCounter");
    const deckTitle = document.getElementById("lessonDeckTitle");
    const openDeck = document.getElementById("lessonOpenDeckBtn");
    let deckIndex = 0;
    let slideIndex = 0;
    const deckSlides = index => slides.filter(slide => Number(slide.dataset.deckIndex || 0) === index);
    const show = (nextDeck, nextSlide) => {
      deckIndex = Math.max(0, Math.min(deckButtons.length ? deckButtons.length - 1 : 0, nextDeck));
      const currentDeckSlides = deckSlides(deckIndex);
      slideIndex = Math.max(0, Math.min(currentDeckSlides.length - 1, nextSlide));
      slides.forEach(slide => {
        slide.classList.toggle("active", Number(slide.dataset.deckIndex || 0) === deckIndex && Number(slide.dataset.slideIndex || 0) === slideIndex);
      });
      deckButtons.forEach(button => button.classList.toggle("active", Number(button.dataset.lessonDeck) === deckIndex));
      if(counter) counter.textContent = `${slideIndex + 1} / ${currentDeckSlides.length}`;
      if(deckTitle && lessonDecks[deckIndex]) deckTitle.textContent = `${lessonDecks[deckIndex].topic} · ${lessonDecks[deckIndex].title}`;
      if(openDeck && lessonDecks[deckIndex]) openDeck.href = lessonDecks[deckIndex].href;
    };
    document.getElementById("lessonModeBtn").onclick = () => {
      lesson.classList.remove("hidden");
      document.body.classList.add("lesson-open");
      show(deckIndex, slideIndex);
    };
    document.getElementById("lessonCloseBtn").onclick = () => {
      lesson.classList.add("hidden");
      document.body.classList.remove("lesson-open");
    };
    deckButtons.forEach(button => {
      button.addEventListener("click", () => show(Number(button.dataset.lessonDeck), 0));
    });
    const previous = () => show(deckIndex, slideIndex - 1);
    const next = () => show(deckIndex, slideIndex + 1);
    const prevButton = document.getElementById("lessonPrevBtn");
    const nextButton = document.getElementById("lessonNextBtn");
    if(prevButton) prevButton.onclick = previous;
    if(nextButton) nextButton.onclick = next;
    document.addEventListener("keydown", event => {
      if(lesson.classList.contains("hidden")) return;
      if(event.key === "Escape") document.getElementById("lessonCloseBtn").click();
      if(event.key === "ArrowRight") next();
      if(event.key === "ArrowLeft") previous();
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
