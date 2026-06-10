# IGCSE Computer Science Teaching Companion

A static classroom teaching companion for Cambridge IGCSE Computer Science teachers. The current product direction is a classroom interaction, display and explanation tool: teach one concept, check understanding, discuss a common mistake, reveal a short model answer, and finish with an exit check.

## Features

- 10 chapter pages covering the full textbook outline:
  - Data Representation
  - Data Transmission
  - Hardware
  - Software
  - The Internet and Its Uses
  - Automated and Emerging Technologies
  - Algorithm Design and Problem Solving
  - Programming
  - Databases
  - Boolean Logic
- Three-mode chapter pages: `Teach`, `Overview` and `Exit Check`.
- Editable Year 1 Teaching Timeline for a 3-lessons-per-week class starting from Chapter 1.
- Teacher-first homepage with action buttons for starting a classroom flow, running a class check and opening the chapter library.
- Teacher Control Panel with today’s lesson selector, quick classroom actions, suggested lesson flow, frequently used tools and saved teacher notes.
- Classroom Teaching Mode on every chapter, with projector-ready Teach Cards, Common Mistakes and Class Check cards.
- Chapter 3 contains hand-written teaching cards; other chapters generate teaching cards from the existing chapter concepts and frequent questions.
- Card-level answer reveal controls, designed for students to think first before seeing the model answer.
- Projector Mode for cleaner classroom display and larger readable teaching cards.
- Section-by-section teaching workspace on each chapter page, where the teacher clicks one textbook section at a time.
- PowerPoint-folder resource index for local PPTX, PDF, DOCX, code, media and video shortcut files.
- Slides panel inside each section, with PDF preview when available and one-click opening for PowerPoint files.
- Video panel inside each section, with saved future video links stored in the browser.
- Interactive big-picture mindmap on every chapter page, with nodes that open focused concept cards.
- Chapter Summary Box with "You must know", "Common exam traps" and "Best answer phrases".
- End-of-Chapter One-Page Summary with key terms, diagram, frequent question patterns and command-word reminders.
- Core concept cards written in student-friendly language.
- Visual process model for each chapter.
- Exam-focus highlights for common IGCSE question patterns.
- Frequent-question section with expandable answers.
- Three-question quick quiz for every chapter.
- Browser localStorage progress tracking.
- Teacher Classroom Hub and worksheet packs are kept as secondary resources, not the main classroom flow.
- Lesson Mode on every chapter page for projector-friendly classroom teaching.
- Apple-inspired visual system across the home page, dashboard, Classroom Hub, chapter pages and Lesson Mode.
- Anime.js-powered motion layer for page reveals, card stagger, click feedback and lesson transitions.
- Responsive page scaling for desktop, projector and mobile screens.
- Worked examples and command-word answer templates on chapter pages.
- Classified-paper practice section using local chapter/year classified files.
- No login interface and no build step required: plain HTML, CSS and JavaScript.

## Project Structure

```text
igcse-cs-website/
  index.html              # Teacher Companion landing page
  dashboard.html          # Teacher Control Panel
  year-plan.html          # Editable Year 1 teaching timeline and three-year route
  classroom.html          # Secondary worksheet/homework resource hub
  chapters/
    chapter1.html         # Chapter wrappers
    :
    chapter10.html
  css/
    style.css             # Shared Apple-inspired visual system and site styling
  js/
    content.js            # All chapter content and quiz data
    year-plan-data.js     # 36-week Year 1 timeline and three-year IGCSE route
    year-plan.js          # Editable timeline UI, status filters and localStorage saving
    practice-packs.js     # Original worksheet/homework packs and answer points
    textbook-guide.js     # Paraphrased textbook-aligned teaching flow for each chapter
    classified-papers.js  # Generated local classified-paper index
    powerpoint-resources.js # Generated local PowerPoint-folder resource index
    lesson-slides.js      # Generated slide text extracted from local PPTX files
    classroom.js          # Classroom Hub pack filtering UI
    chapter.js            # Reusable chapter page, quiz, worked-example and lesson-mode renderer
    progress.js           # Teacher Control Panel renderer and localStorage helpers
    site-animations.js    # Shared Anime.js motion layer
    vendor/
      anime.esm.min.js    # Local Anime.js v4 bundle
      anime-LICENSE.md    # Anime.js MIT license
  tools/
    generate-classified-data.js
    generate-powerpoint-data.js
    generate-lesson-slides-data.js
```

## How To Run Locally

Because this is a static site, you can open `igcse-cs-website/index.html` directly in a browser.

For a local server:

