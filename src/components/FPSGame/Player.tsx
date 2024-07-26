import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { useKeyboard } from "../../hooks/useKeyboard";

export const Player = () => {
  const { camera } = useThree();
  const [ref, api] = useSphere<THREE.Mesh>(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard();
  const cameraRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      (camera as THREE.PerspectiveCamera).fov = 50; // 원하는 FOV 값 설정
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix(); // 변경된 FOV 값을 적용
    }
    console.log(camera);
  }, [camera]);

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cameraRotation.current.y -= e.movementX * 0.002;
    cameraRotation.current.x -= e.movementY * 0.002;
    cameraRotation.current.x = Math.max(Math.min(cameraRotation.current.x, Math.PI / 2), -Math.PI / 2); // 제한
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useFrame(() => {
    // 카메라 위치를 현재 pos 상태로 업데이트
    camera.position.copy(new THREE.Vector3(pos.current[0], pos.current[1], pos.current[2]));

    const direction = new THREE.Vector3();

    // z(정면)축 기준으로 이동 계산
    // 만약 앞+뒤가 동시에 눌리면 -를 통해 값을 0으로 만들어 이동하지 않음
    const frontVector = new THREE.Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));

    // x축 기준 이동 계산
    const sideVector = new THREE.Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(5).applyEuler(camera.rotation);

    // 이동 속도를 반영
    api.velocity.set(direction.x, vel.current[1], direction.z);

    // 카메라 회전 적용
    camera.rotation.set(cameraRotation.current.x, cameraRotation.current.y, 0);

    // jump 액션이 활성화된 경우 속도를 변경
    if (jump) {
      api.velocity.set(vel.current[0], 5, vel.current[2]);
    }
  });
  return <mesh ref={ref}></mesh>;
};
