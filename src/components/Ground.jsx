import { usePlane } from "@react-three/cannon";

export const Ground = ({ rotation, position, args }) => {
  const [ref] = usePlane(() => ({
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
