import React, { useState } from "react";
import { addPet } from "../api/petService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PetForm = () => {
  const user = useSelector((state)=>state.user.user)
  const loading = useSelector((state)=>state.pets.loading);
  const [formData, setFormData] = useState({
    //shelterId: "69ad867e7cb038246537335d",
    //shelterId: user?._id,
    name: "",
    age: "",
    breed: "",
    size: "",
    color: "",
    medicalHistory: "",
    status: "available",
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data ={
        ...formData,
        shelterId:user?._id,
      }
      await addPet(data, files);
      toast.success("Pet added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error adding pet");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Pet</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter pet name"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Breed */}
        <div>
          <label className="block font-medium mb-1">Breed</label>
          <input
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Enter breed"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block font-medium mb-1">Size</label>
          <input
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Small / Medium / Large"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block font-medium mb-1">Color</label>
          <input
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Enter color"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Medical History */}
        <div>
          <label className="block font-medium mb-1">Medical History</label>
          <input
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="Enter medical history"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Pet Image</label>
          <input
            type="file" multiple
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading?"Adding":"Add Pet"}
        </button>

      </form>
    </div>
  );
};

export default PetForm;