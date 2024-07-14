import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, useGLTF } from "@react-three/drei";

function Shiba() {
  const gltf = useGLTF("/shiba/scene.gltf");
  const ref = useRef();
  const [isTumbling, setIsTumbling] = useState(false);
  const [rotationX, setRotationX] = useState(0);

  useEffect(() => {
    if (isTumbling) {
      console.log(ref.current);
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

function Box(props) {
  const ref = useRef();
  const [color, setColor] = useState(0);
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    const c = (Math.sin(color) + 1) / 2;
    ref.current.material.color.setRGB(c, 0, 1 - c);
    setColor(color + 0.01);
  });

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry />
      <meshBasicMaterial />
    </mesh>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 75 }}>
      <Text position={[0, 1, 0]} fontSize={0.4} fontWeight={700} color="black">
        시바견
      </Text>
      <ambientLight />
      <Shiba />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
