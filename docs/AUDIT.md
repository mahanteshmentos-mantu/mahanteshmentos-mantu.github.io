# Repository and deployment audit

Audit date: 2026-10-18. Repository: https://github.com/mahanteshmentos-mantu/mahanteshmentos-mantu.github.io

## Baseline inspected before implementation

- Default branch: `main`.
- Baseline commit: `645dd432d0377a43de521a18ae1d803716d6d41f`.
- Entire tracked tree: `CNAME` (13 bytes) and `README.md` (33 bytes).
- Both files read; both commits in history inspected. Initial commit `bfc99f8`, followed by CNAME addition `645dd43`.
- `CNAME` contains `mabchonge.me` followed by one newline. Preserved byte-for-byte.
- No existing framework, package manifest, dependencies, routes, assets, workflow, tests, or AGENTS.md.
- No existing Astro project to retain. New static Astro project is appropriate.
- No DNS, nameserver, registration, Pages, HTTPS, or other repository setting was changed.

## Deployment constraint and access limit

The GitHub connector rejected its read-only `/pages` endpoint as unsupported. The current Pages publishing source, build mode, and HTTPS enforcement setting therefore remain unknown. The original CNAME establishes the intended domain but does not prove working DNS, a certificate, or Pages configuration.

The new Astro configuration targets `https://mabchonge.me`, root base `/`, static output `dist/`, and directory routes. It must not use `/mahanteshmentos-mantu.github.io/` as its base: this is a user-site repository with a custom root domain.

No existing deployment workflow exists in the tracked tree. New deployment workflow is manual-only and restricted to `main`. Do not run it without owner approval and confirmation of the current Pages source. If the repository currently publishes from a branch, a merge to that publishing branch can trigger GitHub's existing implicit Pages build even though this new workflow is manual. Review that setting before merging.

## Content provenance

- Name, physician identity, and five positioning areas: explicitly provided by the owner in the task brief.
- Public GitHub profile: account/repository ownership returned by the connected GitHub integration.
- Application title and implemented interface elements: `PSY-ADR-app/index.html` at `6431d746855e1e756eba980c886f5b3a3d58991d`. The repository README contains only its name. Descriptions refer to source inspection, not verified clinical behavior or release quality.
- No qualifications, employer, affiliations, awards, dates of education, publications, research outcomes, direct email, or CV were supplied in the audited website tree.
- Commit-author email was deliberately not republished as contact information.
- No other private repositories or patient data were imported.

## Design and architecture

Warm paper background, deep teal, readable system sans-serif paired with Georgia editorial headings; no external font or image requests. Abstract typography replaces an unprovided headshot. Responsive CSS, always-visible wrapping navigation, skip link, focus styles, reduced motion, and a guarded local-storage theme preference.

Shared `Base.astro` layout owns navigation, metadata, footer, and theme behavior. Three reusable components provide page headings, project cards, and honest empty states. Typed content arrays generate detail pages without introducing a CMS or database. Search is intentionally omitted while research/resources are empty and only one application exists.
