import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import OrbitPlanet from '../3d/OrbitPlanet';

export default function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[100px]"></div>
            </div>

            {/* 3D Planet Container - Cinematic Scaling */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
                <div className="w-full h-full max-w-[1200px] max-h-[1200px]">
                    <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
                        <OrbitPlanet />
                    </Canvas>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block mb-6 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md"
                    >
                        <span className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                            Next Gen Digital Agency
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-tight text-white drop-shadow-2xl">
                        We Put Your Business <br />
                        <span className="gradient-cyan-purple text-glow-cyan inline-block mt-2">in Orbit 🚀</span>
                    </h1>

                    {/* Subtext */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Accelerate your growth with data-driven automation,
                        cutting-edge marketing, and futuristic design solutions.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <a href="#contact" className="btn-primary w-full sm:w-auto text-center cursor-pointer min-w-[180px]">
                            Start Your Journey
                        </a>
                        <a href="#services" className="btn-secondary w-full sm:w-auto text-center cursor-pointer min-w-[180px]">
                            Explore Services
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                </div>
            </motion.div>
        </section>
    );
}
