# Corridor Row Infinite Loop Fix

When the corridor rows stop sliding or the infinite scroll breaks:

**Current implementation:** CSS keyframe animation in `app/lab/corridor/Row.tsx`

1. **Keyframes** – Inline `<style>` tag with `@keyframes` that animate `translateX`:
   - Row 1 (direction right): `0% translateX(0)` → `100% translateX(-effectiveTrackWidth)`
   - Row 2 (direction left): `0% translateX(-effectiveTrackWidth)` → `100% translateX(0)`

2. **Track width** – Measured via ResizeObserver + setTimeout(300, 1000, 2500ms) to catch late-loading images. Fallback: `estimatedOneSet = items.length * (cardWidth + gap)`.

3. **Seamless loop** – `duplicatedItems = [...items, ...items, ...items, ...items, ...items]` (5 copies). One-set width = `track.scrollWidth / 5`. When animation completes and restarts, content is identical.

4. **Duration** – `(effectiveTrackWidth / 80) * 1000` ms.

5. **Pause** – `animationPlayState: 'paused'` when `isPaused` (hovering an image).

If rows still don't move: ensure `effectiveTrackWidth > 0`, keyframe names are unique per row (`corridor-scroll-${direction}-${items.length}`), and no parent has `overflow: hidden` clipping the track.
