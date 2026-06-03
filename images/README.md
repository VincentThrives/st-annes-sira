# Images

Photos shown in the site's **Gallery** carousel. Current photos: `gallery-1.jpg` … `gallery-7.jpg`.

## Add more photos
1. Put the image file in this folder (use simple names, no spaces — e.g. `gallery-8.jpg`).
2. Open `../script.js`, find the `GALLERY` array, and add a line:
   ```js
   { src: "images/gallery-8.jpg", caption: "Annual Day 2026" },
   ```
3. Reload the site — the new photo appears in the carousel.

## Tips
- Keep each photo reasonably small (ideally ~200–400 KB) so the gallery loads fast.
- If an image file is missing, that tile automatically falls back to `placeholder.svg`.
