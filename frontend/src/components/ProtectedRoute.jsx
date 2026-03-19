import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user, token } = useSelector((state) => state.user);

  // ✅ Check token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ✅ Role check (safe)
  if (role && user?.role !== role) {
    return <Navigate to="/pets" />;
  }

  return children;
}