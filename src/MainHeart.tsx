import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useFrame, PrimitiveProps } from '@react-three/fiber'
import { useGLTF, Detailed, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'


export default function MainHeart({ onAnimate }) {
  const ref = useRef<PrimitiveProps>(null!)
  const [clicks, setClicks] = useState(0)
  let halfTopMovement = false

  const { nodes, materials } = useGLTF('/heart-compressed-transformed.glb')

  useFrame((state, dt) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, clicks * Math.PI * 2, 0.05)

    // const posY = Math.round(ref.current.rotation.y * 100) / 100
    // const topTargetPosition = Math.abs(Math.sin((Math.PI / 2) * clicks))

    // if (halfTopMovement) {
      // ref.current.position.y = THREE.MathUtils.lerp(ref.current.rotation.y, topTargetPosition, 0.05)
    //   console.log(ref.current.rotation.y, topTargetPosition, halfTopMovement)
    // } else {
    //   ref.current.position.y = THREE.MathUtils.lerp(ref.current.rotation.y, -topTargetPosition, 0.05)
    //   console.log(ref.current.rotation.y, -topTargetPosition, halfTopMovement)
    // }

    // if (topTargetPosition !== 0 && ref.current.rotation.y > (topTargetPosition - 0.1) && !halfTopMovement) {
    //   halfTopMovement = true
    //   console.log('halfTopMovement ->', ref.current.rotation.y, topTargetPosition)
    // }

    // if (clicks === 3) {
    //   ref.current.position.y += 0.1
    // }
     // Math.sin(state.clock.elapsedTime / 10) * Math.PI
    // ref.current.position.set(0, 0, 0)
    // ref.current.scale.set(clicked ? 1.5 : 1, clicked ? 1.5 : 1, 1)
  })

  const handleClick = () => {
    setClicks(clicks + 1)

    if (clicks === 2) {
      console.log('click', clicks)
      onAnimate()
      setClicks(0)
    }
  }

  return (
    <group ref={ref} dispose={null}  onClick={handleClick}>
      <mesh geometry={nodes.Cube001.geometry} material={materials.Heart} material-emissive="red" />
    </group>
  )
}