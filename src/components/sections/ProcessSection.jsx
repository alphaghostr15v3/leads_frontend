import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Discover',
        description: 'We dive deep into your business goals, audience, and market position.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        number: '02',
        title: 'Plan',
        description: 'Creating a strategic roadmap tailored to your specific objectives.',
        color: 'from-purple-500 to-pink-500'
    },
    {
        number: '03',
        title: 'Build',
        description: 'Developing high-performance solutions with cutting-edge technology.',
        color: 'from-orange-500 to-red-500'
    },
    {
        number: '04',
        title: 'Automate',
        description: 'Implementing AI-driven automation to streamline your operations.',
        color: 'from-emerald-500 to-teal-500'
    },
    {
        number: '05',
        title: 'Grow',
        description: 'Launching campaigns that drive traffic, leads, and revenue.',
        color: 'from-indigo-500 to-violet-500'
    },
];

export default function ProcessSection() {
    return (
        <section id="process" className="section-padding relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary-400 font-medium tracking-wider uppercase mb-2 block">How We Work</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        <span className="gradient-text">Our Process</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A proven methodology to transform your digital presence from concept to reality.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="relative z-10"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                            >
                                <div className="glass-card p-6 text-center h-full hover:-translate-y-2 transition-transform duration-300">
                                    <div className="relative inline-block mb-4">
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} p-[2px]`}>
                                            <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                                                <span className="text-xl font-bold text-white">{step.number}</span>
                                            </div>
                                        </div>
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} blur-lg opacity-40`}></div>
                                    </div>

                                    <h3 className="text-xl font-heading font-semibold mb-3 text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
