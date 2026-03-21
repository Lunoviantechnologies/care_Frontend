import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const { accessToken, role: userRole } = useSelector((state) => state.auth);

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    if (role && role !== userRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;