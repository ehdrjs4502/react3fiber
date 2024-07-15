import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export const Dice = ({ gauge, position, setResults }) => {
  const { scene } = useGLTF("/dice/scene.gltf");

  const copiedScene = useMemo(() => scene.clone(), [scene]);
  const [ref, api] = useBox(() => ({
    mass: 10,
    position: position,
    args: [1, 1, 1],
    friction: 0.2,
    restitution: 0.7,
    allowSleep: true,
  }));

  useEffect(() => {
    api.applyImpulse([-gauge, gauge, 0], [0, 0.7, 0.3]);
  }, [api, gauge]);

  useEffect(() => {
    if (copiedScene) {
      copiedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [copiedScene]);

  const calculateFacePositions = () => {
    const facePositions = [];
    const faceNormals = [
      new THREE.Vector3(0, 0, 1), // front
      new THREE.Vector3(0, 0, -1), // back
      new THREE.Vector3(1, 0, 0), // right
      new THREE.Vector3(-1, 0, 0), // left
      new THREE.Vector3(0, 1, 0), // top
      new THREE.Vector3(0, -1, 0), // bottom
    ];

    const quaternion = new THREE.Quaternion();
    ref.current.getWorldQuaternion(quaternion);

    faceNormals.forEach((normal) => {
      const rotatedNormal = normal.clone().applyQuaternion(quaternion);
      const facePosition = new THREE.Vector3().copy(ref.current.position).add(rotatedNormal);
      facePositions.push(facePosition);
    });

    return facePositions;
  };

  const handleSleep = () => {
    const diceScale = {
      0: 1,
      1: 6,
      2: 2,
      3: 5,
      4: 4,
      5: 3,
    };
    const facePositions = calculateFacePositions();
    let maxY = -Infinity;
    let maxIndex = -1;

    facePositions.forEach((item, index) => {
      if (item.y > maxY) {
        maxY = item.y;
        maxIndex = index;
      }
    });

    setResults((result) => [...result, diceScale[maxIndex]]);

    console.log("눈금:", diceScale[maxIndex]);
  };

  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe((v) => {
      if (v.every((value) => Math.abs(value) < 0.01)) {
        handleSleep();
        console.log("멈춰!");
        unsubscribeVelocity(); // Unsubscribe to prevent the loop
      }
    });
  }, [api]);

  return (
    <group ref={ref} scale={[0.05, 0.05, 0.05]}>
      <primitive object={copiedScene} />
    </group>
  );
};
