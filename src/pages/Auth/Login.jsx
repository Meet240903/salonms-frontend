import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../utils/auth";
import "../../assets/style/Login.css";
import { loginWithApi } from "../../services/userService";
import FullScreenLoader from "../../components/FullScreenLoader";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "customer",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const credentials = {
                userName: form.username,  // use correct key if backend expects 'userName'
                password: form.password,
                role: form.role
            };

            const { token, user } = await loginWithApi(credentials);

            // Save user and token
            loginUser(user, token);

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Invalid credentials. Please try again.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="animated-bg flex items-center justify-center min-h-screen">
            {loading && <FullScreenLoader />}
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">
                    Sign in to SalonMS
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />

                    <input
                        type="text"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-6 text-center">
                    New here?{" "}
                    <Link
                        to="/register"
                        className="text-pink-500 hover:underline font-medium"
                    >
                        Create an account
                    </Link>
                </p>

                <p className="text-xs text-gray-400 mt-4 text-center">
                    This is a mocked login for demo purposes. Replace with your real authentication flow.
                </p>
            </div>
        </div>
    );
}

export default Login;