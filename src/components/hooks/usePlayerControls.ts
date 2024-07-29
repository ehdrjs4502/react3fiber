import { useEffect, useState } from "react";

interface IKeys {
  [key: string]: string;
}

const keys: IKeys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" };
const moveFieldByKey = (key: string) => keys[key];

export const usePlayerControls = () => {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false });
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e: KeyboardEvent) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return movement;
};
