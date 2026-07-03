# Demo MyST Theme Renderer Extension

This project uses Module Federation 1.5 to build a module that can be imported by MyST Theme.

<img width="816" height="432" alt="image" src="https://github.com/user-attachments/assets/d235243f-2483-4aa0-a4cf-857eb0d1c4aa" />


## Demo

1. Build this repo with `pnpm run build`
2. Serve the contents of `*/dist` with `pnm run start`
3. Start a patched version of the book theme
4. Start a headless content server in `demo`
5. Patch `demo/_build/site/config.json` with a top-level `remotes` key from `demo/README.md`
