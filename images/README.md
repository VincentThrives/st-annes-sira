# Images

The gallery (Gallery section on the site) currently shows **20 tiles**, all pointing at `sample.png`.

## Add your photo
1. Save your photo in this folder as **`sample.png`** (or update the path in `../script.js`).
2. Reload the site — all 20 gallery tiles will show it.

## Use different photos per tile (later)
Open `../script.js`, find the `GALLERY` array, and set each item's `src`
to its own file, e.g.:

```js
const GALLERY = [
  { src: "images/photo-1.jpg", caption: "Annual Day 2026" },
  { src: "images/photo-2.jpg", caption: "Science Exhibition" },
  // ...
];
```

If an image file is missing, the tile automatically falls back to `placeholder.svg`.