```bash
cd igcse-cs-website
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Teacher Control Panel

The dashboard has been repositioned as a `Teacher Control Panel`, not a student progress tracker.

It includes:

- a chapter selector for today’s lesson
- launch buttons for Classroom Flow, Section View, Answer Training and Exit Ticket
- quick actions for Projector Mode, Exit Ticket, Class Check tools and teaching notes
- a suggested 40-minute lesson flow
- frequently used chapter tools
- local teacher notes saved in `localStorage`
- a smaller chapter library and progress section for reference

## Year 1 Teaching Timeline

The Year Plan page is the planning layer before opening daily lesson pages.

It assumes:

- next semester starts from Chapter 1
- one class has 3 Computer Science lessons per week
- Year 1 has 36 teaching weeks, giving 108 planned lessons
- the three-year IGCSE path starts with foundations, then moves into systems, problem solving and exam readiness

The default Year 1 order is:

```text
Chapter 1 → Chapter 10 → Chapter 3 → Chapter 2 → Chapter 4
```

This gives students a foundation in data representation, Boolean logic, hardware, data transmission and software before the remaining chapters are taught in Years 2 and 3.

On `year-plan.html`, each week can be clicked to open a planning popup. The teacher can change the status to `Not started`, `In progress` or `Finished`, add a start date, adjust the lesson count and write teaching notes. The page also includes chapter/status filters, milestone cards, progress tracking and Excel export.

The `Export Excel` button downloads:

```text
igcse-cs-year1-teaching-plan.xls
```

The exported sheet includes week number, chapter, section, topic, status, start date, lesson count, objectives, lesson flow, assessment, resources and teacher notes.

The timeline is saved in the current browser using:

```text
localStorage key: igcse_year1_timeline_state_v1
```

## Progress And Local Storage

Progress, teacher notes, year-plan edits, projector-mode preference and answer-visibility preference are saved in the current browser using `localStorage`, so the site does not require accounts, passwords, APIs or a backend database.

## Core Product Direction

The current core direction is:

```text
Teacher opens website
→ checks the Year Plan
→ chooses today’s concept
→ opens Classroom Teaching Mode
→ explains with a Teach Card
→ asks students to think first
→ discusses a common mistake
→ reveals a model answer
→ finishes with an Exit Check
```

The site is not currently optimised as a worksheet library. Worksheet and classified-paper resources are still kept in the project, but they are intentionally demoted from the main navigation and classroom flow.

## Classroom Hub

The Classroom Hub provides original worksheet and homework packs for every chapter. It is now treated as a secondary resource area for printing or preparation, not the primary classroom interface.

The pack design follows this source logic:

- 2018-2020 past-paper style informs worksheet-style guided practice.
- 2021-2022 past-paper style informs homework-style independent practice.
- Textbook and PowerPoint topics define the content coverage for each chapter.
- Frequent answer patterns show students the phrasing and mark points they should learn.

Use the Classroom Hub only when you actually need a printed handout.

## Chapter Page Teaching Flow

Each chapter page is designed to work as a live teaching page during class:

- Use Classroom Teaching Mode for Teach Cards, Common Mistakes and Class Check cards.
- Use Projector Mode when displaying a Teach Card to the class.
- Use Reveal Model Answer buttons at card level so students think first before seeing the model answer.
- Use `Teach` mode as the main classroom control panel. Start with the Classroom Teaching Mode cards, then open section slides only when needed.
- Use the `Teach` tab inside a section for lesson objective, teacher flow, board plan, must-know content, common exam trap, best answer phrase and key concept.
- Use the `Slides` tab to open local PowerPoint files. If a matching PDF is available, the page can preview it directly in the browser.
- Treat the older `Practice` and `Video` section tabs as optional resource areas, not the primary classroom flow.
- Use the interactive mindmap in `Overview` mode as a visual overview. Each block opens a focused card with a concept, exam trap, answer phrase, frequent question and practice prompt.
- Use `Overview` mode for one-page summary, key terms, frequent questions and quiz.
- Use `Exit Check` mode for the final short quiz/check.
- Use the answer toggle only as a backup; the preferred classroom pattern is to reveal answers one card at a time.

## Classroom Teaching Mode

Every chapter now has a Classroom Teaching Mode.

Chapter 3 Hardware has hand-written teaching content:

- 7 Teach Cards: RAM, ROM, CPU, HDD, SSD, Input Devices and Output Devices
- 5 Common Mistakes: Feature vs Advantage, RAM vs ROM, HDD vs SSD, Input vs Output, Primary vs Secondary Storage
- 4 Exam Answer Training tasks with weak answers, problems, better answers, mark points and student tasks
- hidden answers by default
- card-by-card navigation for projector use

Other chapters use generated classroom cards based on their existing concepts, diagrams, frequent questions and exam traps. These are good enough for classroom testing, then can be rewritten by hand after real lessons show which topics need better phrasing.

## PowerPoint And Teaching Resources

The site indexes local teaching files from:

```text
/Users/shaokaiwen/Library/Mobile Documents/com~apple~CloudDocs/TEACHER/INC/Powerpoint
```

Regenerate the PowerPoint-folder index after adding, moving or renaming lesson files:

```bash
cd igcse-cs-website
node tools/generate-powerpoint-data.js
node tools/generate-lesson-slides-data.js
```

The generated files are:

```text
igcse-cs-website/js/powerpoint-resources.js
igcse-cs-website/js/lesson-slides.js
igcse-cs-website/assets/lesson-thumbnails/
igcse-cs-website/assets/lesson-backgrounds/cs-light-classroom.png
```

The resource index reads chapter and topic numbers from folder names such as `Chapter 1 - Data representation` and `T1 Binary systems`. PowerPoint files open in PowerPoint or Keynote from the browser link. PDF files can be previewed inside the section when the browser allows local-file preview.

The lesson-slide index extracts the visible text from each PPTX slide. It does not create new lesson content; it turns the existing PowerPoint slide titles and bullet text into a web-based lesson player.

The same generator also creates one local thumbnail for each PPTX deck. Lesson Mode uses those thumbnails as deck selector images, while the web lesson player uses a light generated computer-science classroom background and topic-specific visual cards so it does not look like a plain PowerPoint screenshot.

## Classified Papers

The site indexes local classified-paper files from:

```text
/Users/shaokaiwen/Library/Mobile Documents/com~apple~CloudDocs/TEACHER/INC/ClassifiedPaper
```

Regenerate the classified-paper index after adding or renaming files:

```bash
cd igcse-cs-website
node tools/generate-classified-data.js
```

These links point to local files on this computer. If the browser blocks direct opening, use the Copy Path button.

## Lesson Mode

Each chapter page includes a `Start Lesson Mode` button. Lesson Mode is designed for classroom projection and is based on the local PowerPoint files for that chapter.

It includes:

- a deck selector for each PowerPoint topic file
- slide title and bullet text extracted from the PPTX
- a light generated classroom background instead of a black presentation screen
- an automatic topic visual for the current deck, such as data representation, network packets, CPU hardware, software, robotics, algorithms, programming, databases or logic gates
- previous and next controls for classroom pacing
- an `Open PPT` button for opening the original PowerPoint file

Use the arrow buttons or keyboard arrow keys to move through the slides. Press `Escape` or `Close` to return to the chapter page. On short screens, the topic visual is hidden automatically so the `Next` button stays visible and clickable.

## Visual Design

The site now uses one consistent Apple-inspired interface across all main pages:

- large light hero sections with computer-science imagery
- clean San Francisco-style system fonts
- soft grey page backgrounds, white panels and subtle shadows
- blue primary actions and simple pill controls
- responsive chapter pages that keep teaching controls reachable on smaller screens
- lighter Lesson Mode visuals instead of a black presentation screen

The shared animation layer is implemented with a local copy of Anime.js v4, based on the `juliangarnier/anime` project. It adds subtle teaching-focused motion:

- page titles and main actions reveal in sequence
- dashboard, classroom and chapter cards fade in as they enter the viewport
- section cards, tabs, mindmap nodes and buttons give quick click feedback
- Lesson Mode opens and changes slides with light transitions
- reduced-motion browser settings are respected automatically

## Editing Chapter Content

Most teaching content lives in:

```text
igcse-cs-website/js/content.js
igcse-cs-website/js/practice-packs.js
```

Each chapter object contains:

- `summary`
- `map`
- `concepts`
- `teachCards` for hand-written classroom-ready concept cards; if omitted, cards are generated from concepts and frequent questions
- `commonMistakes` for hand-written weak-answer correction; if omitted, cards are generated from chapter traps
- `examAnswerTraining` for hand-written mark-point answer practice; if omitted, cards are generated from frequent questions
- `diagram`
- `exam`
- `frequent`
- `quiz`

Each practice-pack object contains:

- `examStyle`
- `highlights`
- `frequentAnswers`
- `worksheet`
- `homework`

This makes it easy to improve one chapter without changing the page templates.

## GitHub Pages

This site can be deployed directly with GitHub Pages because it has no build process.

Suggested GitHub Pages setting:

- Source: deploy from branch
- Branch: `main`
- Folder: `/root`

The repository root includes a small `index.html` redirect that opens `igcse-cs-website/index.html`, so the site still works even though the main files are kept in the `igcse-cs-website/` folder.

If you prefer not to use a redirect, move the contents of `igcse-cs-website/` to the repository root or copy them into a `docs/` folder and set GitHub Pages to that location.

## Source Basis

The chapter order follows the Cambridge IGCSE and O Level Computer Science textbook structure used in class. The site content is paraphrased into classroom teaching cards, visual explanations, common mistake prompts, exit checks and secondary worksheet resources.
