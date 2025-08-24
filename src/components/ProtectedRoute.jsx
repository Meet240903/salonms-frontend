import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
    const userRole = getUserRole();

    console.log("userRole:", userRole);
    console.log("expected role:", role);

    if (!userRole) return <Navigate to="/login" replace />;

    // If trying to access admin route but user is customer → send to customer home
    if (role === "admin" && userRole !== "admin") {
        return <Navigate to="/" replace />;
    }

    // If trying to access customer route but user is admin → send to admin dashboard
    if (role === "customer" && userRole !== "customer") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;