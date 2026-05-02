import React, { useState, useEffect } from "react";
import {
  addPet,
  updatePet,
  getPetById
} from "../api/petService";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  const loading = useSelector(
    (state) => state.pets?.loading
  );

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    size: "",
    color: "",
    medicalHistory: "",
    status: "available",
  });

  useEffect(() => {
    if (isEdit) {
      fetchPet();
    }
  }, [id]);

  const fetchPet = async () => {
    try {
      const pet = await getPetById(id);

      setFormData({
        name: pet.name || "",
        age: pet.age || "",
        breed: pet.breed || "",
        size: pet.size || "",
        color: pet.color || "",
        medicalHistory:
          pet.medicalHistory || "",
        status: pet.status || "available",
      });
    } catch (error) {
      toast.error("Failed to load pet");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const validate = () => {
    if (!/^[A-Za-z ]+$/.test(formData.name)) {
      toast.error(
        "Name should contain only letters"
      );
      return false;
    }

    if (!/^[0-9]+$/.test(formData.age)) {
      toast.error(
        "Age should contain only numbers"
      );
      return false;
    }

    if (formData.age < 0 || !formData.age > 25) {
    toast.error("Age must be between 0 and 25");
    return false;
    }

    if (
      !/^[A-Za-z ]+$/.test(formData.breed)
    ) {
      toast.error(
        "Breed should contain only letters"
      );
      return false;
    }

    if (
      formData.medicalHistory.trim() === ""
    ) {
      toast.error(
        "Medical history required"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (isEdit) {
        await updatePet(
          id,
          formData,
          files
        );

        toast.success(
          "Pet updated successfully"
        );
      } else {
        await addPet(
          formData,
          files
        );

        toast.success(
          "Pet added successfully"
        );
      }

      navigate("/shelter-dashboard");
    } catch (error) {
      toast.error(
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong"
  );
      //toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isEdit
          ? "Edit Pet"
          : "Add New Pet"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Pet Name"
          className="border p-2 rounded"
        />

        <input
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Breed"
          className="border p-2 rounded"
        />

        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="border p-2 rounded"
        />

        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">
            Select Size
          </option>
          <option value="Small">
            Small
          </option>
          <option value="Medium">
            Medium
          </option>
          <option value="Large">
            Large
          </option>
        </select>

        <input
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Color"
          className="border p-2 rounded"
        />

        <input
          name="medicalHistory"
          value={
            formData.medicalHistory
          }
          onChange={handleChange}
          placeholder="Medical History"
          className="border p-2 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="available">
            Available
          </option>
          {/* <option value="adopted">
            Adopted
          </option>
          <option value="fostered">
            Fostered
          </option> */}
        </select>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded"
        />

        <div className="col-span-full flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {isEdit
              ? "Update Pet"
              : "Add Pet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetForm;