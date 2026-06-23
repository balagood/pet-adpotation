import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { getPetById } from "../api/petService";
import { addPet, updatePet } from "../slices/petSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

const PetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEdit = !!id;

  const loading = useSelector((state) => state.pets?.loading);

  const [errors, setErrors] = useState({});
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    size: "",
    color: "",
    medicalHistory: "",
    location: "",
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
        medicalHistory: pet.medicalHistory || "",
        location: pet.location || "",
        status: pet.status || "available",
      });
    } catch {
      toast.error("Failed to load pet");
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

    if (!formData.name.trim()) {
      newErrors.name = "Pet name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = "Only letters allowed";
    }

    if (!formData.breed.trim()) {
      newErrors.breed = "Breed is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.breed)) {
      newErrors.breed = "Only letters allowed";
    }

    if (!formData.age) {
      newErrors.age = "Age required";
    } else if (!/^[0-9]+$/.test(formData.age)) {
      newErrors.age = "Only numbers allowed";
    } else if (formData.age < 0 || formData.age > 25) {
      newErrors.age = "Age must be between 0-25";
    }

    if (!formData.size) {
      newErrors.size = "Please select size";
    }

    if (!formData.color.trim()) {
      newErrors.color = "Color required";
    }

    if (!formData.medicalHistory.trim()) {
      newErrors.medicalHistory = "Medical history required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location required";
    }

    if (
      !isEdit &&
      photoFiles.length === 0 &&
      videoFiles.length === 0
    ) {
      newErrors.files =
        "Please upload at least one image or video";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Photos:", photoFiles);
    console.log("Videos:", videoFiles);

    try {
      if (isEdit) {
        await dispatch(
          updatePet({
            id,
            petData: formData,
            photoFiles,
            videoFiles,
          })
        ).unwrap();

        toast.success("Pet updated successfully");
      } else {
        await dispatch(
          addPet({
            petData: formData,
            photoFiles,
            videoFiles,
          })
        ).unwrap();

        toast.success("Pet added successfully");
      }

      navigate("/shelter-dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        {isEdit ? "Edit Pet" : "Add New Pet"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {/* Pet Name */}
        <div>
          <label className="font-semibold">Pet Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter pet name"
            className="w-full border p-3 rounded mt-1"
          />
          <p className="text-red-500 text-sm">{errors.name}</p>
        </div>

        {/* Breed */}
        <div>
          <label className="font-semibold">Breed *</label>
          <input
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Enter breed"
            className="w-full border p-3 rounded mt-1"
          />
          <p className="text-red-500 text-sm">{errors.breed}</p>
        </div>

        {/* Age */}
        <div>
          <label className="font-semibold">Age *</label>
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            className="w-full border p-3 rounded mt-1"
          />
          <p className="text-red-500 text-sm">{errors.age}</p>
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
          <p className="text-red-500 text-sm">{errors.size}</p>
        </div>

        {/* Color */}
        <div>
          <label className="font-semibold">Color *</label>
          <input
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Enter color"
            className="w-full border p-3 rounded mt-1"
          />
          <p className="text-red-500 text-sm">{errors.color}</p>
        </div>

        {/* Medical History */}
        <div>
          <label className="font-semibold">Medical History *</label>
          <input
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="Medical history"
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
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full border p-3 rounded mt-1"
          />
          <p className="text-red-500 text-sm">{errors.location}</p>
        </div>

        {/* Status */}
        <div>
          <label className="font-semibold">Status *</label>
          <input
            type="text"
            value="Available"
            readOnly
            className="w-full border p-3 rounded mt-1 bg-gray-100 text-gray-600"
          />
        </div>

        {/* Photos */}
        <div>
          <label className="font-semibold">Upload Images</label>
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            onChange={(e) =>
              setPhotoFiles(Array.from(e.target.files))
            }
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Videos */}
        <div>
          <label className="font-semibold">
            Upload Videos (Optional)
          </label>
          <input
            type="file"
            name="videos"
            multiple
            accept="video/*"
            onChange={(e) =>
              setVideoFiles(Array.from(e.target.files))
            }
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* File Errors */}
        <div className="col-span-full">
          <p className="text-red-500 text-sm">{errors.files}</p>
        </div>

        {/* Submit */}
        <div className="col-span-full flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className={`px-8 py-3 rounded-lg text-white font-semibold transition duration-300 flex items-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>
                  {isEdit ? "Updating Pet..." : "Adding Pet..."}
                </span>
              </>
            ) : isEdit ? (
              "Update Pet"
            ) : (
              "Add Pet"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetForm;