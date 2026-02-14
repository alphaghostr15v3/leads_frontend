import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import api from '../../utils/api';

const ManageBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: '', excerpt: '', content: '', featured_image: '', category: '' });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get('/blog');
            setPosts(res.data);
        } catch (err) {
            console.error('Failed to fetch posts', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/admin/blog/${editingId}`, form);
            } else {
                await api.post('/admin/blog', form);
            }
            handleCloseModal();
            fetchPosts();
        } catch (err) {
            console.error('Failed to save blog post', err);
        }
    };

    const handleEdit = (post) => {
        setEditingId(post.id);
        setForm({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content || '',
            featured_image: post.featured_image || '',
            category: post.category || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/admin/blog/${id}`);
                fetchPosts();
            } catch (err) {
                console.error('Failed to delete blog post', err);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setForm({ title: '', excerpt: '', content: '', featured_image: '', category: '' });
    };

    return (
        <div>
            <div className="flex justify-between align-items-center mb-8">
                <div>
                    <h2 className="text-3xl font-heading font-bold">Project Journals</h2>
                    <p className="text-gray-400">Manage your articles, news and system updates.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2 py-2 px-6"
                >
                    <Plus size={20} />
                    Write Post
                </button>
            </div>

            <div className="glass-card p-4 mb-8 flex items-center gap-3 border-white/5 bg-dark-900/40">
                <Search className="text-gray-500" size={20} />
                <input type="text" placeholder="Filter articles..." className="bg-transparent border-none text-white focus:outline-none w-full" />
            </div>

            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500 py-12">Retrieving archives...</p>
                ) : posts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary-500/30 transition-all border-white/5"
                    >
                        <div className="w-full md:w-32 h-20 rounded-xl overflow-hidden bg-white/5 border border-white/5 flex-shrink-0">
                            <img src={post.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80'} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs text-primary-400 uppercase tracking-widest font-bold">Published</span>
                                <span className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white group-hover:text-primary-400 transition-colors uppercase tracking-tight">{post.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-1">{post.excerpt}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(post)}
                                className="p-3 hover:bg-white/10 rounded-xl text-primary-400 transition-colors"
                            >
                                <Pencil size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="p-3 hover:bg-red-500/10 rounded-xl text-red-500 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fade-in">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-panel w-full max-w-2xl p-8 rounded-3xl relative overflow-y-auto max-h-[90vh]"
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-heading font-bold mb-6">
                            {editingId ? 'Update Journal' : 'Write Journal Entry'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="Post Title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                    <input
                                        type="text"
                                        value={form.category}
                                        onChange={e => setForm({ ...form, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="Economy, AI, Web3..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt</label>
                                <input
                                    type="text"
                                    value={form.excerpt}
                                    onChange={e => setForm({ ...form, excerpt: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    placeholder="Brief summary..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Content (Markdown supported)</label>
                                <textarea
                                    value={form.content}
                                    onChange={e => setForm({ ...form, content: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    rows="8"
                                    placeholder="Post content..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Featured Image URL</label>
                                <input
                                    type="text"
                                    value={form.featured_image}
                                    onChange={e => setForm({ ...form, featured_image: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-primary py-3 rounded-xl"
                                >
                                    {editingId ? 'Publish Changes' : 'Publish Post'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageBlog;
