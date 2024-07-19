import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

interface IProps {
  gauge: number;
  position: [x: number, y: number, z: number];
  setResults: React.Dispatch<React.SetStateAction<number[]>>;
}

export const Dice = ({ gauge, position, setResults }: IProps) => {
  const { scene } = useGLTF("/dice/scene.gltf");

  const copiedScene = useMemo(() => scene.clone(), [scene]);
  const [ref, api] = useBox<THREE.Mesh>(() => ({
    mass: 10,
    position: position,
    // args: [1, 1, 1],

    friction: 0.2,
    restitution: 0.7,
  }));

  useEffect(() => {
    const rad = Math.random() * Math.PI * 2;
    const x = Math.cos(rad) * gauge;
    const z = Math.sin(rad) * gauge;
    api.applyImpulse([x, 150, z], [0, 0, 0]);
    api.applyImpulse([0, Math.random() * 5, 0], [x, 0, z]);
  }, [api, gauge]);

  useEffect(() => {
    if (copiedScene) {
      copiedScene.traverse((child) => {
        child.castShadow = true;
      });
    }
  }, [copiedScene]);

  const calculateFacePositions = () => {
    // 각 면의 위치를 저장할 배열 초기화
    const facePositions: THREE.Vector3[] = [];

    // 각 면의 법선 벡터 정의
    const faceNormals = [
      new THREE.Vector3(0, 0, 1), // 앞면
      new THREE.Vector3(0, 0, -1), // 뒷면
      new THREE.Vector3(1, 0, 0), // 오른쪽 면
      new THREE.Vector3(-1, 0, 0), // 왼쪽 면
      new THREE.Vector3(0, 1, 0), // 윗면
      new THREE.Vector3(0, -1, 0), // 아랫면
    ];

    // 객체의 현재 회전을 나타내는 쿼터니언 가져오기
    const quaternion = new THREE.Quaternion();
    ref!.current!.getWorldQuaternion(quaternion);

    // 각 법선 벡터에 대해 반복하여 면의 위치 계산
    faceNormals.forEach((normal) => {
      // 법선 벡터를 회전시킴
      const rotatedNormal = normal.clone().applyQuaternion(quaternion);

      // 객체의 위치에 회전된 법선 벡터를 더하여 면의 위치 계산
      const facePosition = new THREE.Vector3().copy(ref!.current!.position).add(rotatedNormal);

      // 계산된 면의 위치를 배열에 추가
      facePositions.push(facePosition);
    });

    // 면의 위치 배열 반환
    return facePositions;
  };

  const handleSleep = () => {
    const diceScale: { [key: number]: number } = {
      0: 1,
      1: 6,
      2: 2,
      3: 5,
      4: 4,
      5: 3,
    };
    const facePositions = calculateFacePositions();
    let maxY = -Infinity;
    let maxIndex = -1;

    facePositions.forEach((item, index) => {
      if (item.y > maxY) {
        maxY = item.y;
        maxIndex = index;
      }
    });

    setResults((result) => [...result, diceScale[maxIndex]]);

    console.log("눈금:", diceScale[maxIndex]);
  };

  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe((v) => {
      if (v.every((value) => Math.abs(value) < 0.01)) {
        handleSleep();
        unsubscribeVelocity(); // Unsubscribe to prevent the loop
      }
    });
  }, [api]);

  useEffect(() => {
    if (scene) {
      // 바운딩 박스 생성
      const box = new THREE.Box3().setFromObject(scene);

      // 바운딩 박스 크기 계산
      const size = new THREE.Vector3();
      box.getSize(size);

      console.log("Model size:", size);
    }
  }, [scene]);

  return <primitive object={copiedScene} ref={ref} scale={[0.05, 0.05, 0.05]} />;
};
