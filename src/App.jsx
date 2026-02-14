import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePortfolio from './pages/admin/ManagePortfolio';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App bg-dark-950 min-h-screen text-white selection:bg-primary-500 selection:text-white">
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Workspace */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="portfolio" element={<ManagePortfolio />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
