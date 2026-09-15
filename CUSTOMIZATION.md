# Customization guide

Everything you can edit lives in **one file**:

```
src/data/portfolioData.js
```

Open it first. Replace every `[SQUARE BRACKETED]` placeholder with your own
information. You normally never need to touch the component files.

> Tip: run `npm run dev` while editing so you can see your changes live.

---

## 1. Profile photo

1. Put your image in `public/images/`, for example `my-profile.jpg`.
2. Open `src/data/portfolioData.js`.
3. Update `profileImage` (and `profileAlt` with descriptive alt text):

```js
profileImage: "/images/my-profile.jpg",
profileAlt: "Portrait of [YOUR NAME], digital marketing student",
```

Use a square image of at least 800 × 800 px.

---

## 2. Name, tagline, biography and hero text

In `portfolioData.js` → `personal`:

```js
name: "[YOUR NAME]",                 // also used in the navbar & footer
role: "Digital Marketing Student",
tagline: "Turning attention into connection.",
intro: "[1–2 SENTENCE INTRODUCTION FOR THE HERO]",
bio: "[100–150 WORD BIOGRAPHY FOR THE ABOUT SECTION]",
```

`focusAreas` is the list of small chips next to your bio — add, remove or
reword them freely.

The browser tab title is set in `index.html` (the `<title>` tag).

---

## 3. Contact information

Still inside `personal`:

```js
email: "[YOUR EMAIL]",
phone: "[YOUR PHONE]",
location: "[YOUR CITY, COUNTRY]",
```

- `email` is used for `mailto:` links in the contact section and footer.
- `phone` is used for a `tel:` link (non-numeric characters are stripped
  automatically).
- `location` is display-only.

---

## 4. Skills ("Marketing Toolkit")

Skills are grouped under `skillGroups` into **CONTENT, GROWTH, BRAND,
DATA**. Add or remove a skill by editing the `items` list of any group:

```js
{
  category: "CONTENT",
  tagline: "Messages people want to spend time with.",
  icon: "pen",                 // pen | trending | palette | chart
  items: [
    {
      name: "Social Media Marketing",
      description: "Write what you actually know and have done here.",
    },
  ],
}
```

- Remove a skill: delete its object.
- Add a group: copy an entire group object and change its `category`.
- No fake percentage scores are shown on purpose — categories and
  descriptions are a more honest representation.

---

## 5. Projects

Projects appear as cards; clicking one opens a full case-study modal.
Copy an entire object inside the `projects` array to add one:

```js
{
  title: "[PROJECT TITLE]",
  category: "Social Media Campaign",
  image: "/images/project-placeholder-1.svg", // replace with your image
  alt: "Descriptive alt text for the project image",
  objective: "What was the brief or problem?",
  approach: "What strategy did you use, and why?",
  tools: ["Canva", "Meta Business Suite", "Google Analytics"],
  outcome: "Real measured result OR an honest learning — no invented metrics.",
  link: "https://...",          // use "#" if there is no live link
  linkLabel: "View project",
}
```

Images should be roughly **4:3** (1200 × 900 px). Put them in
`public/images/`. If `link` is `"#"`, the external link button is
hidden automatically.

---

## 6. Education

Education cards live in the `education` array, shown in the
**"Learning in motion"** timeline:

```js
{
  institution: "[INSTITUTION / UNIVERSITY]",
  program: "[PROGRAM / DEGREE NAME]",
  period: "[START – END OR 'PRESENT']",
  description: "[OPTIONAL: coursework or focus]",
}
```

Delete an object to remove an entry; copy one to add more.

---

## 7. Experience (internships, freelance, clubs)

Internships, part-time jobs, student-club work and freelance projects
live in the `experience` array, on the same timeline as education:

```js
{
  organization: "[ORGANIZATION, CLUB OR FREELANCE CONTEXT]",
  role: "[ROLE — e.g. MARKETING INTERN]",
  period: "[START – END OR 'PRESENT']",
  description: "[WHAT YOU DID AND LEARNED]",
}
```

---

## 8. Social links

Edit the `socials` array. Recognized platforms automatically receive an
icon: **LinkedIn, Instagram, Twitter/X, GitHub, YouTube, Dribbble**.
Anything else (Behance, TikTok, etc.) gets a generic globe icon.

```js
{ platform: "LinkedIn", label: "[YOUR LINKEDIN HANDLE]", url: "https://www.linkedin.com/in/your-handle" },
```

Set `url: "#"` for accounts you haven't created yet; delete an object to
hide a platform entirely.

---

## 9. Blog posts

The first post with `featured: true` becomes the large featured card;
the rest appear as a two-card grid.

