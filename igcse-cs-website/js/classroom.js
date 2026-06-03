(function(){
  const packs = window.PRACTICE_PACKS;
  const classified = window.CLASSIFIED_PAPERS;
  const chapters = window.CHAPTERS;
  const $ = id => document.getElementById(id);

  $("chapterFilter").innerHTML = [
    `<option value="all">All chapters</option>`,
    ...chapters.map(chapter => `<option value="${chapter.id}">Chapter ${chapter.id}: ${chapter.title}</option>`)
  ].join("");

  const params = new URLSearchParams(location.search);
  if (params.get("chapter")) $("chapterFilter").value = params.get("chapter");

  const years = [...new Set(classified.papers.map(item => item.year))].sort((a,b) => a - b);
  $("classifiedYearFilter").innerHTML = [`<option value="all">All years</option>`, ...years.map(year => `<option value="${year}">${year}</option>`)].join("");

  ["chapterFilter","packFilter","resourceSearch"].forEach(id => $(id).addEventListener("input", () => {
    renderPacks();
    renderClassified();
  }));
  ["classifiedYearFilter","classifiedKindFilter","classifiedSearch"].forEach(id => $(id).addEventListener("input", renderClassified));
  renderPacks();
  renderClassified();

  function renderPacks(){
    const chapter = $("chapterFilter").value;
    const mode = $("packFilter").value;
    const query = $("resourceSearch").value.trim().toLowerCase();
    const filtered = packs.filter(pack => {
      const chapterOk = chapter === "all" || pack.id === Number(chapter);
      const searchText = JSON.stringify(pack).toLowerCase();
      const queryOk = !query || searchText.includes(query);
      return chapterOk && queryOk;
    });

    $("packMount").innerHTML = filtered.map(pack => `
      <article class="teacher-pack">
        <div class="topbar">
          <div>
            <span class="tag">Chapter ${pack.id}</span>
            <h2>${pack.chapter}</h2>
          </div>
          <a class="btn secondary" href="chapters/chapter${pack.id}.html#pack">Open Chapter Page</a>
        </div>
        <div class="pack-focus">
          <section>
            <h3>Textbook / PPT highlights</h3>
            <ul>${pack.highlights.map(item => `<li>${item}</li>`).join("")}</ul>
          </section>
          <section>
            <h3>Frequent answer patterns</h3>
            ${pack.frequentAnswers.map(([stem,answer]) => `<p><strong>${stem}</strong> ${answer}</p>`).join("")}
          </section>
        </div>
        <div class="pack-columns">
          ${mode !== "homework" ? renderPack("Worksheet", pack.worksheet) : ""}
          ${mode !== "worksheet" ? renderPack("Homework", pack.homework) : ""}
        </div>
      </article>
    `).join("") || `<p class="note">No matching pack found.</p>`;
  }

  function renderPack(title, items){
    return `<section class="pack-card">
      <span class="chip">${title}</span>
      ${items.map((item,index) => `<details class="pack-question" open><summary>${index + 1}. ${item[0]}</summary><p><strong>Answer points:</strong> ${item[1]}</p></details>`).join("")}
    </section>`;
  }

  function renderClassified(){
    const chapter = $("chapterFilter").value;
    const year = $("classifiedYearFilter").value;
    const kind = $("classifiedKindFilter").value;
    const query = $("classifiedSearch").value.trim().toLowerCase();

    const filtered = classified.papers.filter(item => {
      const chapterOk = chapter === "all" || item.chapter === Number(chapter);
      const yearOk = year === "all" || item.year === Number(year);
      const kindOk = kind === "all" || item.kind === kind;
      const queryOk = !query || `${item.title} ${item.fileName} ${item.year} ${item.kind}`.toLowerCase().includes(query);
      return chapterOk && yearOk && kindOk && queryOk;
    });

    $("classifiedSummary").textContent = `${filtered.length} matching files from ${classified.papers.length} indexed classified-paper files.`;
    $("classifiedMount").innerHTML = filtered.map(item => `
      <article class="classified-row">
        <div>
          <span class="tag">Chapter ${item.chapter}</span>
          <span class="chip">${item.year}</span>
          <span class="chip">${item.kind === "answer" ? "Answer" : "Question"}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.fileName)}</p>
        </div>
        <div class="resource-actions">
          <a class="btn secondary" href="${item.href}">Open</a>
          <button class="btn" data-copy="${escapeHtml(item.path)}">Copy Path</button>
        </div>
      </article>
    `).join("") || `<p class="note">No classified paper files match this filter.</p>`;

    document.querySelectorAll("[data-copy]").forEach(button => {
      button.addEventListener("click", async () => {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = "Copied";
        setTimeout(() => button.textContent = "Copy Path", 1000);
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
})();
