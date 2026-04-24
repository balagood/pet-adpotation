import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/users/reset-password/${token}`,
        { password }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      toast.error("Invalid or expired token");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Reset Password
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter New Password"
          className="border p-2 w-full rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;