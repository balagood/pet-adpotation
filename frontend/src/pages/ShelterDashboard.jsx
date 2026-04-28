import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

export default function ShelterDashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  const fetchPets = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/pets/myPets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPets(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const deletePet = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pet?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/pets/deletePets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPets(pets.filter((pet) => pet._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shelter Dashboard</h1>

        <button
          onClick={() => navigate("/add-pet")}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg"
        >
          + Add Pet
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Total Pets</h3>
          <p className="text-2xl font-bold">{pets.length}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Available</h3>
          <p className="text-2xl font-bold">
            {pets.filter((p) => p.status === "available").length}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="text-gray-500">Adopted</h3>
          <p className="text-2xl font-bold">
            {pets.filter((p) => p.status === "adopted").length}
          </p>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="text-center text-gray-500">
          No pets added yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white shadow rounded-xl overflow-hidden"
            >
              <img
                src={pet.photos?.[0] || "/no-image.png"}
                alt={pet.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-bold">{pet.name}</h3>
                <p className="text-gray-500">{pet.breed}</p>
                <p className="text-sm mt-2">
                  Status: {pet.status}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      navigate(`/editPet/${pet._id}`)
                    }
                    className="flex-1 bg-green-500 text-white py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deletePet(pet._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}