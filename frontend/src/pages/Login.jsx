import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await dispatch(login(form)).unwrap();
      const role = res?.user?.role;
      if (role === "shelter") {
        navigate("/applications/dashboard");
      }else if (role === "adopter") {
        navigate("/pets");
      }else {
        navigate("/pets");
      }
    }catch(err){
      toast.error("Invalid Credential");
    }
    
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.email}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          value={form.password}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full"
        />

        <div className="text-right mb-4">
        <Link
          to="/forgot-password"
          className="text-blue-600 text-sm hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

        <button className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
      <p className="text-center mt-4">Don't have an account?{" "}<span className="text-blue-500 cursor-pointer"onClick={() => navigate("/register")}>Register</span></p>
    </div>
  );
}