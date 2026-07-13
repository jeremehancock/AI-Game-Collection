---
name: verify
description: How to run and verify this static PWA game collection locally
---

# Verifying AI Game Collection

Static site — no build step. Serve the repo root and drive it in a browser.

## Launch

```bash
http-server -p 8091 -s /path/to/repo &   # or: python3 -m http.server
```

## Drive

Playwright is installed globally; require it with
`NODE_PATH=/opt/node22/lib/node_modules node script.js`. Launch chromium with
no `executablePath` (PLAYWRIGHT_BROWSERS_PATH resolves it).

- **Mobile flow**: use a `devices['Pixel 7']` context. On load, an
  "Open in App?" prompt appears for Android UAs — dismiss via `#stayInBrowser`.
  Tap `.mobile-play-button` (featured game) or a mobile card; the game loads
  into `#gameFrame` inside `#gameContainer` (display: block when open).
  The Android back gesture is equivalent to `page.goBack()`.
- **Desktop flow**: viewport ≥ 769px wide and non-mobile UA. Click a
  `.game-card`; the game loads into `#gameModalFrame` inside `#gameModal`
  (display: flex when open). Escape / backdrop click / × closes it.

## Gotchas

- `isMobile()` in index.html checks the UA *or* `innerWidth <= 768`.
- The service worker (`service-worker.js`) caches index.html cache-first;
  bump `CACHE_NAME` when shipping index.html changes or installed PWAs
  keep the old page. A green "games ready for offline play" banner may
  overlay the top of the page on first visit.
- Game view pushes a history state `{gameView: true}`; closing pops it via
  `popstate`. Check `history.state` to assert open/closed sync.
