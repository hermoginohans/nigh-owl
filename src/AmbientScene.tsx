import { Canvas, useFrame } from '@react-three/fiber'
import { Component, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Group } from 'three'
function Fragments() {
  const group = useRef<Group>(null)
  useFrame(({ clock }, delta) => {
    if (!group.current) return
    group.current.position.y = Math.sin(clock.elapsedTime * .3) * .1
    group.current.children.forEach((child, i) => { child.rotation.y += delta * (.04 + i * .009); child.rotation.z += delta * .02 })
  })
  return <group ref={group}>{[[3.4,1.5,0,.14],[-3.8,-1.1,-1,.15],[.4,1.9,-2,.1],[3.9,-1.4,-1,.19]].map(([x,y,z,size],i)=><mesh key={i} position={[x,y,z]} rotation={[i,.5,.3]}><tetrahedronGeometry args={[size,0]}/><meshStandardMaterial color="#8c9b9f" metalness={.8} roughness={.3} flatShading/></mesh>)}</group>
}
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}
export default function AmbientScene() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!media.matches && document.visibilityState === 'visible')
    update(); media.addEventListener('change',update); document.addEventListener('visibilitychange',update)
    return () => { media.removeEventListener('change',update); document.removeEventListener('visibilitychange',update) }
  }, [])
  if (!enabled) return null
  return <Boundary><Canvas dpr={[1,1.5]} camera={{position:[0,0,5],fov:48}} gl={{alpha:true}} fallback={<span/>}><ambientLight intensity={1.5}/><directionalLight position={[4,5,6]} intensity={3}/><Fragments/></Canvas></Boundary>
}
