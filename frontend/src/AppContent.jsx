import { useLocation, Routes, Route } from "react-router-dom";

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

function AppContent() {
    const location = useLocation();

    const hideNavbar =
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <div className="flex">

            {!hideNavbar && <Navbar />}

            <div className={`${!hideNavbar ? "ml-64" : ""} flex-1 flex flex-col min-h-screen`}>

                <main className="flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/pets"element={<ProtectedRoute><Pets /></ProtectedRoute>}/>
                        <Route path="/pet/:id" element={<ProtectedRoute><PetDetails /></ProtectedRoute>}/>
                        <Route path="/add-pet" element={<ProtectedRoute role="shelter"><PetForm /></ProtectedRoute>}/>
                        <Route path="/editPet/:id" element={<ProtectedRoute role="adopter"><EditPet /></ProtectedRoute>}/>
                        <Route path="/applications/dashboard"element={<ProtectedRoute role="shelter"><ApplicationDashboard /></ProtectedRoute>}/>
                        <Route path="/applications" element={<ProtectedRoute role="adopter"><MyApplications /></ProtectedRoute>}/>
                        <Route path="/favorites" element={<ProtectedRoute role="adopter"><Favorites /></ProtectedRoute>}/>
                    </Routes>
                </main>

                {!hideNavbar && <Footer />}

            </div>
        </div>
    );
}

export default AppContent;