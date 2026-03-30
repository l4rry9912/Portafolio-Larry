// @ts-nocheck
/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

/** Debe coincidir con la escala visual del grupo de la tarjeta en `Band`. */
const CARD_VISUAL_SCALE = 2.62;
const CARD_SCALE_REFERENCE = 2.25;
/** Sube el enganche de la cuerda hacia el clip/sostén (espacio local del rigidbody de la tarjeta). */
const ROPE_ATTACH_LIFT = 0.48;

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  interactive?: boolean;
};

function useViewportWidth(): number {
  const [w, setW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1024));
  useEffect(() => {
    let tid: number;
    const onResize = () => {
      window.clearTimeout(tid);
      tid = window.setTimeout(() => setW(window.innerWidth), 80);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.clearTimeout(tid);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return w;
}

/** Pantallas grandes: DPR 2 + física estable rinden fatal; capamos el DPR base (AdaptiveDpr baja más si hace falta). */
function lanyardDprMax(cssWidth: number): number {
  const raw = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  if (cssWidth >= 1400) return Math.min(raw, 1);
  if (cssWidth >= 1024) return Math.min(raw, 1.15);
  return Math.min(raw, 1.4);
}

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  interactive = true,
}: LanyardProps) {
  const viewportWidth = useViewportWidth();
  const isMobile = viewportWidth < 768;
  const dprMax = lanyardDprMax(viewportWidth);
  const envRes = viewportWidth >= 1200 ? 256 : viewportWidth >= 768 ? 192 : 128;

  return (
    <div
      className={`relative z-0 flex h-full w-full touch-none items-center justify-center ${
        interactive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <Canvas
        camera={{ position, fov }}
        dpr={[1, dprMax]}
        resize={{ debounce: 0, scroll: false, offsetSize: true }}
        gl={{
          alpha: transparent,
          antialias: viewportWidth < 1024,
          powerPreference: 'high-performance',
          stencil: false,
          logarithmicDepthBuffer: true,
          premultipliedAlpha: false,
        }}
        style={{
          pointerEvents: interactive ? 'auto' : 'none',
          touchAction: interactive ? 'none' : 'auto',
        }}
        onCreated={({ gl }) => {
          gl.domElement.style.touchAction = interactive ? 'none' : 'auto';
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
        }}
      >
        <AdaptiveDpr />
        <ambientLight intensity={0.55 * Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60} interpolate>
          <Band isMobile={isMobile} maxSpeed={isMobile ? 32 : 48} minSpeed={isMobile ? 8 : 10} />
        </Physics>
        <Environment
          blur={isMobile ? 0.42 : 0.3}
          environmentIntensity={isMobile ? 0.95 : 1.05}
          resolution={envRes}
        >
          <Lightformer intensity={2.4} color="#ffffff" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[120, 0.12, 1]} />
          <Lightformer intensity={3.5} color="#e8f4ff" position={[-1.2, -0.5, 2]} rotation={[0, 0.2, Math.PI / 3]} scale={[120, 0.12, 1]} />
          <Lightformer intensity={3.2} color="#fff5eb" position={[1.2, 0.8, 2.5]} rotation={[0, -0.15, Math.PI / 3]} scale={[120, 0.12, 1]} />
          <Lightformer intensity={1.8} color="#a8c8ff" position={[0, 2.5, -4]} rotation={[Math.PI / 2, 0, 0]} scale={[80, 0.12, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

/**
 * Grosor de cuerda (px de pantalla): escala con viewport y con el tamaño de la tarjeta
 * para que no se vea demasiado fina junto a la tarjeta grande.
 */
function ropeLineWidth(screenW: number, screenH: number): number {
  const minDim = Math.min(screenW, screenH);
  const maxDim = Math.max(screenW, screenH);
  const aspect = maxDim / Math.max(minDim, 1);
  const base = 0.74 + (minDim / 860) * 0.42;
  const portraitBoost = aspect > 1.35 ? 0.07 : 0;
  const cardBoost = CARD_VISUAL_SCALE / CARD_SCALE_REFERENCE;
  const w = (base + portraitBoost) * THREE.MathUtils.lerp(1, 1.14, THREE.MathUtils.clamp((cardBoost - 1) / 0.45, 0, 1));
  return THREE.MathUtils.clamp(w, 0.8, 1.2);
}

function Band({ maxSpeed = 50, minSpeed = 10 }: { maxSpeed?: number; minSpeed?: number }) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  };

  const { nodes, materials } = useGLTF('/imagenes/card.glb') as any;
  const texture = useTexture('/imagenes/lanyard.png');
  const { width, height } = useThree((state) => state.size);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const releasePointer = (e: any) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (e?.target?.releasePointerCapture && e?.pointerId != null) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
    drag(false);
    hover(false);
  };

  const startDrag = (e: any) => {
    if (e.stopPropagation) e.stopPropagation();
    if (e.target?.setPointerCapture && e.pointerId != null) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
    drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={releasePointer}
            onPointerDown={startDrag}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
