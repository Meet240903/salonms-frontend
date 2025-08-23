import React from "react";
import { motion } from "framer-motion";

const MyAppointments = () => {
    // Sample appointment data (you can replace with API data)
    const appointments = [
        {
            id: 1,
            service: "Haircut & Styling",
            stylist: "Emily Johnson",
            date: "2025-08-15",
            time: "2:00 PM",
            status: "Upcoming",
        },
        {
            id: 2,
            service: "Hair Coloring",
            stylist: "Michael Smith",
            date: "2025-07-30",
            time: "11:00 AM",
            status: "Completed",
        },
        {
            id: 3,
            service: "Facial Treatment",
            stylist: "Sophia Brown",
            date: "2025-07-25",
            time: "4:30 PM",
            status: "Cancelled",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 p-6">
            <motion.h1
                className="text-3xl font-bold text-center text-pink-700 mb-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Appointments
            </motion.h1>

            <div className="max-w-4xl mx-auto grid gap-6">
                {appointments.map((appt, index) => (
                    <motion.div
                        key={appt.id}
                        className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center border-l-4"
                        style={{
                            borderColor:
                                appt.status === "Upcoming"
                                    ? "#ec4899"
                                    : appt.status === "Completed"
                                        ? "#22c55e"
                                        : "#f43f5e",
                        }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {appt.service}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Stylist: {appt.stylist}
                            </p>
                            <p className="text-sm text-gray-600">
                                {appt.date} at {appt.time}
                            </p>
                            <span
                                className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${appt.status === "Upcoming"
                                        ? "bg-pink-100 text-pink-700"
                                        : appt.status === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {appt.status}
                            </span>
                        </div>

                        {appt.status === "Upcoming" && (
                            <div className="mt-4 md:mt-0 flex gap-3">
                                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                                    Reschedule
                                </button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;