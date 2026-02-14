import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring, MeshDistortMaterial, Stars, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

function Rocket() {
    const rocketRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Orbit path parameters
        const x = Math.sin(t * 0.5) * 3.5;
        const z = Math.cos(t * 0.5) * 3.5;
        const y = Math.sin(t * 0.5) * 1.5; // Up and down motion

        if (rocketRef.current) {
            rocketRef.current.position.set(x, y, z);
            // orient rocket along tangent
            rocketRef.current.lookAt(
                Math.sin((t + 0.1) * 0.5) * 3.5,
                Math.sin((t + 0.1) * 0.5) * 1.5,
                Math.cos((t + 0.1) * 0.5) * 3.5
            );
        }
    });

    return (
        <group ref={rocketRef}>
            <Trail
                width={2}
                length={8}
                color={new THREE.Color("#0ea5e9")}
                attenuation={(t) => t * t}
            >
                <mesh rotation={[0, 0, -Math.PI / 2]}>
                    <coneGeometry args={[0.1, 0.4, 8]} />
                    <meshStandardMaterial color="white" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
            </Trail>
            {/* Engine glow */}
            <pointLight distance={1} decay={2} color="#0ea5e9" intensity={2} />
        </group>
    );
}

export default function OrbitPlanet() {
    const planetRef = useRef();
    const ring1Ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (planetRef.current) {
            planetRef.current.rotation.y = t * 0.05;
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = t * 0.1;
            ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
        }
    });

    return (
        <group>
            {/* Deep Space Background */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Main Holographic Planet */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Sphere ref={planetRef} args={[1.2, 64, 64]}>
                    <MeshDistortMaterial
                        color="#1e1b4b" // Dark Navy
                        emissive="#3b82f6" // Blue Glow
                        emissiveIntensity={0.2}
                        distort={0.4}
                        speed={2}
                        roughness={0.1}
                        metalness={1}
                        wireframe={false}
                    />
                </Sphere>
            </Float>

            {/* Neon Blue Orbital Ring */}
            <Ring ref={ring1Ref} args={[3.4, 3.45, 128]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color="#0ea5e9"
                    emissive="#0ea5e9"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </Ring>

            {/* Secondary Faint Ring */}
            <Ring args={[2.8, 2.82, 128]} rotation={[Math.PI / 1.8, 0, 0]}>
                <meshStandardMaterial
                    color="#a855f7"
                    emissive="#a855f7"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.4}
                />
            </Ring>

            {/* The Rocket */}
            <Rocket />

            {/* Particle Field (Subtle) */}
            <points>
                <sphereGeometry args={[6, 32, 32]} />
                <pointsMaterial color="#0ea5e9" size={0.02} transparent opacity={0.4} />
            </points>

            {/* Scene Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
            <pointLight position={[-10, -5, -10]} intensity={1} color="#a855f7" />
        </group>
    );
}
