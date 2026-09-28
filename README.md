# NightOwls Media & Solutions

Responsive agency homepage built with React, TypeScript, Tailwind CSS, and Vite.

## Local development

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution is disabled.

## Validation

- `npm run build`: TypeScript checks and production build in `dist/`.
- `npm run lint`: source linting.
- `npm run typecheck`: TypeScript checks.
- `npx playwright test`: desktop and mobile interaction tests (start the development server first; tests use locally installed Microsoft Edge).

## Content and integrations

Services and concept projects are defined in `src/App.tsx`. Portfolio entries are explicitly illustrative concepts. The inquiry form prepares a downloadable project brief locally; it is not connected to a mail service or backend. Replace concept work with approved client content and connect a real inquiry endpoint before launch.

Fonts are hosted locally through Fontsource packages. Dialogs support Escape, focus containment, and return focus to their trigger. Layouts support reduced motion and narrow mobile screens.

The hero owl is an interactive polygon SVG perched on a leafy branch in `src/HeroScene.tsx`. Its eyes follow the pointer, its wings respond to hover or keyboard focus, and clicking or tapping it triggers a greeting. The supplied NightOwls logo appears in the header and footer.

The site uses a teal palette in `src/moonlit-teal.css`, with stars and illustrative constellations across the background. Selected stars twinkle, and `src/ShootingStars.tsx` adds occasional shooting stars. Animations respect reduced-motion preferences. Regenerate the star field with `node scripts/generate-starfield.mjs`.

`src/AmbientScene.tsx` adds lazy-loaded React Three Fiber geometry with a WebGL error fallback. Reduced motion and hidden tabs disable the canvas. Earlier background artwork is retained in `public/images/` for future design variations.
