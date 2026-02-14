import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';

const defaultProjects = [
    {
        id: 'd1',
        title: 'Neon Commerce',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        description: 'Futuristic e-commerce platform with 3D product previews.',
    },
    {
        id: 'd2',
        title: 'Cyber Security',
        category: 'Graphic Design',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        description: 'Brand identity and UI kit for a next-gen security firm.',
    },
    {
        id: 'd3',
        title: 'Tech Promo',
        category: 'Video Editing',
        image: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?w=800&q=80',
        description: 'High-energy promotional video for a tech startup launch.',
    },
];

const categories = ['All', 'Web Development', 'Video Editing', 'Graphic Design'];

export default function PortfolioSection() {
    const [projects, setProjects] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await api.get('/portfolio');
                if (res.data.length > 0) {
                    setProjects(res.data.map(item => ({
                        ...item,
                        image: item.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
                    })));
                } else {
                    setProjects(defaultProjects);
                }
            } catch (err) {
                console.error('Failed to fetch portfolio', err);
                setProjects(defaultProjects);
            }
        };
        fetchPortfolio();
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="portfolio" className="section-padding">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary-400 font-medium tracking-wider uppercase mb-2 block">Our Work</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                        <span className="gradient-text">Featured Projects</span>
                    </h2>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-primary-600 text-white shadow-glow-blue'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => project.project_url && window.open(project.project_url, '_blank')}
                                className={`group relative overflow-hidden rounded-2xl aspect-[4/3] ${project.project_url ? 'cursor-pointer' : 'cursor-default'}`}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="absolute top-4 right-4 bg-primary-500/20 backdrop-blur-md p-2 rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                                            <path d="M15 3h6v6"></path>
                                            <path d="M10 14 21 3"></path>
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        </svg>
                                    </div>
                                    <span className="text-primary-400 text-sm font-medium mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="text-center mt-12">
                    <button className="btn-secondary">
                        View All Projects
                    </button>
                </div>
            </div>
        </section>
    );
}
