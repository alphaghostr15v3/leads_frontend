import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X, ExternalLink, Upload } from 'lucide-react';
import api, { BACKEND_URL } from '../../utils/api';

const ManagePortfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: '', client_name: '', description: '', project_url: '', category: 'Web Development' });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const res = await api.get('/portfolio');
            setItems(res.data);
        } catch (err) {
            console.error('Failed to fetch portfolio', err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('client_name', form.client_name);
        formData.append('description', form.description);
        formData.append('project_url', form.project_url);
        formData.append('category', form.category);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (editingId) {
                // Use POST with _method=PUT for multipart/form-data compatibility with Laravel PUT requests if needed, 
                // but let's try direct PUT first. If it fails, move to POST + _method.
                await api.post(`/admin/portfolio/${editingId}`, formData, {
                    params: { _method: 'PUT' }, // Laravel handles this for multipart/form-data
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/admin/portfolio', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            handleCloseModal();
            fetchPortfolio();
        } catch (err) {
            console.error('Failed to save portfolio item', err);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm({
            title: item.title,
            client_name: item.client_name || '',
            description: item.description,
            project_url: item.project_url || '',
            category: item.category || 'Web Development'
        });
        setImageFile(null);
        setPreviewUrl(item.image_url);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/admin/portfolio/${id}`);
                fetchPortfolio();
            } catch (err) {
                console.error('Failed to delete portfolio item', err);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setForm({ title: '', client_name: '', description: '', project_url: '', category: 'Web Development' });
        setImageFile(null);
        setPreviewUrl(null);
    };

    return (
        <div>
            <div className="flex justify-between align-items-center mb-8">
                <div>
                    <h2 className="text-3xl font-heading font-bold">Manage Portfolio</h2>
                    <p className="text-gray-400">Showcase your best work to the world.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2 py-2 px-6"
                >
                    <Plus size={20} />
                    Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="col-span-full text-center text-gray-500 py-12">Loading portfolio database...</p>
                ) : items.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card group"
                    >
                        <div className="relative h-48 overflow-hidden rounded-t-2xl">
                            <img
                                src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `${BACKEND_URL}${item.image_url.startsWith('/') ? '' : '/'}${item.image_url}`) : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-3 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-colors"
                                >
                                    <Pencil size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-heading font-bold text-white group-hover:text-primary-400 transition-colors">{item.title}</h3>
                                {item.project_url && (
                                    <a href={item.project_url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <p className="text-primary-400 text-sm font-medium">{item.client_name}</p>
                                <span className="bg-white/5 px-2 py-1 rounded-md text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</span>
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
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
                        className="glass-panel w-full max-w-lg p-8 rounded-3xl relative"
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-heading font-bold mb-6">
                            {editingId ? 'Edit Work' : 'New Work'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Project Title</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="Project Title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm({ ...form, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    >
                                        <option value="Web Development">Web Development</option>
                                        <option value="Video Editing">Video Editing</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Client Name</label>
                                <input
                                    type="text"
                                    value={form.client_name}
                                    onChange={e => setForm({ ...form, client_name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    placeholder="Client Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    rows="3"
                                    placeholder="Description"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Project Image</label>
                                <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                            id="project-image-upload"
                                        />
                                        <label
                                            htmlFor="project-image-upload"
                                            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-400 cursor-pointer hover:bg-primary-500/20 transition-all uppercase text-xs font-bold tracking-wider"
                                        >
                                            <Upload size={16} />
                                            {previewUrl ? 'Change Image' : 'Upload Image'}
                                        </label>
                                    </div>
                                    {previewUrl && (
                                        <div className="relative w-24 h-16 rounded overflow-hidden border border-white/10">
                                            <img
                                                src={previewUrl.startsWith('blob') || previewUrl.startsWith('http') ? previewUrl : `${BACKEND_URL}${previewUrl.startsWith('/') ? '' : '/'}${previewUrl}`}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Project Link</label>
                                <input
                                    type="text"
                                    value={form.project_url}
                                    onChange={e => setForm({ ...form, project_url: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    placeholder="Project Link"
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
                                    {editingId ? 'Save Changes' : 'Launch Project'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManagePortfolio;
