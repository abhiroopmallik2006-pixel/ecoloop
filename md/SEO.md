# SEO and discoverability

Target public informational pages only. All implementation is pending. Related: [routes](PAGES.md), [content](CONTENT.md).

## Metadata map

| Route | Proposed title | Description intent |
|---|---|---|
| `/` | EcoLoop AI — Circular Resource Management for Communities | Proposed platform for planning resource use across food, water, energy and materials |
| `/how-it-works` | How EcoLoop Works — Predict, Prevent, Recover | Explain measurements, forecasts, human decisions and traceability |
| `/solutions/campuses` | EcoLoop for Campuses — Plan Food and Resource Recovery | Campus operations and pilot approach |
| `/solutions/rwas` | EcoLoop for RWAs — Community Resource Planning | Modular sustainability coordination for housing communities |
| `/pilot` | Discuss an EcoLoop Pilot | Pilot requirements and approved contact details |

Use unique concise descriptions, one descriptive h1, semantic headings, descriptive links, and server-rendered public content. Do not stuff keywords or publish unsupported “best,” “India's first,” or savings claims. Localized pages require translated content before hreflang is added.

## Indexing boundaries

Index only approved public routes. Set noindex on `/demo`, `/login`, `/auth/*`, `/invite/*`, `/onboarding`, `/app/*`, previews, and any draft notices. All API responses and private export routes set `X-Robots-Tag: noindex`; private data still requires authentication. Robots directives are not security controls. Exclude tokens, passports, tenant routes, and signed asset URLs from sitemaps.

Generate sitemap from approved public route list using verified production `APP_BASE_URL`. Canonical URLs must use that origin, not request Host headers or preview domains. Normalize trailing-slash policy and redirect duplicates. Do not register a domain from this specification alone. Search console ownership setup is a later operator action.

## Structured data and sharing

Use Organization/WebSite JSON-LD only after real organization identity, URL, and logo are supplied. Do not invent ratings, Product offers, LocalBusiness addresses, or customer counts. Use a static original social-sharing image with concise brand proposition; no private measurements. Keep OG metadata aligned with actual page status, including “planned” where needed.

## Performance and acceptance

Lazy-load nonessential animation and maps. Public text remains readable without JavaScript. Reserve image dimensions, minimize font/network overhead, and avoid layout shifts. Proposed performance goals: LCP <=2.5s, CLS <=0.1, INP <=200ms at p75 once field data exists; lab testing is a proxy, not proof of field outcomes.

Before launch verify canonical/sitemap origin, no private URLs, no draft pages indexed, useful 404s, responsive headings, valid metadata, and no hydration-only hero text. SEO guidance here is a product checklist, not a ranking guarantee.
