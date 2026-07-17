import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { addFosterRequest } from "../slices/fosterSlice";
import { getShelterFosterPets,getShelters } from "../api/fosterService";

const FosterPetForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.foster.loading);

  const [shelters, setShelters] = useState([]);

  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    shelterId: "",

    name: "",
    age: "",
    breed: "",
    size: "",
    color: "",
    medicalHistory: "",
    location: "",

    startDate: "",
    endDate: "",
    notes: "",
  });

  useEffect(() => {
    loadShelters();
  }, []);

  const loadShelters = async () => {
    try {
      const data = await getShelters();
      setShelters(data);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load shelters");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.shelterId)
      newErrors.shelterId = "Please select shelter";

    if (!formData.name.trim())
      newErrors.name = "Pet name is required";
    else if (!/^[A-Za-z ]+$/.test(formData.name))
      newErrors.name = "Only letters allowed";

    if (!formData.breed.trim())
      newErrors.breed = "Breed is required";
    else if (!/^[A-Za-z ]+$/.test(formData.breed))
      newErrors.breed = "Only letters allowed";

    if (!formData.age)
      newErrors.age = "Age required";
    else if (!/^[0-9]+$/.test(formData.age))
      newErrors.age = "Only numbers allowed";
    else if (formData.age < 0 || formData.age > 25)
      newErrors.age = "Age must be between 0-25";

    if (!formData.size)
      newErrors.size = "Select pet size";

    if (!formData.color.trim())
      newErrors.color = "Color is required";

    if (!formData.medicalHistory.trim())
      newErrors.medicalHistory = "Medical history required";

    if (!formData.location.trim())
      newErrors.location = "Location required";

    if (!formData.startDate)
      newErrors.startDate = "Start date required";

    if (
      photoFiles.length === 0 &&
      videoFiles.length === 0
    ) {
      newErrors.files =
        "Upload at least one image or video";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
    /*   await dispatch(
        addFosterRequest({
          fosterData: formData,
          photoFiles,
          videoFiles,
        })
      ).unwrap(); */

    const form = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    // Append photos
    photoFiles.forEach((file) => {
      form.append("photos", file);
    });

    // Append videos
    videoFiles.forEach((file) => {
      form.append("videos", file);
    });

    await dispatch(addFosterRequest(form)).unwrap();
    
    toast.success("Pet submitted successfully");

      navigate("/foster-dashboard");

    } catch (err) {
      toast.error(
        err?.message ||
        "Unable to submit foster pet"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-center mb-8">
        Foster Pet Registration
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
                {/* Shelter */}
        <div>
          <label className="font-semibold">Select Shelter *</label>
          <select
            name="shelterId"
            value={formData.shelterId}
            onChange={handleChange}
            className="w-full border p-3 rounded mt-1"
          >
            <option value="">Select Shelter</option>

            {shelters.map((shelter) => (
              <option key={shelter._id} value={shelter._id}>
                {shelter.name}
              </option>
            ))}
          </select>

          <p className="text-red-500 text-sm">
            {errors.shelterId}
          </p>
        </div>

        {/* Pet Name */}
        <div>
          <label className="font-semibold">Pet Name *</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Pet Name"
            className="w-full border p-3 rounded mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.name}
          </p>
        </div>

        {/* Breed */}
        <div>
          <label className="font-semibold">Breed *</label>

          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Enter Breed"
            className="w-full border p-3 rounded mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.breed}
          </p>
        </div>

        {/* Age */}
        <div>
          <label className="font-semibold">Age *</label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter Age"
            className="w-full border p-3 rounded mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.age}
          </p>
        </div>

        {/* Size */}
        <div>
          <label className="font-semibold">Size *</label>

          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full border p-3 rounded mt-1"
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <p className="text-red-500 text-sm">
            {errors.size}
          </p>
        </div>

        {/* Color */}
        <div>
          <label className="font-semibold">Color *</label>

          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Enter Color"
            className="w-full border p-3 rounded mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.color}
          </p>
        </div>

        {/* Medical History */}
        <div>
          <label className="font-semibold">
            Medical History *
          </label>

          <input
            type="text"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="Medical History"
            className="w-full border p-3 rounded mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.medicalHistory}
          </p>
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location *</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter Location"
            className="w-full border p-3 rounded mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.location}
          </p>
        </div>
                {/* Start Date */}
        <div>
          <label className="font-semibold">Foster Start Date *</label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-3 rounded mt-1"
          />

          <p className="text-red-500 text-sm">
            {errors.startDate}
          </p>
        </div>

        {/* End Date */}
        <div>
          <label className="font-semibold">
            Foster End Date
          </label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border p-3 rounded mt-1"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="font-semibold">
            Additional Notes
          </label>

          <textarea
            rows="4"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter additional notes..."
            className="w-full border p-3 rounded mt-1"
          />
        </div>

        {/* Upload Images */}
        <div>
          <label className="font-semibold">
            Upload Images *
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setPhotoFiles(Array.from(e.target.files))
            }
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Upload Videos */}
        <div>
          <label className="font-semibold">
            Upload Videos
          </label>

          <input
            type="file"
            multiple
            accept="video/*"
            onChange={(e) =>
              setVideoFiles(Array.from(e.target.files))
            }
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* File Error */}
        <div className="col-span-full">
          <p className="text-red-500 text-sm">
            {errors.files}
          </p>
        </div>

        {/* Submit Button */}
        <div className="col-span-full flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-lg text-white font-semibold flex items-center gap-2 transition duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              "Submit Foster Pet"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
export default FosterPetForm;
     