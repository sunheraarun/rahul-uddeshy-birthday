# Couple Birthday Page 🎂

A single-page birthday site for a couple, built with plain HTML, CSS and JavaScript. It has no build step, so it runs on GitHub Pages as is.

## Customize
1. Open `script.js` and edit the `CONFIG` block at the top: names, the date you got together, story, captions, wishes and the letter.
2. Put your photos in `images/`. See `images/PUT-YOUR-PHOTOS-HERE.txt` for the file names.
3. Optional: add a song at `music/song.mp3`. A music button appears in the menu when the file exists.

## Effects
- Animated gradient background, floating hearts and balloons, and a sparkle cursor trail
- Typewriter tagline and a spinning photo ring
- Live "together since" counter that ticks every second
- A cake whose candles you click to blow out, ending in a confetti and fireworks finale
- Timeline and polaroid gallery that reveal on scroll, with a lightbox (arrow keys and Esc work)
- An envelope that opens to show a love letter
- Double-click anywhere for a heart burst

## Publish on GitHub Pages
1. Create a public repo and upload `index.html`, `style.css`, `script.js`, `images/` (and `music/` if you use it).
2. Go to **Settings → Pages**, set Source to *Deploy from a branch*, choose `main` and `/ (root)`, then save.
3. Your site will be at `https://<username>.github.io/<repo-name>/`.

Note: file names on GitHub Pages are case-sensitive, so `Photo1.JPG` is not the same as `photo1.jpg`.
