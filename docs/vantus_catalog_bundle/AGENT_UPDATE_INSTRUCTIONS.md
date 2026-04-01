# Agent Update Instructions

## Canonical Sources In This Bundle
1. `pages/*.json` are the canonical page payloads for public route updates.
2. `libraries/vantus-services-pricing-library.json` is the canonical commercial library for SKUs, ranges, recommendations, negatives, cross-sells, and upsells.
3. `manifest.json` defines route coverage and bundle metadata.

## Required Update Behavior
- Preserve route slugs exactly.
- Keep all price anchors and scope boundaries intact.
- Do not reposition Vantus as a generic branding, social-media, or ad-retainer shop.
- Keep `Website + CMS (Recommended)` as the hero package.
- Preserve the ownership-first, proof-first, anti-hype tone.
- Do not add unsupported superlatives or fabricated proof.
- Treat portal work as MVP-scoped by default.
- Treat hardware as client-purchased; no leasing or financing language.
- Do not publish Care pricing on `/pricing` unless explicitly instructed in a future release.

## SEO / Conversion Rules
- Every page must have one clear next step.
- Use the included SEO title and meta description unless a later canonical content release supersedes them.
- Preserve internal linking between homepage, services, pricing, proof, standards, about, start-audit, and contact.
- Keep CTA labels exactly where specified unless testing variants are explicitly authorized.

## Rendering Guidance
- Render section order exactly as provided.
- Maintain plain-language formatting and avoid padding sections with generic agency language.
- Show recommended state on `Website + CMS (Recommended)` in cards and comparison modules.
- Render price anchors using both starting price and typical range when supplied.

## Commercial Guardrails
- Final pricing is confirmed after discovery, complexity scoring, and written scope.
- Out-of-scope work requires formal change requests.
- Default deposit is 40 percent with a minimum of $2,500.
- Discount cap is 5 percent without approval, 15 percent with founder approval.
- Gross margin floor target is 50 percent.
