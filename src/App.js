import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { useEffect, useState } from "react";
import { Sphere } from "./components/Sphere";
import { Ground } from "./components/Ground";
import { Wall } from "./components/Wall";
import { Dice } from "./components/Dice";

function App() {
  const [dices, setDices] = useState([]);
  const [gauge, setGauge] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [numberOfDices, setNumberOfDices] = useState(2);

  const throwDice = () => {
    setDices([]);
    for (let i = 0; i < numberOfDices; i++) {
      const position = [
        Math.random() * 8 - 4, // -4 ~ 4 사이의 값
        4,
        Math.random() * 8 - 4, // -4 ~ 4 사이의 값
      ];
      setDices((cube) => [...cube, <Dice key={cube.length} gauge={gauge} position={position} />]);
    }
  };

  useEffect(() => {
    let interval;
    if (isPressing) {
      interval = setInterval(() => {
        setGauge((prev) => (prev < 100 ? prev + 1 : 0));
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPressing]);

  return (
    <div style={{ marginTop: "80px", height: "400px" }}>
      <input
        type="number"
        value={numberOfDices}
        onChange={(e) => {
          setDices([]);
          setNumberOfDices(parseInt(e.target.value));
        }}
        min="1"
        max="10"
      />
      <button
        onMouseDown={() => setIsPressing(true)}
        onMouseUp={() => {
          setIsPressing(false);
          throwDice();
          setGauge(0);
        }}
      >
        주사위 굴리기
      </button>
      <button
        onClick={() => {
          setDices([]);
        }}
      >
        초기화
      </button>
      <div>게이지: {gauge}</div>
      <Canvas camera={{ position: [0, 50, 0], fov: 15 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 100, 70]} intensity={1} castShadow />
        <Physics gravity={[0, -30, 0]} defaultContactMaterial={{ restitution: 0.4 }}>
          <Ground />
          <Wall position={[0, 2.5, -5]} rotation={[0, 0, 0]} opacity={100} />
          <Wall position={[0, 2.5, 5]} rotation={[0, Math.PI, 0]} opacity={100} />
          <Wall position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} opacity={100} />
          <Wall position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} opacity={100} />
          {dices.map((cube) => cube)}
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
