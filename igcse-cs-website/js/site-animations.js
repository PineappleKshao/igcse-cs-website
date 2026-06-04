import { animate, stagger } from "./vendor/anime.esm.min.js";

(function(){
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasAnime = typeof animate === "function";

  if(reduceMotion || !hasAnime){
    document.documentElement.classList.add("motion-reduced");
    return;
  }

  document.documentElement.classList.add("anime-enhanced");

  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function run(targets, params){
    const list = typeof targets === "string" ? $$(targets) : Array.from(targets || []);
    if(!list.length) return null;
    return animate(list, params);
  }

  function reveal(targets, options = {}){
    const list = typeof targets === "string" ? $$(targets) : Array.from(targets || []);
    if(!list.length) return;
    list.forEach(item => {
      item.style.opacity = "0";
      item.style.transform = "translateY(18px)";
    });
    requestAnimationFrame(() => {
      run(list, {
        opacity: [0, 1],
        y: [18, 0],
        duration: options.duration || 720,
        delay: options.delay || stagger(options.stagger || 70),
        ease: options.ease || "outCubic"
      });
    });
  }

  function revealOnView(){
    const targets = $$(".panel, .chapter-card, .teacher-card, .apple-feature-grid article, .resource-row, .classified-row");
    if(!targets.length) return;

    targets.forEach(item => {
      item.style.opacity = "0";
      item.style.transform = "translateY(22px)";
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animate(entry.target, {
          opacity: [0, 1],
          y: [22, 0],
          duration: 620,
          ease: "outCubic"
        });
      });
    }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(item => observer.observe(item));
  }

  function pageIntro(){
    reveal("header .kicker, header h1, header .hero-inner > p:not(.kicker), .apple-eyebrow, .apple-hero h1, .apple-subtitle", {
      stagger: 90,
      duration: 760
    });

    reveal(".apple-actions a, .toolbar .btn, .cockpit-actions > *", {
      stagger: 55,
      duration: 520
    });

    run(".device-shell", {
      opacity: [0, 1],
      y: [36, 0],
      rotateX: [8, 3],
      duration: 980,
      delay: 260,
      ease: "outCubic"
    });

    run(".screen-map .map-dot", {
      scale: [.85, 1],
      opacity: [0, 1],
      delay: stagger(80, { from: "center" }),
      duration: 620,
      ease: "outBack"
    });

    revealOnView();
  }

  function pulseTeachingTargets(){
    run(".section-card.active span, .map-node.active, .mode-tab.active", {
      scale: [1, 1.04, 1],
      duration: 760,
      delay: 450,
      ease: "inOutSine"
    });
  }

  function clickFeedback(target){
    animate(target, {
      scale: [1, .975, 1],
      duration: 260,
      ease: "outQuad"
    });
  }

  function refreshPanel(targetSelector){
    requestAnimationFrame(() => {
      run(targetSelector, {
        opacity: [.25, 1],
        y: [12, 0],
        duration: 360,
        ease: "outCubic"
      });
    });
  }

  function bindInteractions(){
    document.addEventListener("click", event => {
      const clickable = event.target.closest(".btn, .apple-primary, .apple-link, .chapter-card, .section-card, .mode-tab, .section-tab, .map-node, .quiz-option, .resource-card, .video-link-card");
      if(clickable) clickFeedback(clickable);

      if(event.target.closest(".section-card, .section-tab")){
        refreshPanel(".section-detail-panel");
      }
      if(event.target.closest(".map-node")){
        refreshPanel(".map-focus-panel, .focus-card");
      }
      if(event.target.closest(".mode-tab")){
        refreshPanel("[data-mode-section]:not(.hidden)");
      }
      if(event.target.closest("#lessonModeBtn")){
        setTimeout(() => {
          run(".lesson-mode", {
            opacity: [0, 1],
            scale: [.985, 1],
            duration: 440,
            ease: "outCubic"
          });
          run(".lesson-deck-rail button", {
            opacity: [0, 1],
            y: [-8, 0],
            delay: stagger(35),
            duration: 360,
            ease: "outCubic"
          });
        }, 40);
      }
    });
  }

  function observeLessonChanges(){
    const root = document.getElementById("lessonMode");
    if(!root) return;
    const observer = new MutationObserver(records => {
      if(!records.some(record => record.addedNodes.length || record.type === "attributes")) return;
      const slide = root.querySelector(".lesson-slide-inner");
      const visual = root.querySelector(".lesson-visual");
      if(slide){
        animate(slide, {
          opacity: [.2, 1],
          y: [18, 0],
          duration: 360,
          ease: "outCubic"
        });
      }
      if(visual){
        animate(visual, {
          opacity: [.35, 1],
          scale: [.985, 1],
          duration: 420,
          ease: "outCubic"
        });
      }
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  window.addEventListener("DOMContentLoaded", () => {
    pageIntro();
    bindInteractions();
    observeLessonChanges();
    pulseTeachingTargets();
  });
})();
