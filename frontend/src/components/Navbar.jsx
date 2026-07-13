import React, { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import {FaHome,FaSignOutAlt,FaPaw,FaHeart,FaClipboardList, FaSignInAlt,FaUserPlus,FaFileAlt,FaInbox, FaEye,FaPlusCircle,FaTasks,FaUserCircle} from "react-icons/fa";

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
          className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800 hover:bg-gray-700"
        >
        <FaHome className="icon"/> <span>Home</span>
        </Link>
      </nav>



      {/* ✅ LOGOUT */}
      {user && (
        <button
          onClick={() => {
            dispatch(logout());
            window.location.href = "/";
          }}
          className="flex items-center gap-2 w-full text-left px-3 py-2 bg-red-500 rounded mb-4"
        >
        <FaSignOutAlt />Logout
        </button>
      )}



      <nav className="flex-1">

        {/* USER PROFILE */}

        {user && (
        <div className="bg-gray-800 rounded-2xl p-4 mb-6 shadow-lg border border-gray-700">
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                    <h3 className="font-bold text-white text-md">{user?.name}</h3>
                    <p className="text-sm text-blue-300 capitalize">{user?.role}</p>
                </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
                <p>Login Time:</p>
                <p className="text-green-400">{localStorage.getItem("loginTime")}</p>
            </div>
        </div>
        )}
        <ul className="space-y-4">

          {/* 🐶 PETS */}
          {(user?.role === "adopter" || user?.role === "shelter") && (
            <li>
              <button
                onClick={() => toggleMenu("pets")}
                className="flex items-center gap-2 w-full text-left font-semibold px-3 py-2 rounded hover:bg-gray-700"
              >
              <FaPaw className="icon"/>  <span>Pets</span>
              </button>

              {openMenu === "pets" && (
                <ul className="ml-6 mt-2 space-y-2">

                  {user?.role === "adopter" && (
                    <li>
                      <Link to="/pets" className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-green-300">
                        <FaEye className="text-lg" /><span>View Pets</span>
                      </Link>
                    </li>
                  )}

                   {user?.role === "shelter" && (
                    <li>
                      <Link to="/pets" className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-blue-300">
                      <FaEye className="text-lg" /><span>View Pets</span> 
                      </Link>
                    </li>
                  )}

                  {user?.role === "shelter" && (
                    <li>
                      <Link to="/add-pet" className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-blue-300">
                      <FaPlusCircle className="text-lg" /><span>Add Pet</span>

                      </Link>
                    </li>

                          
                  )}

                  {user?.role === "shelter" && (
                    <li>
                    <Link  to="/shelter-dashboard" className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-yellow-300">
                    <FaTasks className="text-lg" /><span>Manage Pets</span>
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
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700"
              >
              <FaHeart  className="icon"/>  <span>Favorites</span>
              </Link>
            </li>
          )}
          {/* 📄 APPLICATIONS */}
          {user && (
            <li>
              <button
                onClick={() => toggleMenu("applications")}
                className="flex item-center gap-2 w-full text-left font-semibold px-3 py-2 rounded hover:bg-gray-700"
              >
              <FaClipboardList className="icon"/>  <span>Applications</span>
              </button>
              

              {openMenu === "applications" && (
                <ul className="ml-6 mt-2 space-y-2">

                  {user.role === "adopter" && (
                    <li>
                      <Link to="/applications" className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-green-300">
                      <FaFileAlt className="text-lg" /><span>My Applications</span>
                      </Link>
                    </li>
                  )}

                  {user.role === "adopter" && (
                    <li>
                      <Link
                        to="/my-meet-requests"
                        className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-blue-300"
                      >
                        <FaClipboardList className="text-lg" />
                        <span>Meet & Greet Requests</span>
                      </Link>
                    </li>
                  )}

                  {user.role === "shelter" && (
                    <li>
                      <Link to="/applications/dashboard" className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-green-300">
                      <FaInbox className="text-lg" /><span>Adoption Requests</span>
                      </Link>
                    </li>
                  )}

                  {user.role === "shelter" && (
                    <li>
                      <Link
                        to="/shelter-meet-requests"
                        className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-yellow-300"
                      >
                        <FaClipboardList className="text-lg" />
                        <span>Meet Requests</span>
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
                /* onClick={() => toggleMenu("auth")} */
                className="w-full text-left font-semibold px-3 py-2 rounded hover:bg-gray-700"
              >
                <ul className="ml-6 mt-2 space-y-2">
                  <li>
                    <Link to="/login" className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-purple-300">
                     <FaSignInAlt className="text-lg" /><span>Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="flex item-center gap-2 px-3 py-2 bg-gray-800 rounded text-purple-300">
                     <FaUserPlus className="text-lg" /><span>Register</span>
                    </Link>
                  </li>
                </ul>
              </button>

             {/*  {openMenu === "auth" && (
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
              )} */}
            </li>
          )}

        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;