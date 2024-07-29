import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { usePlayerControls } from "../hooks/usePlayerControls";

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const speed = new THREE.Vector3();

export const Player = () => {
  const [ref, api] = useSphere<THREE.Mesh>(() => ({ mass: 1, type: "Dynamic", position: [0, 10, 0] }));
  const { forward, backward, left, right, jump } = usePlayerControls();
  const { camera } = useThree();
  const velocity = useRef([0, 0, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), []);
  useFrame(() => {
    ref?.current?.getWorldPosition(camera.position);
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
    speed.fromArray(velocity.current);

    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(+velocity.current[1].toFixed(2)) < 0.05)
      api.velocity.set(velocity.current[0], 10, velocity.current[2]);
  });
  return <mesh ref={ref}></mesh>;
};
