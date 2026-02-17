import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Upload, Linkedin, Twitter, Github, Download, Facebook, Instagram, Globe } from 'lucide-react';
import api, { BACKEND_URL } from '../../utils/api';

const ManageTeam = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        name: '',
        role: '',
        bio: '',
        linkedin: '',
        twitter: '',
        github: '',
        facebook: '',
        instagram: '',
        profile_url: '',
        order: 0
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [cvFileName, setCvFileName] = useState(null);

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const res = await api.get('/team');
            setMembers(res.data);
        } catch (err) {
            console.error('Failed to fetch team members', err);
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

    const handleCvChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCvFile(file);
            setCvFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('role', form.role);
        formData.append('bio', form.bio || '');
        formData.append('linkedin', form.linkedin || '');
        formData.append('twitter', form.twitter || '');
        formData.append('github', form.github || '');
        formData.append('facebook', form.facebook || '');
        formData.append('instagram', form.instagram || '');
        formData.append('profile_url', form.profile_url || '');
        formData.append('order', form.order);

        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (cvFile) {
            formData.append('cv', cvFile);
        }

        setSaving(true);
        try {
            if (editingId) {
                await api.post(`/admin/team/${editingId}`, formData, {
                    params: { _method: 'PUT' },
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/admin/team', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            handleCloseModal();
            fetchTeam();
        } catch (err) {
            console.error('Failed to save team member', err);
            console.error('Error response:', err.response?.data);
            alert(`Failed to save team member: ${err.response?.data?.message || err.message || 'Unknown error'}`);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (m) => {
        setEditingId(m.id);
        setForm({
            name: m.name,
            role: m.role,
            bio: m.bio || '',
            linkedin: m.linkedin || '',
            twitter: m.twitter || '',
            github: m.github || '',
            facebook: m.facebook || '',
            instagram: m.instagram || '',
            profile_url: m.profile_url || '',
            order: m.order || 0
        });
        setImageFile(null);
        setPreviewUrl(m.image_url);
        setCvFile(null);
        setCvFileName(m.cv_url ? m.cv_url.split('/').pop() : null);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this team member?')) {
            try {
                await api.delete(`/admin/team/${id}`);
                fetchTeam();
            } catch (err) {
                console.error('Failed to delete team member', err);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setForm({
            name: '',
            role: '',
            bio: '',
            linkedin: '',
            twitter: '',
            github: '',
            facebook: '',
            instagram: '',
            profile_url: '',
            order: 0
        });
        setImageFile(null);
        setPreviewUrl(null);
        setCvFile(null);
        setCvFileName(null);
    };

    return (
        <div>
            <div className="flex justify-between align-items-center mb-8">
                <div>
                    <h2 className="text-3xl font-heading font-bold uppercase tracking-tighter">The Pioneers</h2>
                    <p className="text-gray-400">Manage the core team members of Leads Orbit.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center gap-2 py-2 px-6"
                >
                    <Plus size={20} />
                    Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    <p className="col-span-full text-center text-gray-500 py-12">Assembling the crew...</p>
                ) : members.map((m) => (
                    <motion.div
                        key={m.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card group relative"
                    >
                        <div className="aspect-[4/5] overflow-hidden">
                            <img
                                src={m.image_url ? (m.image_url.startsWith('http') ? m.image_url : `${BACKEND_URL}${m.image_url.startsWith('/') ? '' : '/'}${m.image_url}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=random`}
                                alt={m.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-950 to-transparent p-6 pt-12">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-heading font-bold text-white uppercase text-sm">{m.name}</h4>
                                    {m.cv_url && (
                                        <a
                                            href={m.cv_url.startsWith('http') ? m.cv_url : `${BACKEND_URL}${m.cv_url.startsWith('/') ? '' : '/'}${m.cv_url}`}
                                            download
                                            className="p-1.5 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download size={14} className="text-primary-400" />
                                        </a>
                                    )}
                                </div>
                                <p className="text-primary-400 text-[10px] tracking-wider uppercase font-medium">{m.role}</p>
                            </div>

                            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(m)}
                                    className="p-2 bg-dark-950/60 backdrop-blur-md hover:bg-primary-500 rounded-lg text-white"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(m.id)}
                                    className="p-2 bg-dark-950/60 backdrop-blur-md hover:bg-red-500 rounded-lg text-white"
                                >
                                    <Trash2 size={16} />
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
                        className="glass-panel w-full max-w-2xl p-8 rounded-3xl relative"
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-heading font-bold mb-6">
                            {editingId ? 'Edit Team Member' : 'Enlist New Member'}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Member Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="Alex Rivera"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Role / Designation</label>
                                    <input
                                        type="text"
                                        value={form.role}
                                        onChange={e => setForm({ ...form, role: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="Founder & CEO"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
                                    <input
                                        type="text"
                                        value={form.linkedin}
                                        onChange={e => setForm({ ...form, linkedin: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Twitter URL</label>
                                    <input
                                        type="text"
                                        value={form.twitter}
                                        onChange={e => setForm({ ...form, twitter: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Github/Behance</label>
                                    <input
                                        type="text"
                                        value={form.github}
                                        onChange={e => setForm({ ...form, github: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Facebook URL</label>
                                    <input
                                        type="text"
                                        value={form.facebook}
                                        onChange={e => setForm({ ...form, facebook: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Instagram URL</label>
                                    <input
                                        type="text"
                                        value={form.instagram}
                                        onChange={e => setForm({ ...form, instagram: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Portfolio/Website</label>
                                    <input
                                        type="text"
                                        value={form.profile_url}
                                        onChange={e => setForm({ ...form, profile_url: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Display Order</label>
                                    <input
                                        type="number"
                                        value={form.order}
                                        onChange={e => setForm({ ...form, order: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Member Photo</label>
                                    <div className="flex items-center gap-4 p-2 bg-white/5 border border-white/10 rounded-xl">
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                            id="team-photo-upload"
                                        />
                                        <label
                                            htmlFor="team-photo-upload"
                                            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-400 cursor-pointer hover:bg-primary-500/20 transition-all uppercase text-[10px] font-bold tracking-wider"
                                        >
                                            <Upload size={14} />
                                            {previewUrl ? 'Change' : 'Upload'}
                                        </label>
                                        {previewUrl && (
                                            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-primary-500/30">
                                                <img
                                                    src={previewUrl.startsWith('blob') || previewUrl.startsWith('http') ? previewUrl : `${BACKEND_URL}${previewUrl.startsWith('/') ? '' : '/'}${previewUrl}`}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Short Bio</label>
                                <textarea
                                    value={form.bio}
                                    onChange={e => setForm({ ...form, bio: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
                                    rows="3"
                                    placeholder="Brief introduction..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">CV / Resume (PDF)</label>
                                <div className="flex items-center gap-4 p-2 bg-white/5 border border-white/10 rounded-xl">
                                    <input
                                        type="file"
                                        onChange={handleCvChange}
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        id="team-cv-upload"
                                    />
                                    <label
                                        htmlFor="team-cv-upload"
                                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-secondary-500/10 border border-secondary-500/20 rounded-lg text-secondary-400 cursor-pointer hover:bg-secondary-500/20 transition-all uppercase text-[10px] font-bold tracking-wider"
                                    >
                                        <Upload size={14} />
                                        {cvFileName ? 'Change CV' : 'Upload CV'}
                                    </label>
                                    {cvFileName && (
                                        <div className="flex items-center gap-2 px-3 py-1 bg-secondary-500/10 rounded-lg">
                                            <Download size={12} className="text-secondary-400" />
                                            <span className="text-[10px] text-secondary-400 truncate max-w-[150px]">{cvFileName}</span>
                                        </div>
                                    )}
                                </div>
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
                                    disabled={saving}
                                    className={`flex-1 btn-primary py-3 rounded-xl transition-all ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {saving ? 'Saving...' : (editingId ? 'Save Changes' : 'Deploy Pioneer')}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageTeam;
