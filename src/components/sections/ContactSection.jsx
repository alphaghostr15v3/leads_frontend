import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

export default function ContactSection() {
    const [focusedField, setFocusedField] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            await api.post('/leads', form);
            setStatus({ type: 'success', message: 'Transmission received! Our team will contact you soon.' });
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            console.error('Lead submission failed', err);
            setStatus({ type: 'error', message: 'Signal lost. Please try again or email us directly.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-accent-400 font-medium tracking-wider uppercase mb-2 block">Get in Touch</span>
                    <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                        Ready to <br />
                        <span className="gradient-text">Launch? 🚀</span>
                    </h2>
                    <p className="text-lg text-gray-400 mb-8 max-w-md">
                        Let's discuss how we can help your business reach new heights with our digital solutions.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary-400 mr-4">
                                ✉️
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email Us</p>
                                <p className="text-white font-medium">hello@leadsorbit.com</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary-400 mr-4">
                                📍
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Visit Us</p>
                                <p className="text-white font-medium">123 Galaxy Avenue, Space City</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-card p-8 md:p-10"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label
                                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || form.name
                                        ? '-top-2.5 text-xs bg-dark-900 px-2 text-primary-400'
                                        : 'top-3.5 text-gray-500'
                                        }`}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={(e) => !e.target.value && setFocusedField(null)}
                                    className="w-full bg-dark-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label
                                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || form.email
                                        ? '-top-2.5 text-xs bg-dark-900 px-2 text-primary-400'
                                        : 'top-3.5 text-gray-500'
                                        }`}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={(e) => !e.target.value && setFocusedField(null)}
                                    className="w-full bg-dark-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label
                                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'subject' || form.subject
                                        ? '-top-2.5 text-xs bg-dark-900 px-2 text-primary-400'
                                        : 'top-3.5 text-gray-500'
                                        }`}
                                >
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    value={form.subject}
                                    onChange={e => setForm({ ...form, subject: e.target.value })}
                                    onFocus={() => setFocusedField('subject')}
                                    onBlur={(e) => !e.target.value && setFocusedField(null)}
                                    className="w-full bg-dark-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none"
                                    required
                                >
                                    <option value=""></option>
                                    <option value="growth">Business Growth</option>
                                    <option value="web">Web Development</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="relative">
                                <label
                                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'phone' || form.phone
                                        ? '-top-2.5 text-xs bg-dark-900 px-2 text-primary-400'
                                        : 'top-3.5 text-gray-500'
                                        }`}
                                >
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                    onFocus={() => setFocusedField('phone')}
                                    onBlur={(e) => !e.target.value && setFocusedField(null)}
                                    className="w-full bg-dark-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label
                                className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || form.message
                                    ? '-top-2.5 text-xs bg-dark-900 px-2 text-primary-400'
                                    : 'top-3.5 text-gray-500'
                                    }`}
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })}
                                onFocus={() => setFocusedField('message')}
                                onBlur={(e) => !e.target.value && setFocusedField(null)}
                                className="w-full bg-dark-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                required
                            ></textarea>
                        </div>

                        {status.message && (
                            <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary w-full group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">{isSubmitting ? 'Launching...' : 'Send Message'}</span>
                            {!isSubmitting && <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
