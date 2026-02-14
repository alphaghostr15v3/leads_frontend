import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Mail, Phone, Calendar, User, Tag, MessageSquare, X, ChevronRight } from 'lucide-react';
import api from '../../utils/api';

const ManageLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await api.get('/admin/leads');
            setLeads(res.data);
        } catch (err) {
            console.error('Failed to fetch leads', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await api.delete(`/admin/leads/${id}`);
                setLeads(leads.filter(l => l.id !== id));
                if (selectedLead?.id === id) setSelectedLead(null);
            } catch (err) {
                console.error('Failed to delete lead', err);
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-heading font-bold uppercase tracking-tighter">Inquiries</h2>
                    <p className="text-gray-400">Review and manage incoming leads from your contact form.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400">
                    <span className="text-primary-400 font-bold">{leads.length}</span> Total Submissions
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-250px)]">
                {/* List View */}
                <div className="lg:col-span-1 glass-panel rounded-3xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-white/10 bg-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Recent Signals</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Scanning for signals...</div>
                        ) : leads.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No signals detected yet.</div>
                        ) : leads.map((lead) => (
                            <motion.div
                                key={lead.id}
                                layoutId={`lead-${lead.id}`}
                                onClick={() => setSelectedLead(lead)}
                                className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedLead?.id === lead.id
                                        ? 'bg-primary-500/10 border-primary-500/30'
                                        : 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-bold text-white truncate max-w-[150px]">{lead.name}</div>
                                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                        <Calendar size={10} />
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="text-xs text-primary-400 font-medium truncate mb-2">{lead.subject || 'No Subject'}</div>
                                <div className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                                    {lead.message}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden flex flex-col relative">
                    <AnimatePresence mode="wait">
                        {selectedLead ? (
                            <motion.div
                                key={selectedLead.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="h-full flex flex-col"
                            >
                                <div className="p-8 border-b border-white/10 flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-3 bg-primary-500/10 rounded-2xl text-primary-400">
                                                <User size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">{selectedLead.name}</h3>
                                                <p className="text-gray-400 flex items-center gap-2 text-sm">
                                                    <Mail size={14} className="text-primary-400" />
                                                    {selectedLead.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => handleDelete(selectedLead.id, e)}
                                        className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                                        title="Delete Inquiry"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Subject</span>
                                            <div className="flex items-center gap-2 text-white bg-white/5 border border-white/10 p-3 rounded-xl">
                                                <Tag size={16} className="text-accent-400" />
                                                {selectedLead.subject || 'Not specified'}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Contact Number</span>
                                            <div className="flex items-center gap-2 text-white bg-white/5 border border-white/10 p-3 rounded-xl">
                                                <Phone size={16} className="text-secondary-400" />
                                                {selectedLead.phone || 'Not provided'}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Received At</span>
                                            <div className="flex items-center gap-2 text-white bg-white/5 border border-white/10 p-3 rounded-xl">
                                                <Calendar size={16} className="text-primary-400" />
                                                {formatDate(selectedLead.created_at)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare size={16} className="text-primary-400" />
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Message Transmission</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                                            {selectedLead.message}
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <a
                                            href={`mailto:${selectedLead.email}?subject=Re: ${selectedLead.subject || 'Your inquiry to Leads Orbit'}`}
                                            className="btn-primary inline-flex items-center gap-2"
                                        >
                                            <Mail size={18} />
                                            Compose Response
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-600 mb-6 border border-white/10">
                                    <ChevronRight size={40} />
                                </div>
                                <h4 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-widest">Select a Transmission</h4>
                                <p className="text-gray-500 max-w-xs">Click on an inquiry from the list to view the full details and respond.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ManageLeads;
