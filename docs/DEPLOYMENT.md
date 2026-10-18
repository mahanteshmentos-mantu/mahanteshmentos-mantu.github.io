# Deployment — mabchonge.me

Repository: `mahanteshmentos-mantu/mahanteshmentos-mantu.github.io`.
Default branch: `main`. Domain: `mabchonge.me`.

**This implementation has not been deployed. Settings must be inspected before merging.** The connector cannot read the Pages publishing source or HTTPS enforcement. No existing tracked deployment workflow was found.

## Review locally

Use Node 24 and npm:

```sh
npm ci
npm run verify
npm run preview
```

Open the local URL printed by Astro. Review at 320, 375, 768, 1024, and 1440 pixels; check keyboard navigation, both themes, reduced motion, and all pages. `dist/` is the complete static output. Preview is local only.

## Before merging or publishing

1. Open this repository's **Settings → Pages**, read and record the source (GitHub Actions or a branch/folder), custom domain, and HTTPS setting. Do not change DNS or remove the existing CNAME.
2. If Pages is already configured for **GitHub Actions**, keep that setting. No configuration migration is needed.
3. If Pages uses **Deploy from a branch**, do not merge yet: that branch may publish automatically. The new project requires a build step. Decide with the owner whether to approve changing only the publishing source to **GitHub Actions**. This is a potentially disruptive repository setting change, not a DNS change. The implementation did not make it. Until approved, keep the existing publishing source and the implementation on its feature branch. An alternative is to publish the built `dist/` through the existing branch/folder process after inspecting it; do not copy unbuilt `src/` into a public publishing folder.
4. Confirm `mabchonge.me` remains the custom domain and the existing HTTPS configuration is preserved. If there is a DNS/certificate error, stop; do not overwrite domain settings as a workaround.
5. Review `docs/CONTENT.md` and decide whether the honest empty sections are acceptable for the first release. Add verified materials if available.

## Approved GitHub Actions release

Once the above review is complete and publication has been authorized:

1. Review and merge the feature branch into `main`.
2. Wait for **Validate website** to pass. It runs `npm ci` and `npm run verify`, then retains the static output as a build artifact.
3. Open **Actions → Deploy approved website to GitHub Pages → Run workflow**. Choose `main`. This is the actual publishing action; do not run before approval.
4. The build job checks types, builds, and tests all output including byte-for-byte CNAME preservation. It uploads `dist/` via `actions/upload-pages-artifact@v3`.
5. The deploy job uses `actions/deploy-pages@v4` with `pages: write` and `id-token: write`. It does not alter DNS, custom-domain settings, or HTTPS enforcement. Honor any existing `github-pages` environment approval gate.
6. Verify the deployment URL reported by Actions and visit `https://mabchonge.me/`.

The workflow deliberately omits `actions/configure-pages` to avoid an implicit Pages setup/configuration mutation. Pages must already be correctly enabled. It has no push deployment trigger, and its build job refuses non-main refs.

## Live checks after release

- HTTPS loads without certificate warnings; verify existing HTTP→HTTPS behavior and the Pages HTTPS setting.
- Home, About, Research, Applications, `/applications/psy-adr/`, Education, Contact, Privacy.
- A nonexistent route returns the custom 404 with HTTP 404, not a successful page response.
- `/CNAME` contains `mabchonge.me`, `/robots.txt` references the canonical sitemap, and `/sitemap.xml` lists correct HTTPS root URLs.
- No broken CSS/favicon requests, console errors, horizontal overflow, or inaccessible focus states.
- Themes work and persist; content remains available with JavaScript disabled or local storage blocked.
- External profile/source links work. Do not call the prototype a released clinical product.
- Run browser accessibility testing and Lighthouse; field Core Web Vitals require real traffic and cannot be inferred from a successful build.

## Update and recovery

Make content changes on a branch, run verification, review/merge, and manually deploy again. There are no hosting subscriptions, database migrations, or application secrets.

For a bad release, use a reviewed revert commit on `main`, rerun checks, and dispatch the same workflow. Do not force-push or modify domain records. Keep CNAME unchanged. The original repository had no built website to restore; retain the first accepted release commit for later recovery.

## Files that affect deployment

- `astro.config.mjs`: adds HTTPS canonical origin, root base, static `dist/` output. Does not change hosting settings.
- `public/CNAME`: exact copy of the preserved root CNAME, included in build artifacts.
- `.github/workflows/ci.yml`: validation only, read-only repository permission.
- `.github/workflows/deploy.yml`: new manual deployment workflow, no automatic publishing.
- Root `CNAME` and `README.md`: unchanged.
