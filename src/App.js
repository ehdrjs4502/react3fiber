import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { useState } from "react";
import { Sphere } from "./components/Sphere";
import { Ground } from "./components/Ground";
import { Wall } from "./components/Wall";

function App() {
  const [spheres, setSpheres] = useState([<Sphere />]);

  const addSpheres = () => {
    let size = Math.random(1);
    size = size < 0.1 ? 0.1 : size;
    console.log(size);
    setSpheres((cur) => [...cur, <Sphere size={size} />]);
  };

  return (
    <div style={{ marginTop: "80px", height: "400px" }}>
      <button onClick={addSpheres}>구 생성</button>
      <button onClick={() => setSpheres([])}>초기화</button>
      <Canvas camera={{ position: [0, 10, 40], fov: 15 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Physics>
          <Ground />
          <Wall position={[0, 2.5, -5]} rotation={[0, 0, 0]} opacity={100} />
          <Wall position={[0, 2.5, 5]} rotation={[0, Math.PI, 0]} opacity={0} />
          <Wall position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} opacity={100} />
          <Wall position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} opacity={100} />
          {spheres.map((sphere) => sphere)}
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
