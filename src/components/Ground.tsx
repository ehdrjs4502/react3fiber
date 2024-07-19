import { usePlane } from "@react-three/cannon";
import { Mesh } from "three";

interface IProps {
  rotation: [x: number, y: number, z: number];
  position: [x: number, y: number, z: number];
  args: [number, number];
}

export const Ground = ({ rotation, position, args }: IProps) => {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: rotation,
    position: position,
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={args} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
