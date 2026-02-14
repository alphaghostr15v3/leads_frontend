import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import {
    LayoutDashboard,
    Briefcase,
    Folders,
    BookOpen,
    MessageSquareQuote,
    LogOut,
    ChevronRight,
    Users
} from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            navigate('/admin/login');
        } catch (err) {
            console.error('Logout failed', err);
            // Even if logout fails on server, we should probably clear local state or redirect
            navigate('/admin/login');
        }
    };
    const menuItems = [
        { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { title: 'Portfolio', icon: <Folders size={20} />, path: '/admin/portfolio' },
        { title: 'Testimonials', icon: <MessageSquareQuote size={20} />, path: '/admin/testimonials' },
        { title: 'Team', icon: <Users size={20} />, path: '/admin/team' },
    ];

    return (
        <div className="flex h-screen bg-dark-950 text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-900 border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-heading font-bold gradient-text">LEADS ORBIT</h1>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-medium">Admin Center</p>
                </div>

                <nav className="flex-1 overflow-y-auto pt-4 px-3 space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) => `
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive
                                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_20px_rgba(var(--color-primary-500),0.1)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
              `}
                        >
                            <div className="flex items-center gap-3">
                                <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                                <span className="font-medium">{item.title}</span>
                            </div>
                            <ChevronRight size={16} className={`opacity-0 transition-all duration-300 transform ${item.path === '/admin' ? 'translate-x-0 opacity-100' : '-translate-x-2'}`} />
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-dark-950 p-8">
                <div className="max-w-6xl mx-auto animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
