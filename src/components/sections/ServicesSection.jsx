import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const defaultServices = [
    {
        title: 'Business Growth',
        description: 'Data-driven strategies to accelerate your market presence.',
        icon: '📈',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Automation',
        description: 'Streamline operations with AI-powered workflow automation.',
        icon: '🤖',
        color: 'from-purple-500 to-pink-500'
    },
    {
        title: 'Social Media',
        description: 'Engage audiences and build brand loyalty across all platforms.',
        icon: '📱',
        color: 'from-orange-500 to-red-500'
    },
    {
        title: 'Web Development',
        description: 'High-performance, futuristic websites built with modern tech.',
        icon: '💻',
        color: 'from-emerald-500 to-teal-500'
    },
    {
        title: 'Video Editing',
        description: 'Professional production to tell your brand story visually.',
        icon: '🎬',
        color: 'from-indigo-500 to-violet-500'
    },
    {
        title: 'Graphic Design',
        description: 'Eye-catching visuals and identity that make you stand out.',
        icon: '🎨',
        color: 'from-rose-500 to-pink-500'
    },
];

export default function ServicesSection() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data.length > 0 ? res.data : defaultServices);
            } catch (err) {
                console.error('Failed to fetch services', err);
                setServices(defaultServices);
            }
        };
        fetchServices();
    }, []);
    return (
        <section id="services" className="section-padding relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary-400 font-medium tracking-wider uppercase mb-2 block">What We Do</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        <span className="gradient-text">Our Services</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Comprehensive digital solutions designed to launch your business into the stratosphere.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-8 group cursor-pointer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="relative mb-6">
                                <div className={`absolute -inset-4 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-full`}></div>
                                <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10">
                                    {service.icon}
                                </div>
                            </div>

                            <h3 className="text-2xl font-heading font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                {service.description}
                            </p>

                            <div className="mt-6 flex items-center text-sm font-medium text-primary-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                Learn More <span className="ml-2">→</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
