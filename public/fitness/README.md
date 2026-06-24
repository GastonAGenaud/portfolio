# Fitness progress photos

Drop progress photos here to replace the marble-statue placeholders on the
`/fitness` ("Greek God Transformation") page.

## How it works

Each milestone in [`src/lib/content/fitness.ts`](../../src/lib/content/fitness.ts)
has an `id` (an ISO date) and an optional `image` field. When `image` is set, the
carousel renders `public/fitness/<image>`. When it is **not** set, it falls back
to the SVG `StatueSilhouette`.

## Adding a photo

1. Save the photo in this folder, e.g. `2026-04-12.jpg`.
2. In `src/lib/content/fitness.ts`, add `image: '2026-04-12.jpg'` to the matching
   milestone object.

Recommended: portrait orientation (≈3:4), same pose / lighting / framing per
milestone for a clean before-after read. JPG or WEBP, ~1000px on the short edge.

Milestone ids currently available:

| id           | milestone        |
| ------------ | ---------------- |
| 2026-04-12   | Baseline         |
| 2026-04-14   | First InBody     |
| 2026-04-26   | Dialed in        |
| 2026-04-29   | First breakthrough |
| 2026-05-07   | The back appeared |
| 2026-05-29   | Clean recomposition |
| 2026-06-04   | Under 25%        |
| 2026-06-11   | New low          |
| goal         | The Greek God (target) |
