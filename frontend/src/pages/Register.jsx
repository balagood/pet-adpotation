import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full"
        />

        <select
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="adopter">Adopter</option>
          <option value="shelter">Shelter</option>
        </select>

        <button className="bg-green-500 text-white p-2 w-full">
          Register
        </button>

      </form>
    </div>
  );
}