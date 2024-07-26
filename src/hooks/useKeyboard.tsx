import React, { useCallback, useEffect, useState } from "react";

interface IKeyActionMap {
  [key: string]: string;
}

// key Action 종류에 따라서 반환할 값을 Map 형태로 준비
function actionByKey(key: string) {
  const keyActionMap: IKeyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
  };
  return keyActionMap[key];
}
export const useKeyboard = () => {
  // Key 입력에 대한 상태를 관리하기 위한 State
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  // Key 입력이 발생하면 해당 Key에 대응되는 actions에 state를 true로 변경
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  }, []);

  // Key 해제가 발생하면 해당 Key에 대응되는 actions에 state를 false로 변경
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  }, []);

  // Key 이벤트를 반영
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
  return actions;
};
