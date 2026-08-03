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

Pending iteration-two public browser checks.
