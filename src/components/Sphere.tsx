import { useSphere } from "@react-three/cannon";
import { Mesh } from "three";

interface IProps {
  size: number;
}

export const Sphere = ({ size }: IProps) => {
  const colors = ["red", "yellow", "blue"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 10,
    position: [Math.random() * 2 - 1, 6, Math.random() * 2 - 1],
    args: [size],
    friction: 0.2,
    restitution: 0.7,
  }));

  const handleClick = () => {
    api.applyImpulse([-30, 100, 0], [0, 0, 0]);
  };

  return (
    <mesh ref={ref} onClick={handleClick}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={randomColor} />
    </mesh>
  );
};