```js
{
  featured: true,
  title: "[ARTICLE TITLE]",
  category: "Strategy",
  readTime: "6 min read",
  excerpt: "[SHORT EXCERPT]",
  image: "/images/blog-placeholder-1.svg",
  alt: "Descriptive alt text",
  link: "#",
}
```

---

## 10. Adding / removing whole sections

Each section is a component in `src/components/`, mounted in order in
`src/App.jsx`:

| Section | File |
| --- | --- |
| Hero | `src/components/Hero.jsx` |
| Scroll story | `src/components/ScrollStory.jsx` |
| About + journey | `src/components/About.jsx` |
| "What I believe" | `src/components/Beliefs.jsx` |
| Skills toolkit | `src/components/Skills.jsx` |
| Projects + case modal | `src/components/Projects.jsx` |
| Performance funnel | `src/components/Funnel.jsx` |
| Education & experience | `src/components/Experience.jsx` |
| Services | `src/components/Services.jsx` |
| Blog | `src/components/Blog.jsx` |
| Resume CTA | `src/components/ResumeCTA.jsx` |
| Contact | `src/components/Contact.jsx` |
| Footer | `src/components/Footer.jsx` |
| Navigation | `src/components/Navbar.jsx` |

To **remove** a section: delete its import and its JSX tag from
`src/App.jsx`, and (optionally) remove its link from the links array in
`Navbar.jsx` and `Footer.jsx`.

---

## 11. Colors

Design tokens are CSS variables at the very top of:

```
src/styles/globals.css
```

```css
:root {
  --color-bg: #f7f4f0;        /* Warm white page background */
  --color-ink: #171326;       /* Near-black text */
  --color-violet: #633ef2;    /* Electric violet */
  --color-violet-bright: #7d5cff;
  --color-violet-deep: #4721c9;
  --color-coral: #ff6f5e;     /* Peach / coral accent */
  --color-coral-soft: #ffd9c8;
  --color-night: #141026;     /* Dark sections */
  /* …lavender, line, muted text tokens are there too */
}
```

Change a value once and every component using that token updates.

---

## 12. Fonts

- Fonts are loaded in `index.html` from Google Fonts
  (**Space Grotesk** for display headings, **Inter** for body text).
- The font stacks are defined in `src/styles/globals.css` as
  `--font-display` and `--font-body`, with system-font fallbacks.
- To switch fonts: change the Google Fonts `<link>` in `index.html`,
  then update the two variables.

---

## 13. Icons

Icons come from **lucide-react**. To replace an icon:

1. Find the icon name at <https://lucide.dev/icons>.
2. In the relevant component, change the name in the `import { ... } from
   "lucide-react"` line.
3. Use it in the icon map (skills, services) or directly in JSX.

The service icon map lives at the top of `src/components/Services.jsx`;
the skill group icon map lives in `src/components/Skills.jsx`; social
icons are mapped in `src/components/SocialIcon.jsx`.

---

## 14. Resume

1. Name your PDF `your-resume.pdf`.
2. Place it at:

```
public/resume/your-resume.pdf
```

3. If you use a different filename, update the path in
   `portfolioData.js`:

```js
resume: "/resume/jane-doe-cv.pdf",
```

If the PDF is missing, the "Download CV" button shows a friendly note
instead of a broken file — no fake resume is included.

---

## 15. Connecting the contact form

The form in `src/components/Contact.jsx` validates input on the frontend
but **does not send email**. The submit handler in that file is clearly
marked with a comment block (`WIRE A FORM SERVICE HERE`). Choose one:

### Formspree (no account code required beyond an ID)

```js
const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { Accept: "application/json" },
  body: new FormData(e.target),
});
if (res.ok) { /* show success */ }
```

### Web3Forms

POST the form fields to `https://api.web3forms.com/submit` with your
public access key (`access_key`).

### EmailJS

Install the `@emailjs/browser` package and call `emailjs.sendForm(...)`
inside the submit handler.

### Netlify Forms

If deploying to Netlify, add `name="contact"` and hidden
`form-name` input to the form; Netlify detects the build automatically
(keep `method="POST"` and action handling as their docs describe).

### Your own backend

`POST` the JSON values to an endpoint you control
(AWS Lambda, a small Express server, etc.).

Until one of these is wired up, the form remains fully usable for
validation/demo purposes and never pretends to have sent an email.

---

## 16. Optional: replacing the scroll-story frames

The signature canvas story draws itself procedurally (tiny file size).
To use your own rendered frame sequence (e.g. from Remotion or After
Effects), see `src/assets/README-ASSET-GUIDE.md` and the clearly marked
block at the top of `src/components/ScrollStory.jsx`.
