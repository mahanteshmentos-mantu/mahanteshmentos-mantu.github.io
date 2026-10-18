# Maintaining content

## Edit locations

- `src/data/site.ts`: identity, description, public profile, navigation, and interests.
- `src/data/content.ts`: typed `research`, `applications`, and `resources` arrays. All content records use unique lowercase, hyphen-separated slugs. Do not use HTML, secrets, patient identifiers, or confidential study details in text fields.
- `src/pages/about.astro`: approved biography and milestones when available.
- `src/pages/contact.astro`: owner-approved professional contact details only. Do not copy Git commit email addresses here.
- `src/styles/global.css`: shared design tokens and responsive rules.
- `public/`: downloadable files and approved images. A file `public/resources/name.pdf` is linked as `/resources/name.pdf`.

The detail-page templates automatically generate routes for each record. Home automatically features the first application and up to two research/resource entries. Lists and sitemap update from the same arrays. Empty arrays render explicit collection notes.

## Research

Add an object matching `Research` with `slug`, `title`, `summary`, `status`, `kind`, and a `body` array of plain-text paragraphs. Optional `authors`, `year`, `journal`, `doi`, `url`, and `download` must be verified. DOI stores only the identifier, such as `10.xxxx/...`, not the URL. Use the genuine status: Published, Preprint, Submitted, Ongoing, or Completed. Never treat acceptance/submission as publication or a preprint as peer-reviewed. Respect confidentiality and publisher reuse rights. Scholarly structured data is deliberately absent until verified publication records exist; add and validate appropriate `ScholarlyArticle` metadata when those records are approved.

## Applications

Add an `Application` with title, slug, summary, status, technology array, body paragraphs, and limitations. Optional source/live/documentation links must use HTTPS and be checked before inclusion. A source repository is not proof of a live app. Status choices are Prototype — release unverified, In development, Released, or Archived.

Optional `mark` is a short editorial label (for example ADR); `visualLabel` is the caption for the typographic panel. These are not screenshots. To add an actual screenshot, supply `screenshot: { src, alt, width, height }` using a real public image path, accurate text, and intrinsic dimensions. It renders on the project detail page with lazy loading. Remove any patient information before sharing screenshots. Store optimized WebP/AVIF or an appropriately sized PNG/JPEG locally.

## Educational resources

Add a `Resource` with slug, title, summary, topic, kind (Slides, Guide, Worksheet, Reading), and body paragraphs. Supply a verified `url` and/or genuine `download` path. Use accessible, tagged PDFs with text rather than scans; include document format/size in the summary. Run `npm run verify` so links to missing local files fail. Add topic/type filtering only when collection size makes browsing difficult.

## Owner content checklist

- [ ] Approved short/long biography, qualifications, institutions, appointments, and accurate milestone dates.
- [ ] Professional portrait with permission, caption, and alt-text context (optional).
- [ ] Genuine, reviewed public CV PDF (optional); no CV button exists until supplied.
- [ ] Publication citations, DOIs/URLs, authors, dates, and exact status.
- [ ] Public summaries and permissions for ongoing/completed studies, posters, presentations.
- [ ] Teaching materials, topics, format descriptions, and permitted downloads.
- [ ] App release status, live URL, documentation, screenshots, and validation/limitations.
- [ ] Professional email approved for publication and verified ORCID/other profile URLs.
- [ ] A recent update with a real date if an Updates/Notes section is desired.

Do not replace empty states with invented examples. No fake testimonials, usage counts, affiliations, or outcomes. Never publish placeholder records as genuine work.

## Verification

Run `npm run verify` after editing. This checks Astro/TypeScript, builds the static output, and checks routes, local links/assets, metadata, domain preservation, sitemap, and payload size. Manually verify new external links and inspect the page in both themes at narrow and wide viewport sizes. Approval and deployment steps are in `docs/DEPLOYMENT.md`.
