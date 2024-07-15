import { useBox } from "@react-three/cannon"; // Cannon 물리 엔진에서 상자 형태의 물리 객체를 생성하는 훅
import { useGLTF } from "@react-three/drei"; // GLTF 모델을 로드하기 위한 훅
import { useEffect, useMemo } from "react"; // React 훅

export const Dice = ({ gauge, position }) => {
  // GLTF 파일에서 주사위 모델을 로드
  const { scene } = useGLTF("/dice/scene.gltf");

  // GLTF 모델을 복제하여 사용할 수 있도록 메모이제이션
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  // Cannon 물리 엔진에서 상자 형태의 물리 객체를 생성
  const [ref, api] = useBox(() => ({
    mass: 10, // 주사위의 질량
    position: position, // 주사위의 초기 위치
    args: [1, 1, 1], // 주사위의 크기
    friction: 0.2, // 마찰 계수
    restitution: 0.7, // 반발 계수
  }));

  // 컴포넌트가 마운트된 후 주사위에 힘을 가함
  useEffect(() => {
    api.applyImpulse([-gauge, gauge, 0], [0, 0.7, 0.3]);
  }, [api, gauge]);

  // 각 메쉬에 그림자 속성 추가
  useEffect(() => {
    if (copiedScene) {
      copiedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [copiedScene]);

  return (
    // 주사위 모델을 물리 엔진의 상자와 함께 그룹화하여 렌더링
    <group ref={ref} scale={[0.05, 0.05, 0.05]}>
      <primitive object={copiedScene} />
    </group>
  );
};
