import { useLocation, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Pets from "./pages/Pets";
import PetForm from "./pages/PetForm";
import EditPet from "./pages/EditPet";
import MyApplications from "./pages/MyApplication";
import ApplicationDashboard from "./pages/ApplicationDashboard";
import PetDetails from "./pages/PetDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function AppContent() {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  // Hide navbar only login and register page
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="flex">

      {!hideNavbar && <Navbar />}

      <div
        className={`${
          !hideNavbar ? "ml-64" : ""
        } flex-1 flex flex-col min-h-screen`}
      >
        <main className="flex-1 p-6">
          <Routes>

            {/* Home page show all pets */}
            <Route path="/" element={<Pets />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Register */}
            <Route path="/register" element={<Register />} />

            {/* Pets */}
            <Route path="/pets" element={<Pets />} />

            {/* Pet details */}
            <Route path="/pet/:id" element={<PetDetails />} />

            {/* Add pet */}
            <Route
              path="/add-pet"
              element={
                <ProtectedRoute role="shelter">
                  <PetForm />
                </ProtectedRoute>
              }
            />

            {/* Edit pet */}
            <Route
              path="/editPet/:id"
              element={
                <ProtectedRoute role="shelter">
                  <EditPet />
                </ProtectedRoute>
              }
            />

            {/* Shelter Dashboard */}
            <Route
              path="/applications/dashboard"
              element={
                <ProtectedRoute role="shelter">
                  <ApplicationDashboard />
                </ProtectedRoute>
              }
            />

            {/* My Applications */}
            <Route
              path="/applications"
              element={
                <ProtectedRoute role="adopter">
                  <MyApplications />
                </ProtectedRoute>
              }
            />

            {/* Favorites */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute role="adopter">
                  <Favorites />
                </ProtectedRoute>
              }
            />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

          </Routes>
        </main>

        {!hideNavbar && <Footer />}
      </div>
    </div>
  );
}

export default AppContent;233