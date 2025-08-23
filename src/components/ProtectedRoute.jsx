import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
    const userRole = getUserRole();

    console.log("userRole:", userRole);
    console.log("role:", role);


    if (!userRole) return <Navigate to="/login" replace />;
    if (role && userRole !== role) return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;