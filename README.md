# Demo MyST Theme Renderer Extension

This project uses Module Federation 1.5 to build a module that can be imported by MyST Theme.

<img width="816" height="432" alt="image" src="https://github.com/user-attachments/assets/d235243f-2483-4aa0-a4cf-857eb0d1c4aa" />


## Demo

1. Build this repo with `pnpm run build`
2. Start a patched version of the book theme
3. Start a headless content server in `demo`
4. Patch `demo/_build/site/config.json` and the public path with a top-level `remotes` by running `pnpm run patch`
