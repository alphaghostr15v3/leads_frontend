import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const defaultPosts = [
    {
        id: 'db1',
        title: 'The Future of AI in Marketing',
        excerpt: 'Discover how artificial intelligence is reshaping the landscape of digital growth.',
        featured_image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
        created_at: new Date().toISOString()
    },
    {
        id: 'db2',
        title: 'Building High-Performance Web Apps',
        excerpt: 'Key strategies for creating fast, responsive, and futuristic web experiences.',
        featured_image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
        created_at: new Date().toISOString()
    },
];

export default function BlogSection() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/blog');
                setPosts(res.data.length > 0 ? res.data : defaultPosts);
            } catch (err) {
                console.error('Failed to fetch blog posts', err);
                setPosts(defaultPosts);
            }
        };
        fetchPosts();
    }, []);

    return (
        <section id="blog" className="section-padding bg-dark-900/30">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary-400 font-medium tracking-wider uppercase mb-2 block">Insights</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        <span className="gradient-text">Latest From Orbit</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.slice(0, 3).map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="glass-card overflow-hidden group flex flex-col h-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80'}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary-500/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                                        Update
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="text-xs text-gray-500 mb-2">{new Date(post.created_at).toLocaleDateString()}</div>
                                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2 uppercase">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto">
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="text-primary-400 text-sm font-bold flex items-center gap-2 group/btn"
                                    >
                                        Read Transmission
                                        <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
