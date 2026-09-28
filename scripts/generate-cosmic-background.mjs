import { mkdirSync, writeFileSync } from 'node:fs';

// Deterministic vector artwork: stars, a gravitational halo, and nested orbital contours.
let seed = 821;
const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const stars = Array.from({ length: 480 }, () => {
  const x = random() * 1600, y = random() * 1000;
  const radius = random() < .06 ? 1.6 : .35 + random() * .7;
  const opacity = .15 + random() * .65;
  const color = random() > .7 ? '#d1b795' : '#cadde9';
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
}).join('');
const contours = [];
for (let i = 0; i < 42; i++) {
  const points = [];
  const radius = 260 + i * 5.7;
  for (let j = 0; j <= 240; j++) {
    const a = j / 240 * Math.PI * 2;
    // Repeating scales of perturbation suggest the folded detail of cosmic fractals.
    const ripple = Math.sin(a * 5 + i * .12) * 3 + Math.sin(a * 13 - i * .17) * 1.8 + Math.sin(a * 29) * .6;
    const r = radius + ripple;
    const x = 1100 + Math.cos(a) * r;
    const y = 410 + Math.sin(a) * r * .89;
    points.push(`${j ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  contours.push(`<path d="${points.join('')}Z" stroke="${i < 10 ? '#f2d6ac' : '#7797b0'}" stroke-width="${i === 2 ? 1.5 : .65}" opacity="${i < 10 ? .44 - i * .022 : .19 - (i - 10) * .004}"/>`);
}
const disk = Array.from({ length: 23 }, (_, i) => `<ellipse cx="1100" cy="425" rx="${480 + i * 9}" ry="${35 + i * 2.7}" transform="rotate(-15 1100 425)" stroke="${i < 7 ? '#f4dfbd' : '#b29679'}" stroke-width="${i === 3 ? 1.8 : .7}" opacity="${.32 - i * .011}"/>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" fill="none">
<defs>
 <radialGradient id="nebula"><stop stop-color="#324e77" stop-opacity=".6"/><stop offset=".5" stop-color="#20283e" stop-opacity=".26"/><stop offset="1" stop-color="#0a1019" stop-opacity="0"/></radialGradient>
 <radialGradient id="warm"><stop stop-color="#c09963" stop-opacity=".2"/><stop offset="1" stop-color="#c09963" stop-opacity="0"/></radialGradient>
 <linearGradient id="edges" x2="0" y2="1"><stop stop-color="white" stop-opacity="0"/><stop offset=".13" stop-color="white"/><stop offset=".84" stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient>
 <mask id="fade"><path d="M0 0H1600V1000H0Z" fill="url(#edges)"/></mask>
 <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>
${stars}
<g mask="url(#fade)">
 <ellipse cx="1050" cy="400" rx="800" ry="600" fill="url(#nebula)"/>
 <ellipse cx="950" cy="500" rx="720" ry="230" transform="rotate(-22 950 500)" fill="url(#warm)"/>
 <ellipse cx="1100" cy="410" rx="269" ry="240" stroke="#e9bc7e" stroke-width="9" opacity=".24" filter="url(#soft)"/>
 <ellipse cx="1100" cy="425" rx="580" ry="58" transform="rotate(-15 1100 425)" stroke="#e0bd91" stroke-width="9" opacity=".22" filter="url(#soft)"/>
 ${contours.join('')}${disk}
 <path d="M70 845C380 490 670 1070 1560 670M-80 900C380 540 740 1150 1670 730" stroke="#7797b0" stroke-width=".8" opacity=".12"/>
</g></svg>`;
mkdirSync('public/images', { recursive: true });
writeFileSync('public/images/cosmic-night.svg', svg);
