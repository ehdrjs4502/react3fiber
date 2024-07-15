import { usePlane } from "@react-three/cannon";

export const Wall = ({ position, rotation, opacity }) => {
  const [ref] = usePlane(() => ({
    rotation: rotation,
    position: position,
  }));
  return (
    <mesh ref={ref} receiveShadow castShadow={opacity === 0 ? false : true}>
      <boxGeometry args={[10, 5, 0.2]} />
      <meshStandardMaterial transparent opacity={opacity} />
    </mesh>
  );
};
