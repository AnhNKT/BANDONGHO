import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, admin }: { children: any; admin?: boolean }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  if (admin && user.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
