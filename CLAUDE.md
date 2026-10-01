# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Liang-Jie Chiu, served by GitHub Pages at https://jack1021ohoh.github.io/ directly from the `main` branch. It is a single static page with no build step, package manager, linter or tests: just `index.html`, `css/styles.css` and `js/script.js`. Pushing to `main` deploys.

## Running locally

Open `index.html` in a browser (`open index.html` on macOS). Alternatively run `python3 -m http.server` and visit http://localhost:8000.

External dependencies load from CDNs in `<head>`: Google Fonts (Cormorant Garamond, IBM Plex Sans, IBM Plex Mono) and Font Awesome 6.4.0. There is no bundler, so new libraries must also be added as CDN links.

## Architecture

- **Single page, numbered sections.** `index.html` holds every `<section>` (`home`, `about`, `projects`, `skills`, `contact`). Each section has a `.section-label` such as `02 — PROJECTS`. The nav links point to section ids, and `script.js` highlights the active link by comparing scroll position to each section's `offsetTop`. If you add or rename a section, update the nav link and the label numbering too.
- **Design tokens.** All colors, fonts and easing are CSS custom properties on `:root` at the top of `styles.css` (dark "data-lab" theme with the teal accent `--accent: #00d4b8`). Use these variables instead of hard-coded values. The exception is `script.js`, which hard-codes the accent as RGB (`0, 212, 184`) for the canvas and as hex in the console greeting, so if the accent changes, update those as well.
- **Project category system.** Each `.project-card` has a `data-category` attribute (`nlp`, `vision`, `research`, `sports`, `industry`). In CSS this sets `--card-accent`, and the legend dots use matching `.legend-item[data-cat=...]` rules (both near lines 510–560 of `styles.css`). Adding a new category takes three changes: a legend item in the HTML, a legend-dot rule and a card-accent rule.
- **Project cards** follow a fixed structure: `.project-header` (badge + domain), `h3`, `.project-description`, `.project-highlights` list, `.project-tags`, `.project-links`. In JS the whole card is clickable and forwards the click to its first `.project-link`, so each card should have exactly one primary link. The order of cards in the HTML is the display order, sorted by impact.
- **Scroll reveal.** Elements with the `.reveal` class start hidden. An IntersectionObserver adds `.visible` when they scroll into view. A stagger is set with an inline `style="--delay: 0.08s"`, which typically cycles 0 / 0.08s / 0.16s across each row of cards.
- **Contact form is simulated.** The submit handler fakes a 1.2s delay and only calls `console.log` with the data. Nothing is sent anywhere. Wiring it to a real backend (e.g. Formspree) means replacing the `setTimeout` promise in `script.js`.
- Responsive breakpoints are at 900px, 768px and 480px, at the end of `styles.css`.

## Notes

- Most content edits (swapping or reordering projects) only touch `index.html`.
- `README.md` contains its own list of featured projects that has fallen behind the site: it still lists Aging Analysis and Telematics, which have been replaced. When projects change, update it to match.
