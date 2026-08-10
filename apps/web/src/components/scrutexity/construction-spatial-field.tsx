"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function SpatialField() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * .025, .04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * .04, .04);
    group.current.position.y = Math.sin(clock.elapsedTime * .18) * .035;
  });
  return <group ref={group} rotation={[-.42,0,0]}>
    {[0,1,2,3].map((n)=><gridHelper key={n} args={[12,18,0xb9c2cf,0xcbd2dc]} position={[0,n*.7-1.2,-n*.7]} material-transparent material-opacity={.16-n*.025}/>) }
    {[[-3,-.3,0],[2,.45,-1.2],[0,-.7,-2.5]].map((p,i)=><mesh key={i} position={p as [number,number,number]} rotation={[-Math.PI/2,0,i*.08]}><planeGeometry args={[4.6-i*.45,2.2]}/><meshBasicMaterial color={i===1?0xd9ff5c:0xffffff} transparent opacity={i===1?.055:.07} side={THREE.DoubleSide}/></mesh>)}
  </group>;
}

export default function ConstructionSpatialField() {
  const [active,setActive]=useState(false);
  useEffect(()=>{
    const desktop=matchMedia("(min-width: 769px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const on=()=>setActive(document.visibilityState==="visible"&&desktop.matches);
    on();document.addEventListener("visibilitychange",on);desktop.addEventListener("change",on);
    return()=>{document.removeEventListener("visibilitychange",on);desktop.removeEventListener("change",on)}
  },[]);
  if(!active) return null;
  return <Canvas className="sx-webgl" dpr={[1,1.5]} camera={{position:[0,2.5,6],fov:42}} gl={{antialias:true,alpha:true,powerPreference:"low-power"}} frameloop="always"><SpatialField/></Canvas>;
}
