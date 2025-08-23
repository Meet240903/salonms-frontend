// src/components/Header.jsx
import React from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

const Header = ({ onToggle }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    console.log("user123::", user);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            {/* Left section */}
            <div className="flex items-center gap-3">
                {/* Sidebar toggle button for mobile */}
                <button
                    className="md:hidden p-2 rounded-md hover:bg-gray-100"
                    onClick={onToggle}
                >
                    <FiMenu size={20} />
                </button>
                <h1 className="text-xl font-semibold">SalonMS</h1>
                <span className="hidden sm:inline text-sm text-gray-500">
                    — Manage bookings & staff easily
                </span>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        {/* User info */}
                        <div className="text-sm text-right">
                            <div className="font-medium">{user.userName}</div>
                            <div className="text-xs text-gray-500">
                                {user.role?.toUpperCase()}
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            className="flex items-center gap-2 px-3 py-1 border rounded text-sm hover:bg-gray-50"
                            onClick={handleLogout}
                        >
                            <FiLogOut /> Logout
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;