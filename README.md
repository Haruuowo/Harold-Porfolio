# John Harold Doton · Portfolio

A personal portfolio website showcasing projects, skills, and experience. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no bloat.

---

## Live Demo

> Add your deployed URL here (e.g., GitHub Pages, Vercel, Netlify)

---

## Features

- **Three Themes** — Night (dark), Day (light), and Sunset (warm brown) modes with smooth animated transitions
- **Animated Hero** — Typing effect cycling through roles
- **Scroll Reveal** — Sections fade in as you scroll
- **Sticky Header** — Auto-hides shadow on scroll, highlights active nav section
- **Back to Top** — Smooth scroll button appears after scrolling down
- **Contact Form** — Validates and opens your default mail client
- **Theme Switch Animation** — Flash + crossfade effect when switching themes
- **Responsive** — Mobile-friendly layout with breakpoints at 860px and 500px

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Fonts** | Syne (headings), DM Sans (body) — via Google Fonts |
| **Icons** | Devicon (skills), inline SVG (UI icons) |
| **Deployment** | Static hosting (GitHub Pages / Vercel / Netlify) |

### Skills Shown

**Development:** HTML, CSS, JavaScript, React, Tailwind CSS, Node.js, Express, Python, PostgreSQL, Firebase, C#

**Tools & Design:** Git, GitHub, Figma, Unity, Android Studio, VS Code, UI/UX, Game Design

---

## Project Structure

```
PORTFOLIO/
├── index.html              # Main page
├── css/
│   └── styles.css          # All styles + 3 theme definitions
├── js/
│   └── script.js           # Interactivity, theme switching, animations
├── assets/
│   ├── backgroundimage.png # Light mode hero background
│   ├── HAROLDPHOTO1.jpg    # About section photo
│   ├── my-notion-face-transparent.png  # Logo
│   ├── PHOTO.jpg           # Additional photo asset
│   └── resume.pdf          # Downloadable resume
├── .github/
│   └── workflows/
│       ├── static.yml      # GitHub Pages deployment
│       └── static2.yml     # Additional workflow
└── fonts/                  # Custom fonts (if any)
```

---

## Themes

| Theme | Description | Background |
|-------|-------------|------------|
| **Night** | Dark glossy with warm gold accents | `#0a0a0f` |
| **Day** | Soft warm parchment (not stark white) | `#D8D4CA` |
| **Sunset** | Rich walnut brown with brass gold | `#1E1A16` |

Themes persist via `localStorage` and animate smoothly on switch.

---

## Sections

1. **Hero** — Name, typing animation, tagline, CTA buttons
2. **About** — Bio, photo, interest tags
3. **Skills** — Dev icons in two columns (Development / Tools & Design)
4. **Work** — Project list with tags, descriptions, and external links
5. **Resume** — Download card for PDF resume
6. **Experience** — Timeline cards (Education, Work, Achievements)
7. **Contact** — Info + social links on the left, working contact form on the right

---

## Getting Started

### Local Development

1. Clone the repo
   ```bash
   git clone https://github.com/Haruuowo/Portfolio.git
   cd Portfolio
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   # VS Code Live Server extension (recommended)
   # Or Python
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000`

### Customization

- **Colors:** Edit CSS custom properties in `styles.css` under `:root`, `body.theme-white`, or `body.theme-sunset`
- **Hero image:** Replace `assets/backgroundimage.png` and update the path in `styles.css`
- **Content:** Edit text directly in `index.html`
- **Skills:** Add/remove `<div class="skill">` blocks in the Skills section
- **Projects:** Replace the `.work-item` placeholders with your actual projects
- **Typing words:** Edit the `words` array in `js/script.js`

---

## Deployment

### GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/static.yml`) that auto-deploys on push to `main`.

1. Go to **Settings → Pages**
2. Set **Source** to "GitHub Actions"
3. Push to `main` — your site will be live at `https://haruuowo.github.io/Portfolio`

### Manual

Upload the entire `PORTFOLIO/` folder to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

---

## Contact

- **Email:** [harolddoton@gmail.com](mailto:harolddoton@gmail.com)
- **Location:** Pampanga, Philippines
- **GitHub:** [@Haruuowo](https://github.com/Haruuowo)
- **LinkedIn:** [Harold Doton](https://www.linkedin.com/in/harold-doton-606b18317/)
- **Discord:** kairuuowo

---

## License

This project is open for personal use and learning. Feel free to fork and customize for your own portfolio.

---

*Designed and built with care by John Harold Doton · 2026*
