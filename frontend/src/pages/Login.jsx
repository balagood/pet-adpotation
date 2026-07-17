import { useState } from "react";
import { useDispatch,useSelector  } from "react-redux";
import { login } from "../slices/userSlice";
import { useNavigate, Link ,Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash,FaArrowLeft,FaSpinner } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(login(form)).unwrap();
      const role = res?.user?.role;
      localStorage.setItem("loginTime",new Date().toLocaleString());

      if (role === "shelter") {
        navigate("/applications/dashboard");
      } else if (role === "adopter") {
        navigate("/pets");
      } else {
        navigate("/foster-dashboard");
      }
    } catch (err) {
      toast.error("Invalid Credential");
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4 z-50">

    <button onClick={() => navigate("/")} className="absolute top-6 left-6 flex items-center gap-2 text-white font-medium hover:translate-x-1 transition">
      <FaArrowLeft />Home
    </button>
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome To Pet Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="relative">

            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">

            <FaLock className="absolute top-4 left-4 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="mt-8">

            {/* <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button> */}
            <button type="submit" disabled={loading} className={`w-full py-3 right-4 top-4 rounded-xl font-semibold shadow-lg transition duration-300 text-white
              ${loading? "bg-blue-400 cursor-not-allowed": "bg-blue-600 hover:bg-blue-700"}`}>

              {loading ? (<div className="flex items-center right-4 top-4  justify-center gap-2"><FaSpinner className="animate-spin" /><span>Signing In...</span>
              </div>) : ("Login")}

            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}