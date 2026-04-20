import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface ShoeProps {
  color: string;
  scrollProgress: MotionValue<number>;
}

function Shoe({ color, scrollProgress }: ShoeProps) {
  const { scene } = useGLTF('/shoe.glb');
  const group = useRef<THREE.Group>(null);
  
  const shoeMeshes = useMemo(() => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        meshes.push(child as THREE.Mesh);
        const m = child as THREE.Mesh;
        if (m.material) {
          (m.material as THREE.MeshStandardMaterial).envMapIntensity = 1.5;
        }
      }
    });
    return meshes;
  }, [scene]);

  const baseColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame(() => {
    const p = scrollProgress.get();
    
    // Color reactivity
    shoeMeshes.forEach((mesh) => {
      if (mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial;
        const targetColor = baseColor.clone();
        if (p > 0) targetColor.offsetHSL(0, p * 0.05, p * 0.02);
        material.color.lerp(targetColor, 0.05);
      }
    });
  });

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={scene} 
        rotation={[-Math.PI / 2, -Math.PI / 6, 0]} 
      />
    </group>
  );
}

export default function ShoeViewer({ color, scrollProgress }: ShoeProps) {
  return (
    <div className="w-full h-full min-h-[500px] bg-secondary-bg relative group cursor-crosshair">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        camera={{ position: [10, 5, 10], fov: 35 }}
      >
        <color attach="background" args={['#1a1a1a']} />
        <Suspense fallback={null}>
          <Stage 
            environment="studio" 
            intensity={0.5} 
            contactShadow={{ opacity: 0.5, blur: 2 }} 
            adjustCamera={true}
          >
            <Shoe color={color} scrollProgress={scrollProgress} />
          </Stage>
        </Suspense>

        {/* Blender Style Viewport Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.75}
          // Blender Mappings: 
          // Left: Rotate, Middle: Rotate, Right: Pan
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.ROTATE,
            RIGHT: THREE.MOUSE.PAN
          }}
        />
      </Canvas>
      
      {/* Workstation HUD */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none">
        <div className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold">Viewport Active</div>
        <div className="text-[9px] text-text-secondary uppercase tracking-[0.1em] font-mono opacity-60">Model: ikarisshoes_V1.glb</div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-2 text-[9px] text-text-secondary font-mono uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
          <span className="text-accent underline underline-offset-4">Left/MMB</span> Orbit
        </div>
        <div className="flex items-center gap-2 text-[9px] text-text-secondary font-mono uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
          <span className="text-accent underline underline-offset-4">Right/Shift</span> Pan
        </div>
        <div className="flex items-center gap-2 text-[9px] text-text-secondary font-mono uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
          <span className="text-accent underline underline-offset-4">Scroll</span> Zoom
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

// Preload the model
useGLTF.preload('/shoe.glb');

