import React, { useState } from 'react'
import { FiBook, FiHome, FiUsers } from 'react-icons/fi';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const CustomerLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const items = [
        { to: '/', label: 'Home', icon: FiHome },
        { to: '/book-appointment', label: 'Book Appointment', icon: FiBook },
        { to: '/my-appointments', label: 'My Appointments', icon: FiUsers },
    ];
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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

export default CustomerLayout