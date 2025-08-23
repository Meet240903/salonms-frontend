import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/style/Login.css";
import { addUser } from "../../services/userService";
import FullScreenLoader from "../../components/FullScreenLoader";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        phone: "",
        role: "customer"
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission (which would cause a page reload)
        setLoading(true);
        try {
            const response = await addUser(formData);  // Send form data to the backend
            console.log('Registration successful:', response);
            alert("Registration successful! Please login.");
            navigate("/login");  // Redirect to login page
        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="animated-bg flex items-center justify-center min-h-screen">
            {loading && <FullScreenLoader />}
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">  {/* Use onSubmit here instead of onClick */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Enter unique username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}  // No need for inline function here
                            placeholder="Enter your phone number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                        />
                    </div>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        type="submit"  // Use 'submit' type to trigger form submission
                        className="w-full p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-pink-500 hover:underline font-medium">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;