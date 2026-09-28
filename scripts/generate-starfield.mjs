import { mkdirSync, writeFileSync } from 'node:fs';

// A seamless, deterministic field of distant stars, without planets or orbital rings.
let seed = 9147;
const random = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
const stars = Array.from({ length: 820 }, (_, index) => {
  const x = (8 + random() * 1584).toFixed(2);
  const y = (8 + random() * 984).toFixed(2);
  const bright = random() > .97;
  const radius = bright ? 1.35 + random() * .45 : .35 + random() * .65;
  const opacity = bright ? .85 : .18 + random() * .56;
  const color = random() > .25 ? '#dcefeb' : '#8acbc8';
  const point = `<circle cx="${x}" cy="${y}" r="${radius.toFixed(2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
  if (!bright) return point;
  const duration = 4.5 + (index % 7) * .65;
  const delay = -(index % 19) * .47;
  return `<g class="twinkling-star" style="animation-duration:${duration}s;animation-delay:${delay}s"><circle cx="${x}" cy="${y}" r="7" fill="url(#starlight)"/>${point}<path d="M${Number(x)-3.5} ${y}h7M${x} ${Number(y)-3.5}v7" stroke="#defaf2" stroke-width=".5" opacity=".32"/></g>`;
}).join('');
// Loose, illustrative constellations keep the sky airy around the content.
const constellations = [
  [[130,160],[184,117],[239,153],[296,123],[352,186],[315,244],[239,153]],
  [[1080,128],[1150,165],[1221,140],[1265,205],[1203,252],[1150,165]],
  [[1330,440],[1383,382],[1450,418],[1416,484],[1500,530]],
  [[70,637],[130,596],[200,648],[173,711],[249,752]],
  [[667,788],[725,728],[790,762],[827,824],[896,855],[955,798]],
  [[1070,681],[1137,641],[1189,711],[1254,684],[1307,756]],
];
const connections = constellations.map(points => {
  const line = `<polyline points="${points.map(point=>point.join(',')).join(' ')}" fill="none" stroke="#9cd9cf" stroke-width=".8" opacity=".27"/>`;
  const nodes = [...new Map(points.map(point=>[point.join(','),point])).values()].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="url(#starlight)"/><circle cx="${x}" cy="${y}" r="1.7" fill="#d9f6ee" opacity=".85"/>`).join('');
  return `<g>${line}${nodes}</g>`;
}).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><style>
.twinkling-star {animation: star-twinkle 6s ease-in-out infinite;}
@keyframes star-twinkle {0%,100% {opacity:.35;} 45% {opacity:1;} 70% {opacity:.6;}}
@media(prefers-reduced-motion:reduce) {.twinkling-star {animation:none;opacity:.8;}}
</style><defs><radialGradient id="starlight"><stop stop-color="#b9f4e1" stop-opacity=".38"/><stop offset="1" stop-color="#b9f4e1" stop-opacity="0"/></radialGradient></defs>${stars}${connections}</svg>`;
mkdirSync('public/images', { recursive: true });
writeFileSync('public/images/interstellar-stars.svg', svg);
