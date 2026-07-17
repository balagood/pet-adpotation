import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {FaUser,FaEnvelope,FaLock,FaEye,FaEyeSlash,FaUserTag,FaArrowLeft} from "react-icons/fa";

export default function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "adopter",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    await dispatch(register(form));

    toast.success("Registered successfully ✅");

    navigate("/login");
  };

  return (

    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4 overflow-auto">

    <button onClick={() => navigate("/")} className="absolute top-6 left-6 flex items-center gap-2 text-white font-medium hover:translate-x-1 transition">
      <FaArrowLeft />Home
    </button>
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">

        {/* Header */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join and start your pet adoption journey
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}

          <div className="relative">

            <FaUser className="absolute left-4 top-4 text-gray-400" />

            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

          </div>

          {/* Email */}

          <div className="relative">

            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

          </div>

          {/* Password */}

          <div className="relative">

            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* Role */}

          <div className="relative">

            <FaUserTag className="absolute left-4 top-4 text-gray-400" />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none bg-white"
            >

              <option value="adopter">
                Adopter
              </option>

              <option value="shelter">
                Shelter
              </option>

              <option value="foster">
                Foster
              </option>

            </select>

          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}

        <p className="text-center mt-6 text-gray-600">

          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>

        </p>

      </div>

    </div>
  );
}