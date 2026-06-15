# Tatti (Forest Talk & Walk) — deploy & version control

A single-file map note-taking PWA. These files are the whole app — no build step.

```
index.html              the app
manifest.webmanifest    PWA metadata
sw.js                   service worker (offline + install)
icon-180.png            apple-touch-icon
icon-192.png            PWA icon
icon-512.png            PWA icon
icon-512-maskable.png   PWA maskable icon
DEPLOY.md               this file
```

Your repo already exists: **https://github.com/Kabeibl/fieldmark**

---

## Path A — push from your computer with Git (recommended for iterating)

Run these in a terminal, from the folder that holds these files:

```bash
git init
git add .
git commit -m "Fieldmark MVP"
git branch -M main
git remote add origin https://github.com/Kabeibl/fieldmark.git
git push -u origin main
```

If the repo isn't empty and the push is rejected, pull first:
`git pull --rebase origin main` then push again.

From then on, iterating is just:

```bash
git add .
git commit -m "what changed"
git push
```

## Path B — no terminal, upload in the browser

1. Go to https://github.com/Kabeibl/fieldmark
2. **Add file → Upload files**, drag in all 8 files, **Commit changes**.

---

## Turn on GitHub Pages (the live HTTPS URL)

1. Repo **Settings → Pages**
2. **Source: Deploy from a branch**
3. Branch: **main**, folder: **/ (root)** → **Save**
4. Wait ~1 minute, then refresh. Your app is live at:

   **https://kabeibl.github.io/fieldmark/**

That URL is HTTPS, which is required for the location features (see below).

---

## Test on your phone

Open **https://kabeibl.github.io/fieldmark/** on your phone.

- Allow **Location** when asked → the blue pulsing dot should appear and the map should center on you.
- Tap the map → drop a mark → add a note / photo / voice → **Save**.
- Tap a pin to read it back; open the list button (bottom-right) to see all marks.
- **Install it:** iOS Safari → Share → *Add to Home Screen*. Android Chrome → menu → *Install app*.

---

## Two constraints to know

1. **Location requires HTTPS.** It will NOT work from a `file://` open or inside a sandboxed preview — only on the GitHub Pages URL (or any HTTPS host). This is a browser security rule, not a bug.
2. **Storage is per-device.** Notes live in that device's browser storage. They don't sync across devices, and anyone who opens the link gets their own separate set of notes. Adding sync needs a backend (e.g. Supabase or Firebase) — see below.

---

## When you change the app (important)

The service worker caches the app for offline use. **Whenever you edit `index.html`** (or any asset), bump the cache version in `sw.js`:

```js
const CACHE = "tatti-v1";   // -> "tatti-v2", then v3, ...
```

Otherwise installed copies keep serving the old cached version. Commit, push, and reload — the new worker activates and clears the old cache.

---

## Likely next steps

- **Sync / shared notes** (the big one): add a backend so marks persist across devices and can be shared. Supabase is the quickest path (Postgres + storage + auth, generous free tier).
- **Edit a saved mark** (currently view/delete only).
- Minor polish: north-up reset on recenter, double-tap recenter to zoom tighter.
