import { useSphere } from "@react-three/cannon";

export const Sphere = ({ size }) => {
  const colors = ["red", "yellow", "blue"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const [ref, api] = useSphere(() => ({
    mass: 10,
    position: [Math.random() * 2 - 1, 6, Math.random() * 2 - 1],
    args: [size],
    friction: 0.2,
    restitution: 0.7,
  }));

  const handleClick = () => {
    api.applyImpulse([-2, 100, 0], [0, 0, 0]);
  };

  return (
    <mesh ref={ref} onClick={handleClick}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={randomColor} />
    </mesh>
  );
};
