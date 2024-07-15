import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

export const Dice = ({ gauge, position }) => {
  const { scene } = useGLTF("/dice/scene.gltf");

  const copiedScene = useMemo(() => scene.clone(), [scene]);
  const [ref, api] = useBox(() => ({
    mass: 10,
    position: position,
    args: [1, 1, 1],
    friction: 0.2,
    restitution: 0.7,
  }));

  useEffect(() => {
    api.applyImpulse([-gauge, gauge, 0], [0, 0.7, 0.3]);
  }, [api]);

  return (
    <group ref={ref} scale={[0.05, 0.05, 0.05]}>
      <primitive object={copiedScene} />
    </group>
  );
};
