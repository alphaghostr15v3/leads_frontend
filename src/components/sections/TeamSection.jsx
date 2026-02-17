import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Download, Facebook, Instagram } from 'lucide-react';
import api, { BACKEND_URL } from '../../utils/api';

const defaultTeamMembers = [
    {
        name: 'Alex Rivera',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        bio: 'Visionary leader with 10+ years in digital transformation and AI strategy.',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Sarah Chen',
        role: 'Creative Director',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        bio: 'Award-winning designer focused on futuristic UI/UX and brand storytelling.',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Marcus Thorne',
        role: 'Lead Developer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        bio: 'Full-stack expert specializing in high-performance web applications.',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    },
    {
        name: 'Elena Vance',
        role: 'Marketing Strategist',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        bio: 'Expert at scaling digital presence and driving organic growth through data.',
        social: {
            linkedin: '#',
            twitter: '#',
            github: '#'
        }
    }
];

export default function TeamSection() {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await api.get('/team');
                if (res.data && res.data.length > 0) {
                    const mappedTeam = res.data.map(m => ({
                        name: m.name,
                        role: m.role,
                        image: m.image_url ? (m.image_url.startsWith('http') ? m.image_url : `${BACKEND_URL}${m.image_url.startsWith('/') ? '' : '/'}${m.image_url}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=random`,
                        bio: m.bio,
                        cv_url: m.cv_url,
                        social: {
                            linkedin: m.linkedin || '#',
                            twitter: m.twitter || '#',
                            github: m.github || '#',
                            facebook: m.facebook || '#',
                            instagram: m.instagram || '#'
                        }
                    }));
                    setTeamMembers(mappedTeam);
                } else {
                    setTeamMembers(defaultTeamMembers);
                }
            } catch (err) {
                console.error('Failed to fetch team members', err);
                setTeamMembers(defaultTeamMembers);
            }
        };
        fetchTeam();
    }, []);

    return (
        <section id="team" className="section-padding relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-accent-400 font-medium tracking-wider uppercase mb-2 block">Our Crew</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        <span className="gradient-text">Meet the Pioneers</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        The brilliant minds behind Leads Orbit, dedicated to launching your business into the future.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="glass-card group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="relative overflow-hidden aspect-[4/5]">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="flex justify-center gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary-500 transition-colors">
                                            <Linkedin size={20} />
                                        </a>
                                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary-500 transition-colors">
                                            <Twitter size={20} />
                                        </a>
                                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary-500 transition-colors">
                                            <Github size={20} />
                                        </a>
                                        <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary-500 transition-colors">
                                            <Facebook size={20} />
                                        </a>
                                        <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary-500 transition-colors">
                                            <Instagram size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-accent-400 transition-colors">
                                        {member.name}
                                    </h3>
                                    {member.cv_url && (
                                        <a
                                            href={member.cv_url.startsWith('http') ? member.cv_url : `${BACKEND_URL}${member.cv_url.startsWith('/') ? '' : '/'}${member.cv_url}`}
                                            download
                                            className="p-2 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg transition-colors"
                                            title="Download CV"
                                        >
                                            <Download size={18} className="text-primary-400" />
                                        </a>
                                    )}
                                </div>
                                <p className="text-primary-400 text-sm font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
