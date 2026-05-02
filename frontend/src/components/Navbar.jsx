import React, { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // ✅ FIXED (no page reload)
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col p-4 fixed left-0 top-0 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Pet Adoption Platform</h2>

      <nav className="mb-4">
        <Link
          to="/pets"
          className="block px-3 py-2 rounded bg-gray-800 hover:bg-gray-700"
        >
          Home
        </Link>
      </nav>

      {/* ✅ LOGOUT */}
      {user && (
        <button
          onClick={() => {
            dispatch(logout());
            window.location.href = "/";
          }}
          className="w-full text-left px-3 py-2 bg-red-500 rounded mb-4"
        >
          Logout
        </button>
      )}

      <nav className="flex-1">
        <ul className="space-y-4">

          {/* 🐶 PETS */}
          {(user?.role === "adopter" || user?.role === "shelter") && (
            <li>
              <button
                onClick={() => toggleMenu("pets")}
                className="w-full text-left font-semibold px-3 py-2 rounded hover:bg-gray-700"
              >
                Pets
              </button>

              {openMenu === "pets" && (
                <ul className="ml-6 mt-2 space-y-2">

                  {user?.role === "adopter" && (
                    <li>
                      <Link to="/pets" className="block px-3 py-2 bg-gray-800 rounded text-blue-300">
                        View Pets
                      </Link>
                    </li>
                  )}

                   {user?.role === "shelter" && (
                    <li>
                      <Link to="/pets" className="block px-3 py-2 bg-gray-800 rounded text-blue-300">
                        View Pets
                      </Link>
                    </li>
                  )}

                  {user?.role === "shelter" && (
                    <li>
                      <Link to="/add-pet" className="block px-3 py-2 bg-gray-800 rounded text-blue-300">
                        Add Pet
                      </Link>
                    </li>

                          
                  )}

                  {user?.role === "shelter" && (
                    <li>
                    <Link  to="/shelter-dashboard" className="block px-3 py-2 bg-gray-800 rounded text-yellow-300">
                      Manage Pets
                    </Link>
                  </li>
                  )}
                  

                </ul>
              )}
            </li>
          )}

           {user?.role === "adopter" && (
            <li>
              <Link
                to="/favorites"
                className="block px-3 py-2 rounded hover:bg-gray-700"
              >
                Favorites
              </Link>
            </li>
          )}
          {/* 📄 APPLICATIONS */}
          {user && (
            <li>
              <button
                onClick={() => toggleMenu("applications")}
                className="w-full text-left font-semibold px-3 py-2 rounded hover:bg-gray-700"
              >
                Applications
              </button>
              

              {openMenu === "applications" && (
                <ul className="ml-6 mt-2 space-y-2">

                  {user.role === "adopter" && (
                    <li>
                      <Link to="/applications" className="block px-3 py-2 bg-gray-800 rounded text-green-300">
                        My Applications
                      </Link>
                    </li>
                  )}

                  {user.role === "shelter" && (
                    <li>
                      <Link to="/applications/dashboard" className="block px-3 py-2 bg-gray-800 rounded text-green-300">
                        Adoption Requests
                      </Link>
                    </li>
                  )}

                </ul>
              )}
            </li>
          )}

          

          {/*  AUTH (ONLY WHEN NOT LOGGED IN) */}
          {!user && (
            <li>
              <button
                onClick={() => toggleMenu("auth")}
                className="w-full text-left font-semibold px-3 py-2 rounded hover:bg-gray-700"
              >
                Auth
              </button>

              {openMenu === "auth" && (
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link to="/login" className="block px-3 py-2 bg-gray-800 rounded text-purple-300">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="block px-3 py-2 bg-gray-800 rounded text-purple-300">
                      Register
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;