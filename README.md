# Skralovnik website

The existing MitroCare page and all its assets live in `mitrocare/` and are served at https://www.skralovnik.com/mitrocare/.

The page, scripts, styles, images, and alternate HTML draft were moved without content changes. Vercel serves this as a static site; no build command or dependencies are needed.

## Publish the new homepage

1. Add the new presentation landing page as `index.html` in the repository root, along with its assets.
2. Remove the temporary redirects for `/`, `/index.html`, and `/assets/:path*` from `vercel.json`.
3. Keep the `mitrocare/` directory. Its relative asset links are self-contained.
4. Keep `trailingSlash: true` so `/mitrocare` redirects to `/mitrocare/` and relative assets resolve correctly.
5. Deploy the `main` branch through the existing Vercel project `skralovnik`.

Until the new homepage is published, the root uses a temporary redirect to `/mitrocare/`. Legacy asset links and the alternate HTML draft also redirect to their new locations. The existing apex-to-www domain redirect is managed by Vercel.

## Existing limitations

- The application form only validates input and displays a success message. It does not send or save applications; that behavior predates this move.
- The page references an `og-image.jpg` social preview image that is absent from the original repository. This move does not add a new image or change the page's metadata.

## Previous version

The original root site is preserved in Git commit `c117509738e3d2506c3263baddf5096cca083ea5` and Vercel deployment `dpl_FcgxbGRdqEhmcDfj6C24QSzC7RMz`.
