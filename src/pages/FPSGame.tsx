import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Ground } from "../components/Ground";
import { OrbitControls, Sky } from "@react-three/drei";
import { Player } from "../components/FPSGame/Player";
import { Wall } from "../components/Wall";
import { Dice } from "../components/ThrowDices/Dice";

export const FPSGame = () => {
  return (
    <div style={{ marginTop: "80px", height: "100vh" }}>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Physics>
          <Player />
          <Dice gauge={0} position={[0, 0, -3]} />
          <Wall position={[0, 2.5, -5]} rotation={[0, 0, 0]} opacity={100} args={[10, 5, 0.2]} />
          <Ground rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} args={[100, 100]} />
        </Physics>
      </Canvas>
    </div>
  );
};
