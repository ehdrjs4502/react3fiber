import { usePlane } from "@react-three/cannon";

export const Wall = ({ position, rotation, opacity, args }) => {
  const [ref] = usePlane(() => ({
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
