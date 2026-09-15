# Asset guide

This project ships with **original SVG placeholder artwork only** — no
copyrighted photos or downloads. You should replace these with your own
images before publishing.

## Where assets live

| Asset | Location | Referenced in |
| --- | --- | --- |
| Profile photo | `public/images/profile-placeholder.svg` | `personal.profileImage` |
| Project images (×3) | `public/images/project-placeholder-1.svg` … `3.svg` | `projects[].image` |
| Blog images (×3) | `public/images/blog-placeholder-1.svg` … `3.svg` | `blogPosts[].image` |
| Favicon | `public/favicon.svg` | `index.html` |
| Resume PDF | `public/resume/your-resume.pdf` | `personal.resume` |

## Recommended image settings

- Profile photo: square, at least **800 × 800 px**, JPG or WEBP.
- Project images: **4:3**, at least **1200 × 900 px**.
- Blog images: **16:9**, at least **1200 × 675 px** (the featured card
  crops slightly differently — keeping the subject centered is enough).
- Keep individual images under ~250 KB (compress with
  [squoosh.app](https://squoosh.app) or TinyPNG).

## Replacing an image

1. Put your file in `public/images/` (e.g. `my-profile.jpg`).
2. Open `src/data/portfolioData.js`.
3. Update the path, e.g.
   `profileImage: "/images/my-profile.jpg"`.
4. Update the matching `alt` text so it describes the real image.

## Optional: real frames for the scroll story

The signature scroll story (`src/components/ScrollStory.jsx`) runs on
lightweight, procedurally drawn frames by default. To use a rendered
image sequence instead:

1. Export numbered frames as `frame-0001.jpg`, `frame-0002.jpg`, …
2. Place them in `public/frames/`.
3. At the top of `ScrollStory.jsx`, set `USE_IMAGE_FRAMES = true` and
   adjust `FRAME_COUNT_DESKTOP` / `FRAME_COUNT_MOBILE` and the
   `FRAME_PATH` pattern if needed.
