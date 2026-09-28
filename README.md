# NightOwls Media & Solutions

Responsive agency homepage built with React, TypeScript, Tailwind CSS, and Vite.

## Local development

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution is disabled.

Open the `/nigh-owl/` URL printed by Vite.

## Hosting

The site is configured for https://hermoginohans.github.io/nigh-owl/.
GitHub Actions builds and deploys changes pushed to `main` using `.github/workflows/deploy.yml`.
The repository's Pages publishing source must be set to **GitHub Actions**.
To use a different repository name or a custom domain, update `base` in `vite.config.js`.

## Call scheduling

Set `VITE_GOOGLE_BOOKING_URL` to the public Google Calendar appointment-schedule
booking page to enable a callback calendar inside the inquiry dialog and booking
links in the header and contact section. Use the full
`https://calendar.google.com/calendar/appointments/...` URL from Google's website
embed option. A `calendar.app.google` short link supports external booking only.

In Google Calendar, create an **Appointment schedule**, set your duration and
available hours, and enable **Check calendars for availability**. Choose a phone
call location and configure the booking form to collect a callback number and
project details. Google handles availability and appointment confirmation.
The website's local inquiry brief is separate and is not sent to Google.

For local development, copy `.env.example` to `.env.local`, set the booking URL,
and restart Vite. For deployment, add the matching GitHub Actions repository
variable and rerun the workflow. Booking URLs are public client configuration;
never put calendar credentials or tokens in these variables.

`VITE_CALENDLY_URL` remains an optional external-booking fallback if no Google
booking page is configured. Without either URL, booking controls stay hidden and
the existing inquiry form remains available.

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
