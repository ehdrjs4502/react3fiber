import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three";

export const Shiba: React.FC = () => {
  const gltf = useGLTF("/shiba/scene.gltf");
  const ref = useRef<Object3D>(null);
  const [isTumbling, setIsTumbling] = useState<boolean>(false);
  const [rotationX, setRotationX] = useState<number>(0);

  useEffect(() => {
    if (isTumbling) {
      if (ref.current) {
        const targetRotation = ref.current.rotation.y + Math.PI * 2;
        const startTime = Date.now();

        const animate = () => {
          if (ref.current) {
            const elapsed = Date.now() - startTime;
            const duration = 1000; // 1 second
            const progress = Math.min(elapsed / duration, 1);
            ref.current.rotation.x = rotationX - (targetRotation + rotationX) * progress;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setIsTumbling(false);
              setRotationX(ref.current.rotation.y);
            }
          }
        };

        requestAnimationFrame(animate);
      }
    }
  }, [isTumbling, rotationX]);

  const handleClick = () => {
    if (!isTumbling) {
      setIsTumbling(true);
    }
  };

  return <primitive ref={ref} object={gltf.scene} onClick={handleClick} />;
};
