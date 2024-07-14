import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export const Box = (props) => {
  const ref = useRef();
  const [color, setColor] = useState(0);
  useFrame(() => {
    if (ref) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
      const c = (Math.sin(color) + 1) / 2;
      ref.current.material.color.setRGB(c, 0, 1 - c);
      setColor(color + 0.01);
    }
  });

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry />
      <meshBasicMaterial />
    </mesh>
  );
};
