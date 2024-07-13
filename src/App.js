import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Shiba() {
  const gltf = useLoader(GLTFLoader, "/shiba/scene.gltf");
  const ref = useRef();
  const [isTumbling, setIsTumbling] = useState(false);
  const [rotationX, setRotationX] = useState(0);

  useEffect(() => {
    if (isTumbling) {
      const targetRotation = ref.current.rotation.y + Math.PI * 2;
      const startTime = Date.now();

      const animate = () => {
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
      };

      requestAnimationFrame(animate);
    }
  }, [isTumbling, rotationX]);

  const handleClick = () => {
    if (!isTumbling) {
      setIsTumbling(true);
    }
  };

  return <primitive ref={ref} object={gltf.scene} onClick={handleClick} />;
}

function App() {
  return (
    <Canvas camera={{ fov: 75, position: [0.1, 0.3, 1] }}>
      <ambientLight />
      <Shiba />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
