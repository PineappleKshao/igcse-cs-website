# IGCSE Computer Science Revision Studio

A static website for Cambridge IGCSE Computer Science students. The site is organised around the textbook chapter structure and gives students a visual overview of each topic before they practise exam-style recall.

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
- Big-picture mindmap on every chapter page.
- Core concept cards written in student-friendly language.
- Visual process model for each chapter.
- Exam-focus highlights for common IGCSE question patterns.
- Frequent-question section with expandable answers.
- Three-question quick quiz for every chapter.
- Browser localStorage progress tracking.
- No build step required: plain HTML, CSS and JavaScript.

## Project Structure

```text
igcse-cs-website/
  index.html              # Landing page
  dashboard.html          # Chapter dashboard and progress overview
  chapters/
    chapter1.html         # Chapter wrappers
    ...
    chapter10.html
  css/
    style.css             # Site styling
  js/
    content.js            # All chapter content and quiz data
    chapter.js            # Reusable chapter page renderer
    progress.js           # Dashboard and progress renderer
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

## Progress Tracking

Progress is saved in the current browser using `localStorage`, so the site does not require accounts, passwords, or a backend database.

## Editing Chapter Content

Most teaching content lives in:

```text
igcse-cs-website/js/content.js
```

Each chapter object contains:

- `summary`
- `map`
- `concepts`
- `diagram`
- `exam`
- `frequent`
- `quiz`

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

The chapter order follows the Cambridge IGCSE and O Level Computer Science textbook structure used in class. The site content is paraphrased into revision notes, visual explanations and exam-practice prompts for students.
