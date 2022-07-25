import React, {  lazy, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useFrame, PrimitiveProps } from '@react-three/fiber'
import { useGLTF, Detailed, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

const MainHeart = lazy(() => import('./MainHeart'))
const FloatingHeart = lazy(() => import('./FloatingHeart'))

const Hearts = ({ speed = 1, count = 120, depth = 40,  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }: { speed: number, count: number, depth: number, easing: (x: number) => number }) => {

  const [showFloatingHearts, setShowFloatingHearts] = useState(false)

  return (
    <Canvas gl={{ alpha: false, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 20 }}>
      <color attach="background" args={['#b44225']} />
      <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="red" />
      <Environment preset="sunset" />
      {/* Multisampling (MSAA) is WebGL2 antialeasing, we don't need it (faster) */}
      <EffectComposer multisampling={0}>
        {/* 20 es super cerca - 60 es normal */}
        <DepthOfField target={[0, 0, showFloatingHearts ? 60 : 20]} focalLength={0.5} bokehScale={11} height={700} /> 
      </EffectComposer>

      <MainHeart onAnimate={() => setShowFloatingHearts(true)} />
      {Array.from({ length: count }, (_, i) => <FloatingHeart key={i} index={i} z={Math.round(easing(i / count) * depth) + 2} speed={showFloatingHearts ? speed * 10 : speed} /> /* prettier-ignore */)}
    </Canvas>
  )
}

export default Hearts