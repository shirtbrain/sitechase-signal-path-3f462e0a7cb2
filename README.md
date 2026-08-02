# SiteChase Visibility Decision Room Spike

## Question

Can a purposeful sticky story make SiteChase's evidence-to-decision process easier to understand without copying a reference site's mechanics or sacrificing static accessibility?

## Prototype

- One noindex concept page with synthetic SEO findings.
- Four-phase signal path: collect, validate, prioritize, approve.
- Desktop-only sticky visual enhanced with `IntersectionObserver`.
- Complete normal-flow content when JavaScript is absent, the viewport is narrow, or reduced motion is requested.
- Local fonts and compressed WebP assets; no trackers or third-party runtime dependencies.
- Existing SiteChase WordPress pages are not part of this prototype.

## Checks

```bash
node --check app.js
rg -c '<h1' index.html
rg 'noindex,nofollow,noarchive,nosnippet,noimageindex' index.html
```

## Verdict

Pending implementation and browser checks.
