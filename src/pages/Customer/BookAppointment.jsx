import React, { useState } from "react";

const BookAppointment = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        service: "",
        stylist: "",
        date: "",
        time: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Appointment booked:", formData);
        alert("Your appointment has been booked successfully!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 p-6">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row animate-fadeIn">
                {/* Left Side - Image / Banner */}
                <div className="md:w-1/2 bg-cover bg-center p-6 flex flex-col justify-center items-center text-white" style={{ backgroundImage: `url('https://5.imimg.com/data5/SELLER/Default/2023/4/301029482/IR/NI/RF/5050159/saloon-interior-design-1000x1000.jpg')` }}>
                    <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">Pamper Yourself</h2>
                    <p className="text-lg text-center drop-shadow-md">Book your slot today and let our stylists work their magic!</p>
                </div>

                {/* Right Side - Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-pink-600 mb-6">Book an Appointment</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Service */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Select Service</label>
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            >
                                <option value="">-- Choose Service --</option>
                                <option value="Haircut">Haircut</option>
                                <option value="Hair Color">Hair Color</option>
                                <option value="Facial">Facial</option>
                                <option value="Manicure">Manicure</option>
                            </select>
                        </div>

                        {/* Stylist */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Preferred Stylist</label>
                            <select
                                name="stylist"
                                value={formData.stylist}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            >
                                <option value="">-- Any Stylist --</option>
                                <option value="Emma">Emma</option>
                                <option value="Sophia">Sophia</option>
                                <option value="Olivia">Olivia</option>
                            </select>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-3 rounded-lg shadow-lg hover:bg-pink-600 transition duration-300"
                        >
                            Book Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;