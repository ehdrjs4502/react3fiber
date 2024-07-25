import React, { useEffect, useState, useRef, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, useGLTF } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "../components/Ground";
import { Wall } from "../components/Wall";
import { Dice } from "../components/ThrowDices/Dice";
import { ProgressBar } from "../components/ProgressBar";

// 주사위 컴포넌트의 props 타입 정의
interface DiceProps {
  gauge: number;
  position: [number, number, number];
  setResults: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ThrowDices: React.FC = () => {
  const [dices, setDices] = useState<ReactNode[]>([]);
  const [gauge, setGauge] = useState<number>(0);
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [numberOfDices, setNumberOfDices] = useState<number>(2);
  const [results, setResults] = useState<number[]>([]);
  const [isThrow, setIsThrow] = useState<boolean>(false);

  const handleReset = () => {
    setResults([]);
    setDices([]);
    setIsThrow(false);
  };

  const handleThrow = () => {
    setIsPressing(false);
    throwDice();
    setGauge(0);
    setIsThrow(true);
  };

  const throwDice = () => {
    setDices([]);
    for (let i = 0; i < numberOfDices; i++) {
      const position: [number, number, number] = [
        Math.random() * 8 - 4, // -4 ~ 4 사이의 값
        Math.random() * 4 + 5,
        Math.random() * 8 - 4, // -4 ~ 4 사이의 값
      ];
      setDices((cube) => [
        ...cube,
        <Dice key={cube.length} gauge={gauge} position={position} setResults={setResults} />,
      ]);
    }
  };

  useEffect(() => {
    if (isPressing) {
      const interval = setInterval(() => {
        setGauge((prev) => (prev < 100 ? prev + 1 : 0));
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isPressing]);

  const formattedResults = results.reduce((acc, result, index) => {
    if (index === results.length - 1) {
      return acc + result + " = ";
    } else {
      return acc + result + " + ";
    }
  }, "");

  // 결과 값의 합계 계산
  const sum = results.reduce((acc, curr) => acc + curr, 0);

  return (
    <div style={{ marginTop: "80px", height: "400px" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: "-999",
          top: "50px",
          fontSize: "18px",
        }}
      >
        <span>
          {results.length > 1 && formattedResults}
          {sum}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="number"
          value={numberOfDices}
          onChange={(e) => {
            handleReset();
            setNumberOfDices(parseInt(e.target.value));
          }}
          min="1"
          max="10"
        />
        <button
          onMouseDown={() => setIsPressing(true)}
          onMouseUp={handleThrow}
          onTouchStart={() => setIsPressing(true)}
          onTouchEnd={handleThrow}
          style={{ userSelect: "none", marginLeft: "14px", marginRight: "14px" }}
          disabled={isThrow}
        >
          주사위 굴리기
        </button>
        <button onClick={handleReset}>초기화</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "14px", marginBottom: "14px" }}>
        <ProgressBar value={gauge} />
      </div>
      <Canvas camera={{ position: [0, 50, 0], fov: 15 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 100, 70]} intensity={1} castShadow />
        <Physics gravity={[0, -30, 0]} defaultContactMaterial={{ restitution: 0.3 }}>
          <Ground rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} args={[100, 100]} />
          <Wall position={[0, 2.5, -5]} rotation={[0, 0, 0]} opacity={100} args={[10, 5, 0.2]} />
          <Wall position={[0, 2.5, 5]} rotation={[0, Math.PI, 0]} opacity={100} args={[10, 5, 0.2]} />
          <Wall position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} opacity={100} args={[10, 5, 0.2]} />
          <Wall position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} opacity={100} args={[10, 5, 0.2]} />
          {dices.map((dice) => dice)}
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
};
