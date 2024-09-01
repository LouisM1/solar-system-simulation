"use client";

import React from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import { Mesh, TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

interface PlanetProps extends MeshProps {
  size: number;
  color?: string;
  texture?: string;
}

const Planet: React.FC<PlanetProps> = ({ size, color, texture, ...props }) => {
  const mesh = React.useRef<Mesh>(null!);
  const planetTexture = texture ? useLoader(TextureLoader, texture) : null;

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry args={[size, 32, 32]} />
      {planetTexture ? (
        <meshStandardMaterial map={planetTexture} />
      ) : (
        <meshStandardMaterial color={color} />
      )}
    </mesh>
  );
};

export default Planet;