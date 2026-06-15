# Fieldmark

A lightweight, offline-first field notes PWA. Tap anywhere on a map to drop a mark — attach a text note, photos, and a voice recording. Runs entirely in the browser with no backend.

**Live app:** https://kabeibl.github.io/fieldmark/

---

## Features

- **Drop marks** — tap the map to pin a location
- **Notes** — write text, attach photos, or record up to 2 minutes of audio per mark
- **Edit & delete** — tap any pin to view, edit, or remove it
- **List view** — see all marks sorted by date
- **Offline-ready** — installs as a PWA; works without a connection after first load
- **Privacy-first** — all data stays on-device in browser storage (no sync, no server)

## File structure

```
index.html              the entire app (HTML + CSS + JS)
sw.js                   service worker — offline caching
manifest.webmanifest    PWA metadata (name, icons, display mode)
icon-180.png            apple-touch-icon
icon-192.png            PWA icon (any)
icon-512.png            PWA icon (any)
icon-512-maskable.png   PWA icon (maskable, for adaptive icon shapes)
DEPLOY.md               deployment and versioning guide
```

## Getting started

No build step. Open `index.html` directly or serve from any static host.

```bash
# quick local preview (needs HTTPS for geolocation — use a dev server)
npx serve .
# or
python3 -m http.server 8080
```

**Location and camera require HTTPS.** For full functionality use the live GitHub Pages URL, or a local HTTPS dev server.

## Deployment

Hosted on GitHub Pages (branch: `main`, folder: `/`).

After any change:

```bash
git add .
git commit -m "describe what changed"
git push
```

When you edit `index.html` or any cached asset, bump the cache version in `sw.js` so installed copies update:

```js
const CACHE = "fieldmark-v3";  // increment each release
```

See [DEPLOY.md](DEPLOY.md) for the full guide.

## Storage limits

Marks are stored in `localStorage` (~5 MB budget). Photos are compressed to ≤1000px JPEG at 62% quality. Audio is stored as base64 WebM. A warning appears when you approach the limit.

## License

MIT
