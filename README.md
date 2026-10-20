# Resume Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![No Backend](https://img.shields.io/badge/backend-none-brightgreen)
![HTML CSS JS](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20JS-blue)

> A lightweight, browser-based resume builder with a live preview and one-click PDF export. No servers, no sign-ups, no data collection — just open and build.

---

## What is this?

**Resume Studio** is a client-side resume builder that runs entirely in the browser. You fill in a structured form (personal details, work experience, education, skills, and more), and a formatted A4 resume renders in real time on the right side. When you're happy with it, you export it directly to PDF using the browser's native print dialog.

Everything stays local — your data never leaves your machine.

---

## Features

- 📝 **Live preview** — changes reflect instantly as you type
- ➕ **Dynamic sections** — add/remove multiple entries for experience, education, projects, and skills
- 📄 **A4 PDF export** — pixel-perfect A4 layout via `print.css` and the browser print dialog
- 🎨 **Clean typography** — uses [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts with system fallbacks
- 🔒 **Zero data transmission** — fully offline-capable, nothing is sent or stored
- 🚫 **No dependencies** — no npm, no build step, no framework

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic markup) |
| Styling | Vanilla CSS (custom properties, flexbox, grid) |
| Print / PDF | CSS `@media print` via `print.css` |
| Logic | Vanilla JavaScript (DOM manipulation, event-driven) |
| Fonts | Google Fonts — [Inter](https://fonts.google.com/specimen/Inter) |

No frameworks. No build tools. No backend.

---

## Project Files

```
Resume-Studio/
├── index.html   — form layout and live preview panel
├── style.css    — editor UI and resume design styles
├── print.css    — A4 print / PDF-specific overrides
├── script.js    — dynamic sections and real-time preview rendering
└── LICENSE      — MIT License
```

---

## Getting Started

1. Clone or download the repo
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox)
3. Fill in your details in the left panel
4. Use the **`+ Add`** buttons to add multiple experience / education / skill entries
5. Click **Export to PDF**
6. In the print dialog: choose **Save as PDF**, set paper size to **A4**, and disable browser headers/footers

No installation or server required.

---

## Notes

- Resume data is **not saved** between sessions — copy your content if you plan to revisit it
- Keep your resume concise; very long content may overflow onto a second page
- Works offline once the page is loaded (Google Fonts requires internet on first load; system fonts are the fallback)

---

## License

Copyright (c) 2026 [remilsalim](https://github.com/remilsalim)

Released under the [MIT License](./LICENSE).
