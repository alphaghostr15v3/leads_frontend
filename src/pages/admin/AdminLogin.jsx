import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Lock, Mail, AlertCircle } from 'lucide-react';
import api, { initAuth } from '../../utils/api';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Initialize CSRF
            await initAuth();

            // 2. Attempt Login
            await api.post('/login', { email, password });

            // 3. Redirect to Dashboard
            navigate('/admin');
        } catch (err) {
            if (err.response?.status === 422) {
                const messages = err.response.data.errors;
                const firstError = Object.values(messages)[0][0];
                setError(firstError);
            } else {
                setError(err.response?.data?.message || 'Connection to terminal lost. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-20 w-80 h-80 bg-primary-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-secondary-600/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
                        <LogIn className="w-8 h-8 text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-wider">
                        Admin <span className="gradient-text">Access</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-2 font-medium">Please authenticate to manage the transmission.</p>
                </div>

                <div className="glass-panel p-8 rounded-3xl border-white/5 shadow-2xl relative">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 mb-6"
                        >
                            <AlertCircle size={20} />
                            <span className="text-sm font-medium">{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Terminal</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="commander@leadorbit.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Security Key</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest group disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                            ) : (
                                <>
                                    Verify Identity
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-gray-500 text-xs">
                    &copy; 2026 Leads Orbit Digital Agency. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
