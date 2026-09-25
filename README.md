# portfolio

Personal portfolio site. Static HTML/CSS, no build step.

## Structure

```
index.html        Main page
css/style.css      All styling
assets/            Photo, résumé, and any other static files
```

## Before you deploy

1. **Photo** — drop your image in as `assets/photo.jpg` (square-ish works
   best for the sticker crop). It's already wired in; the monogram only
   shows if the file is missing.
2. **Résumé** — add your file as `assets/resume.pdf` (the links already point
   there — nothing else to change).
3. **Gmail** — in the footer, replace `YOUR_EMAIL@gmail.com` in the `mailto:`
   link with your real address.
4. **Project previews** — drop screenshots into `assets/projects/` named
   `wapi.png`, `satgate.png`, `aidstream.png`, `edu-flix.png`, `blue-talk.png`,
   `tinah-cosmetics.png`, `profile-engine.png`. Any missing file falls back to
   a "preview coming soon" placeholder automatically.
5. **Live links** — each project has a commented-out "View live" link right
   next to its GitHub link. Uncomment and fill in the URL for any project
   that's actually deployed (EDU-FLIX is on Render, for example).
6. Swap in real project links/case studies as you get individual repo URLs
   for Wapi, AidStream, EDU-FLIX, Blue-talk, Tinah Cosmetics and Profile-Engine
   — right now every "View on GitHub" link points to your profile.

## Page-flip navigation

Two buttons pinned bottom-right (‹ ›) step forward/back through sections
with a CSS page-turn animation (`js/script.js`, `.page-flip-leaf` in
`css/style.css`). Normal scrolling still works as usual; this is just an
extra way to move through the page. It's skipped automatically for anyone
with reduced-motion enabled.

## Running locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
```

## Deploying

Any static host works since there's no backend here:

- **GitHub Pages** — push this repo, then enable Pages on the `main` branch
  in repo settings (root directory).
- **Render** — create a new Static Site, point it at this repo, leave the
  build command empty and set the publish directory to `.`
- **Vercel / Netlify** — import the repo, no build command needed.

If a project (like AidStream) later needs its own backend hosted, Render's
free web-service tier works well for a Go API alongside this static site.
