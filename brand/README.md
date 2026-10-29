# Ramanujan brand kit

The mark is Ramanujan's infinite nested radical: three radical signs, each a smaller copy inside the last, converging on one ember point. The spec is in `DESIGN.md` → Logo.

## LinkedIn company page

| Slot | File | Size |
|---|---|---|
| Logo (upload this) | `linkedin/ramanujan-logo-square-400.png` | 400 × 400 |
| Logo, high-res alternative | `linkedin/ramanujan-logo-square-1200.png` | 1200 × 1200 |
| Logo with wordmark (best for large placements, unreadable at feed size) | `linkedin/ramanujan-logo-stacked-1200.png` | 1200 × 1200 |
| Cover image | `linkedin/ramanujan-cover-2256x382.png` (sharper) or `-1128x191.png` | 1128 × 191 ratio |

The cover keeps its text centre-right because LinkedIn lays the logo over the bottom-left corner.

## Everything else

- `ramanujan-logo-horizontal.svg/.png`: mark and wordmark, transparent, for dark backgrounds
- `ramanujan-logo-horizontal-black.*`: the same on solid black
- `ramanujan-logo-horizontal-light.*`: black ink on white, for documents and light backgrounds
- `ramanujan-mark.svg/.png`: mark only, transparent
- `favicon.svg`, `favicon-512.png`: app icon (flat colours, readable at 16 px)

SVGs are the masters; the wordmark is outlined (Archivo 600, 88% width) so they need no fonts installed.

## Regenerating

`source/` has the generator. It needs `opentype.js@1.3.4`, the Archivo 88/600 and IBM Plex Mono 500 TTFs in `source/fonts/` (Google Fonts), Node and Google Chrome:

```
node build.mjs && ./render.sh jobs/jobs.json
```
