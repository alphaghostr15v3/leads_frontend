import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Star, X, Upload } from 'lucide-react';
import api, { BACKEND_URL } from '../../utils/api';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ client_name: '', company: '', feedback: '', rating: 5 });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await api.get('/testimonials');
            setTestimonials(res.data);
        } catch (err) {
            console.error('Failed to fetch testimonials', err);
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
        formData.append('client_name', form.client_name);
        formData.append('company', form.company);
        formData.append('feedback', form.feedback);
        formData.append('rating', form.rating);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (editingId) {
                await api.post(`/admin/testimonials/${editingId}`, formData, {
                    params: { _method: 'PUT' },
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/admin/testimonials', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            handleCloseModal();
            fetchTestimonials();
        } catch (err) {
            console.error('Failed to save testimonial', err);
        }
    };

    const handleEdit = (t) => {
        setEditingId(t.id);
        setForm({
            client_name: t.client_name,
            company: t.company || '',
            feedback: t.feedback,
            rating: t.rating
        });
        setImageFile(null);
        setPreviewUrl(t.image_url);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                await api.delete(`/admin/testimonials/${id}`);
                fetchTestimonials();
            } catch (err) {
                console.error('Failed to delete testimonial', err);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setForm({ client_name: '', company: '', feedback: '', rating: 5 });
        setImageFile(null);
        setPreviewUrl(null);
    };

    return (
        <div>
            <div className="flex justify-between align-items-center mb-8">
                <div>
                    <h2 className="text-3xl font-heading font-bold">Client Success</h2>
                    <p className="text-gray-400">Manage what people are saying about Leads Orbit.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2 py-2 px-6"
                >
                    <Plus size={20} />
                    New Feedback
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <p className="col-span-full text-center text-gray-500 py-12">Fetching reviews...</p>
                ) : testimonials.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6 border-white/5 relative group"
                    >
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < t.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'} />
                            ))}
                        </div>
                        <p className="text-gray-300 italic mb-6">"{t.feedback}"</p>
                        <div className="flex justify-between items-end">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
                                    <img
                                        src={t.image_url ? (t.image_url.startsWith('http') ? t.image_url : `${BACKEND_URL}${t.image_url.startsWith('/') ? '' : '/'}${t.image_url}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(t.client_name)}&background=random`}
                                        alt={t.client_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-white uppercase text-xs mb-0.5">{t.client_name}</h4>
                                    <p className="text-primary-400 text-[10px] tracking-wider">{t.company || 'Direct Client'}</p>
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(t)}
                                    className="p-2 hover:bg-white/10 rounded-lg text-primary-400"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
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
                            {editingId ? 'Edit Feedback' : 'New Client Feedback'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Client Name</label>
                                    <input
                                        type="text"
                                        value={form.client_name}
                                        onChange={e => setForm({ ...form, client_name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Company/Designation</label>
                                    <input
                                        type="text"
                                        value={form.company}
                                        onChange={e => setForm({ ...form, company: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="CEO at TechCorp"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Profile Picture</label>
                                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                            id="testimonial-avatar-upload"
                                        />
                                        <label
                                            htmlFor="testimonial-avatar-upload"
                                            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-400 cursor-pointer hover:bg-primary-500/20 transition-all uppercase text-[10px] font-bold tracking-wider"
                                        >
                                            <Upload size={14} />
                                            {previewUrl ? 'Change Photo' : 'Upload Photo'}
                                        </label>
                                    </div>
                                    {previewUrl && (
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-500/30">
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
                                <label className="block text-sm font-medium text-gray-400 mb-2">Rating (1-5)</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setForm({ ...form, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                size={24}
                                                className={star <= form.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Feedback</label>
                                <textarea
                                    value={form.feedback}
                                    onChange={e => setForm({ ...form, feedback: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    rows="4"
                                    placeholder="What did they say?"
                                    required
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
                                    {editingId ? 'Save Changes' : 'Post Feedback'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageTestimonials;
