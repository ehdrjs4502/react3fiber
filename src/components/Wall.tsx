import { usePlane } from "@react-three/cannon";
import { Mesh } from "three";

interface IProps {
  rotation: [x: number, y: number, z: number];
  position: [x: number, y: number, z: number];
  opacity: number;
  args: [number, number, number];
}

export const Wall = ({ position, rotation, opacity, args }: IProps) => {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: rotation,
    position: position,
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial transparent opacity={opacity} />
    </mesh>
  );
};
