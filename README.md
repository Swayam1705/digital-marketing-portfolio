# Digital Marketing Portfolio

> **The website itself is her first marketing campaign.**

A modern, editorial personal portfolio for a **Digital Marketing student** —
part creative-agency site, part editorial portfolio, part personal brand.
It pairs strong typography and a refined violet/coral palette with a
signature **scroll-linked canvas story** that visualizes how a campaign
comes together:

**IDEA → INSIGHT → STRATEGY → STORY → IMPACT**

The project ships with clearly marked placeholders only. It contains no
invented names, photos, biographies, clients, metrics or testimonials —
all personal content lives in one file and is waiting to be replaced.

---

## Tech stack

- **React 18** (function components + hooks)
- **Vite 5** (dev server and production build)
- **Plain CSS** with design tokens (no CSS framework dependency)
- **lucide-react** for lightweight icons
- Browser-native APIs: Canvas 2D, IntersectionObserver, scroll events,
  `requestAnimationFrame`
- No backend, no UI component library, no heavy animation library

## Requirements

- **Node.js 18+**
- **npm 9+**

No other software is required.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Then open the printed local URL (usually <http://localhost:5173>).

## Production build

```bash
npm run build
```

The optimized site is output to `dist/`.

## Local production preview

```bash
npm run preview
```

Serves the production build locally so you can verify the final output.

---

## Folder structure

```text
portfolio/
├── public/
│   ├── images/                    # Original SVG placeholders (replace these)
│   │   ├── profile-placeholder.svg
│   │   ├── project-placeholder-1.svg
│   │   ├── project-placeholder-2.svg
│   │   ├── project-placeholder-3.svg
│   │   ├── blog-placeholder-1.svg
│   │   ├── blog-placeholder-2.svg
│   │   └── blog-placeholder-3.svg
│   ├── resume/                    # Put your-resume.pdf here
│   └── favicon.svg
├── src/
│   ├── components/                # One component per section
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ScrollStory.jsx        # Signature scroll-linked canvas section
│   │   ├── About.jsx
│   │   ├── Beliefs.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx           # Cards + accessible case-study modal
│   │   ├── Funnel.jsx             # Marketing funnel / performance thinking
│   │   ├── Experience.jsx
│   │   ├── Services.jsx
│   │   ├── Blog.jsx
│   │   ├── ResumeCTA.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── Reveal.jsx             # Scroll-in animation wrapper
│   │   └── SocialIcon.jsx
│   ├── data/
│   │   └── portfolioData.js       # 👉 EDIT THIS FILE FIRST (all content)
│   ├── hooks/
│   │   ├── usePrefersReducedMotion.js
│   │   └── useScrolled.js
│   ├── styles/
│   │   ├── globals.css            # Design tokens + all section styles
│   │   └── animations.css         # Keyframes, reveals, reduced-motion rules
│   ├── utils/
│   │   └── scroll.js
│   ├── assets/
│   │   └── README-ASSET-GUIDE.md
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── CUSTOMIZATION.md               # Step-by-step personalization guide
└── README.md
```

## Where do I put my own content?

**Everything editable lives in `src/data/portfolioData.js`** — name, bio,
contact details, socials, skills, projects, education, experience,
services, blog posts and the performance funnel. Follow the in-file
comments, and see **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** for a full
walk-through (photos, resume, fonts, colors, icons, form setup).

## Contact form

The contact form is intentionally **frontend-only**. It validates the
name, email and message fields and shows a friendly status message, but
it does not send email. Connect Formspree, Web3Forms, EmailJS, Netlify
Forms, or your own endpoint in `src/components/Contact.jsx` (the exact
spot is commented) — instructions for each option are in
[CUSTOMIZATION.md](./CUSTOMIZATION.md).

## Accessibility & responsiveness

- Semantic landmarks and heading hierarchy
- Full keyboard access, visible focus states, focus trapping in modals/menus
- Accessible mobile hamburger menu (Escape closes, `aria-expanded`,
  closes on selection)
- Labelled form fields with inline validation messages
- Descriptive `alt` text on every placeholder image
- `prefers-reduced-motion` support throughout, including a **static
  fallback** for the canvas scroll story
- Responsive from large desktop down to small phones

## Deployment

The site builds to static files in `dist/`, so it deploys anywhere.

### Vercel

1. Import the repository at <https://vercel.com/new>.
2. Framework preset: **Vite** (build command `npm run build`, output
   directory `dist` — detected automatically).

### Netlify

1. Drag-and-drop the `dist/` folder after `npm run build`, or connect the
   repository.
2. Build command `npm run build`, publish directory `dist`.
3. Netlify Forms can power the contact form (see CUSTOMIZATION.md).

### GitHub Pages

1. Set `base` in `vite.config.js` to your repository name
   (e.g. `base: "/repo-name/"`).
2. `npm run build`, then publish the `dist/` folder (the
   [`gh-pages`](https://www.npmjs.com/package/gh-pages) package automates
   this).

---

Built as a portfolio that demonstrates the craft it advertises —
attention to hierarchy, storytelling, motion, accessibility and detail.
