# SKRALOVNIK

One repository for the pages served on skralovnik.com. Each page lives in its own directory, with an `index.html` and its assets.

| Directory | URL | Source |
| --- | --- | --- |
| `cv/` | `/cv/` | Existing `main` content; unchanged. |
| `website-v1/` | `/website-v1/` | Latest personal website draft with the video hero, from `website-v1` at `5a881a8841f5fef5deaf6e93cf259e22c8c567d8`. |

The original branches and their history are preserved. These folders are copies of the original page files, not redesigned pages. The MitroCare branch is not part of this combined site. There is currently no root `index.html`; the homepage can be selected separately.

The README files inside the archived drafts describe their original development context. Their references to merging branches or files outside the repository are historical.

## Local editing

Open the repository's root directory in VS Code. This is a static site; no build step is needed.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000/cv/` or `http://localhost:8000/website-v1/`.

Use local Git commits to save coherent changes. Branches are for developing changes to this project; directories are for pages that should be available at the same time.

## Direct Vercel deployment

For the local-only workflow, Git commits stay on the computer and deployment uses Vercel CLI. A GitHub push is not required for CLI deployment.

From the repository root, log in with `vercel login` and use `vercel link` to select the existing **skralovnik** project. Verify the project and team before deploying. Use `vercel` for a preview and `vercel --prod` when the reviewed version is ready to publish.

The domain already belongs to the existing Vercel project; do not create a replacement project. If its GitHub integration remains enabled, pushes to its production branch can also publish changes.

## Original draft limitation

The personal-site draft attempts to load an untracked DRAFTPIN development script on localhost. This may produce a missing-file message locally; it is not loaded on the public domain.
