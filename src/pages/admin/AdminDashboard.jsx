import React from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Visits', count: '12.4k', change: '+12%', color: 'from-blue-500 to-cyan-500' },
        { label: 'New Leads', count: '48', change: '+8%', color: 'from-purple-500 to-pink-500' },
        { label: 'Portfolio Hits', count: '2.1k', change: '+22%', color: 'from-orange-500 to-red-500' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold">Workspace Overview</h2>
                <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className={`h-1 w-12 bg-gradient-to-r ${stat.color} rounded-full mb-4`}></div>
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-3xl font-heading font-bold">{stat.count}</h3>
                            <span className="text-emerald-400 text-sm font-medium pb-1">{stat.change}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
                <div className="glass-card p-8">
                    <h3 className="text-xl font-heading font-bold mb-6">Recent Enquiries</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors">
                                <div>
                                    <h4 className="font-medium text-primary-400">Potential Client {i}</h4>
                                    <p className="text-sm text-gray-400">Interested in Web Development</p>
                                </div>
                                <span className="text-xs text-gray-500">2h ago</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
