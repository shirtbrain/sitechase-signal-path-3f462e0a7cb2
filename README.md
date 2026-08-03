# SiteChase Visibility Decision Room Spike

## Question

Can a continuous, mobile-capable scrolling hero make SiteChase's
evidence-to-decision process feel more coherent without copying a reference
site's mechanics or sacrificing static accessibility?

## Prototype

- One noindex concept page with synthetic SEO findings.
- Four-phase signal path: collect, validate, prioritize, approve.
- Viewport-pinned second section with continuous scroll interpolation across
  imagery, copy, progress, and red/blue signal routes on desktop and mobile.
- Complete normal-flow content when JavaScript is absent or reduced motion is
  requested.
- Queue, approval, and proof material consolidated into longer narrative
  sections to reduce the card-by-card feeling of the first iteration.
- Local fonts and compressed WebP assets; no trackers or third-party runtime dependencies.
- Existing SiteChase WordPress pages are not part of this prototype.

## Checks

```bash
node --check app.js
rg -c '<h1' index.html
rg 'noindex,nofollow,noarchive,nosnippet,noimageindex' index.html
```

## Verdict

**PARTIAL.** The interaction approach is validated. The public GitHub Pages
build returned 200 for the document and sampled assets and produced no browser
console errors. At 1440×900 the second section stayed pinned, image and route
values interpolated continuously across seven sampled scroll positions, copy
cleared between statements rather than overlapping, and the page had no
horizontal overflow. At 390×844 the same enhancement remained active; the copy
panel stayed inside the viewport above the progress rail, the header CTA measured
44px high, and no horizontal overflow was detected. Reduced-motion rendering
kept the enhancement off, and the raw no-JS document retained all four scenes.

What remains unvalidated is the human outcome: whether this version feels more
coherent and improves prospect comprehension or conversion. That requires Tom's
review or a controlled user test.
