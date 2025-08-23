import React, { useState } from 'react'
import { FiBook, FiGrid, FiHome, FiUsers } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const items = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
        { to: '/admin/appointments', label: 'Manage Appointments', icon: FiBook },
        { to: '/admin/staff', label: 'Staff', icon: FiUsers },
        { to: '/admin/customers', label: 'Customers', icon: FiUsers },
        { to: '/admin/services', label: 'Services', icon: FiHome },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onToggle={() => setCollapsed((s) => !s)} />
            <div className="flex">
                <Sidebar items={items} collapsed={collapsed} />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default AdminLayout