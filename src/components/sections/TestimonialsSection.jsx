import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const defaultTestimonials = [
    {
        name: 'Sarah Connor',
        role: 'CEO, TechFlow',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
        quote: 'Leads Orbit transformed our digital presence. Our conversion rates tripled within months.',
        stars: 5,
    },
    {
        name: 'Michael Ross',
        role: 'Founder, NextGen',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
        quote: 'The automation solutions they implemented saved us countless hours. Truly futuristic service.',
        stars: 5,
    },
    {
        name: 'Elena Rodriguez',
        role: 'Marketing Dir, SkyHigh',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
        quote: 'Their design team is out of this world. Our new brand identity is stunning and effective.',
        stars: 5,
    },
];

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await api.get('/testimonials');
                if (res.data.length > 0) {
                    setTestimonials(res.data.map(t => ({
                        name: t.client_name,
                        role: t.company || 'Direct Client',
                        image: t.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.client_name)}&background=random`,
                        quote: t.feedback,
                        stars: t.rating || 5
                    })));
                } else {
                    setTestimonials(defaultTestimonials);
                }
            } catch (err) {
                console.error('Failed to fetch testimonials', err);
                setTestimonials(defaultTestimonials);
            }
        };
        fetchTestimonials();
    }, []);
    return (
        <section id="testimonials" className="section-padding relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-secondary-400 font-medium tracking-wider uppercase mb-2 block">Testimonials</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        <span className="gradient-text">Client Stories</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-8 flex flex-col"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="flex items-center mb-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full border-2 border-primary-500 p-0.5 object-cover"
                                />
                                <div className="ml-4">
                                    <h4 className="text-white font-semibold font-heading">{testimonial.name}</h4>
                                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                {[...Array(testimonial.stars)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-sm">★</span>
                                ))}
                            </div>

                            <p className="text-gray-300 italic flex-grow">"{testimonial.quote}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
