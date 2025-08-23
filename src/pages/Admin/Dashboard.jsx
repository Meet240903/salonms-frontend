import React from "react";
import {
    CalendarDaysIcon,
    CurrencyRupeeIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
    // Dummy data (you can replace with API calls later)
    const stats = [
        {
            name: "Today's Appointments",
            value: "12",
            icon: CalendarDaysIcon,
            color: "bg-blue-500",
        },
        {
            name: "Total Revenue Today",
            value: "₹4,500",
            icon: CurrencyRupeeIcon,
            color: "bg-green-500",
        },
        {
            name: "Active Staff",
            value: "5",
            icon: UserGroupIcon,
            color: "bg-purple-500",
        },
        {
            name: "Pending Tasks",
            value: "3",
            icon: ClipboardDocumentCheckIcon,
            color: "bg-yellow-500",
        },
    ];

    const upcomingAppointments = [
        { time: "10:00 AM", customer: "Riya Sharma", service: "Haircut" },
        { time: "11:30 AM", customer: "Amit Patel", service: "Facial" },
        { time: "1:00 PM", customer: "Priya Singh", service: "Hair Coloring" },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white shadow rounded-lg p-4 flex items-center"
                    >
                        <div
                            className={`p-3 rounded-full text-white ${stat.color} mr-4`}
                        >
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{stat.name}</p>
                            <p className="text-xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b py-2">Time</th>
                            <th className="border-b py-2">Customer</th>
                            <th className="border-b py-2">Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcomingAppointments.map((appt, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2">{appt.time}</td>
                                <td className="py-2">{appt.customer}</td>
                                <td className="py-2">{appt.service}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;