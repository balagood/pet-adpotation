import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user, token } = useSelector((state) => state.user);

  // ✅ Check token
  if (!token) {
    return <Navigate to="/login" replace/>;
  }

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  // ✅ Role check (safe)
  if (role && user?.role !== role) {
    return <Navigate to="/pets" replace />;
  }

  return children;
}