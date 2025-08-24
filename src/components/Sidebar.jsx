import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ items }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <aside
            className={`bg-white shadow-md p-3 h-screen flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"
                }`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 mb-4 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
            >
                {collapsed ? (
                    <Bars3Icon className="h-6 w-6" />
                ) : (
                    <XMarkIcon className="h-6 w-6" />
                )}
            </button>

            {/* Navigation Items */}
            <nav className="flex flex-col gap-2">
                {items.map((it) => (
                    <Link
                        key={it.to}
                        to={it.to}
                        className="relative group flex items-center gap-3 p-2 rounded hover:bg-gray-100"
                    >
                        <it.icon className="h-5 w-5" />
                        {!collapsed && <span>{it.label}</span>}

                        {/* Tooltip when collapsed */}
                        {collapsed && (
                            <span
                                className="absolute left-full ml-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10 transition-opacity duration-200"
                            >
                                {it.label}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;