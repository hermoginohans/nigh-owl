import { useEffect, useRef, useState } from 'react'
import './HeroOwl.css'

const mesh: [string, string][] = [
 ['120,110 135,25 220,112','#87939b'],['135,25 179,70 220,112','#c1c9cd'],
 ['300,112 385,25 400,110','#65727b'],['300,112 341,70 385,25','#a6b2bb'],
 ['120,110 220,112 156,190','#aeb8be'],['220,112 260,90 260,203','#e3e7e8'],
 ['220,112 260,203 156,190','#bdc8cd'],['260,90 300,112 260,203','#8c9ba4'],
 ['300,112 400,110 364,190','#8e9ca5'],['300,112 364,190 260,203','#cbd3d7'],
 ['120,110 156,190 110,255','#53616d'],['400,110 410,255 364,190','#3e4b56'],
 ['156,190 260,203 194,275','#cbd3d6'],['364,190 326,275 260,203','#acbac3'],
 ['110,255 156,190 194,275','#7b8b96'],['410,255 326,275 364,190','#6d7d88'],
 ['194,275 260,203 260,322','#a6b4bc'],['260,203 326,275 260,322','#e1e6e8'],
 ['110,255 194,275 148,366','#4e5d68'],['410,255 372,366 326,275','#33434e'],
 ['194,275 260,322 201,402','#93a3ae'],['326,275 319,402 260,322','#6e838e'],
 ['148,366 194,275 201,402','#667a86'],['326,275 372,366 319,402','#526772'],
 ['201,402 260,322 260,437','#b7c5cb'],['260,322 319,402 260,437','#8399a4'],
 ['148,366 201,402 215,431','#3d525e'],['319,402 372,366 305,431','#2e4654'],
 ['201,402 260,437 215,431','#738b98'],['260,437 319,402 305,431','#526e7f'],
]

export default function HeroScene() {
 const [look, setLook] = useState({ x: 0, y: 0 })
 const [blink, setBlink] = useState(false)
 const [hello, setHello] = useState(false)
 const timers = useRef<ReturnType<typeof setTimeout>[]>([])
 useEffect(() => {
   let reopen: ReturnType<typeof setTimeout>
   const blinkTimer = setInterval(() => { setBlink(true); reopen = setTimeout(() => setBlink(false), 150) }, 4700)
   const move = (event: PointerEvent) => setLook({ x: event.clientX / window.innerWidth * 2 - 1, y: event.clientY / window.innerHeight * 2 - 1 })
   const reset = () => setLook({ x: 0, y: 0 })
   window.addEventListener('pointermove', move)
   document.documentElement.addEventListener('pointerleave', reset)
   return () => { clearInterval(blinkTimer); clearTimeout(reopen); timers.current.forEach(clearTimeout); window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', reset) }
 }, [])
 const greet = () => {
   timers.current.forEach(clearTimeout)
   setBlink(true); setHello(true)
   timers.current = [setTimeout(() => setBlink(false), 230), setTimeout(() => setHello(false), 1800)]
 }
 return <div className="polygon-owl">
   <button className={`polygon-owl-button ${hello ? 'owl-hello' : ''}`} aria-label="Greet the owl. Its eyes follow your pointer; hover or focus to spread its wings." onClick={greet}>
     <svg viewBox="0 0 520 520" role="img" aria-label="Interactive silver polygon owl perched on a leafy branch">
       <g className="owl-branch" aria-hidden="true">
         <polygon points="48,468 114,445 193,436 327,436 399,426 476,407 429,436 335,451 194,450 119,456" fill="#596873" />
         <polygon points="48,468 114,445 193,436 327,436 399,426 476,407 394,437 322,444 190,443 111,450" fill="#93a2ab" />
         <polygon points="119,456 194,450 335,451 429,436 394,446 324,457 193,454" fill="#354853" />
         <polygon points="366,435 401,409 429,369 420,394 405,418 385,439" fill="#889ba5" />
         <polygon points="405,415 389,401 380,375 397,384 405,398" fill="#b0c0c5" />
         <polygon points="405,415 380,375 396,394" fill="#6c8794" />
         <polygon points="420,394 425,371 441,353 462,344 452,366 438,383" fill="#c5d0d1" />
         <polygon points="420,394 442,368 462,344 452,366 438,383" fill="#819da8" />
         <polygon points="406,418 428,402 452,398 473,405 451,417 429,421" fill="#a8bbc3" />
         <polygon points="406,418 440,410 473,405 451,417 429,421" fill="#647f8e" />
         <polygon points="145,446 123,431 102,407 121,419 155,442" fill="#8c9da6" />
       </g>
       <g className="polygon-owl-body" style={{ transform: `rotate(${look.x * 1.4}deg)` }}>
         <g className="polygon-wing left"><polygon points="130,213 63,295 103,393 163,339" fill="#465d6c"/><polygon points="130,213 103,393 133,305" fill="#8395a0"/><polygon points="63,295 103,393 85,316" fill="#283a49"/></g>
         <g className="polygon-wing right"><polygon points="390,213 457,295 417,393 357,339" fill="#344b5a"/><polygon points="390,213 387,305 417,393" fill="#6c808e"/><polygon points="457,295 435,316 417,393" fill="#20323f"/></g>
         {mesh.map(([points, fill], i) => <polygon key={i} points={points} fill={fill} stroke={fill} strokeWidth=".5"/>)}
         {[188,332].map(x => <g key={x} transform={`translate(${x} 185)`}>
           <polygon points="-57,-24 -25,-54 25,-54 57,-24 57,25 25,54 -25,54 -57,25" fill="#243340"/>
           <g className="polygon-eyelid" style={{ transform: `scaleY(${blink ? .06 : 1})` }}>
             <polygon points="-44,-19 -19,-42 19,-42 44,-19 44,19 19,42 -19,42 -44,19" fill="#d6ebf1"/>
             <polygon points="-44,-19 -19,-42 0,0 -44,19" fill="#94bbc9"/>
             <g transform={`translate(${look.x * 13} ${look.y * 10})`}>
               <polygon points="-21,-10 -10,-22 10,-22 22,-10 22,10 10,23 -10,23 -22,10" fill="#0a151e"/>
               <polygon points="-9,-13 0,-16 6,-9 0,-3 -8,-5" fill="#f5fafb"/>
             </g>
           </g>
         </g>)}
         <polygon points="240,232 260,218 280,232 260,266" fill="#ced9df"/><polygon points="260,218 280,232 260,266" fill="#657e8d"/>
       </g>
       <g className="owl-talons" fill="#c2cdd1" stroke="#344955" strokeWidth="2" strokeLinejoin="round">
         {[202, 213, 224, 294, 305, 316].map(x => <polygon key={x} points={`${x},430 ${x + 7},428 ${x + 10},436 ${x + 9},451 ${x + 4},456 ${x},451 ${x + 2},439`} />)}
       </g>
     </svg>
   </button>
   <p className="polygon-owl-hint" aria-live="polite">{hello ? 'Hoot hoot. You have my attention.' : 'MOVE TO EXPLORE · CLICK TO SAY HELLO'}</p>
 </div>
}

