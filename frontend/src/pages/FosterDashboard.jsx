import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import FosterCard from "../components/FosterCard";

import {
  fetchMyFosterPets,
  completeFosterPet,
} from "../slices/fosterSlice";

const FosterDashboard = () => {
  const dispatch = useDispatch();

  const { fosterPets, loading } = useSelector(
    (state) => state.foster
  );

  useEffect(() => {
    dispatch(fetchMyFosterPets());
  }, [dispatch]);

  const handleComplete = async (id) => {
    try {
      await dispatch(completeFosterPet(id)).unwrap();

      toast.success("Foster completed successfully");

      dispatch(fetchMyFosterPets());
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };
  return (
  <div className="max-w-7xl mx-auto p-6">

    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold">
        My Foster Pets
      </h2>

      <Link
        to="/add-foster-pet"
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
      >
        + Add Foster Pet
      </Link>
    </div>


    {loading ? (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>

    ) : fosterPets.length === 0 ? (

      <div className="bg-white rounded-lg shadow p-10 text-center">
        <h2 className="text-2xl font-bold">
          No Foster Pets Found
        </h2>

        <p className="text-gray-500 mt-2">
          You haven't uploaded any foster pets yet.
        </p>
      </div>

    ) : (

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {fosterPets.map((pet) => (
          <FosterCard key={pet._id} pet={pet} onComplete={handleComplete}/>

          /* <div
            key={pet._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >

            
            <img
              src={
                pet.photos && pet.photos.length > 0
                  ? pet.photos[0]
                  : "https://placehold.co/600x400?text=No+Image"
              }
              alt={pet.name}
              className="w-full h-56 object-cover"
            />


            <div className="p-5">

              <h2 className="text-2xl font-bold mb-2">
                {pet.name}
              </h2>


              <p className="text-gray-600">
                <strong>Breed:</strong> {pet.breed}
              </p>


              <p className="text-gray-600">
                <strong>Age:</strong> {pet.age}
              </p>


              <p className="text-gray-600">
                <strong>Size:</strong> {pet.size}
              </p>


              <p className="text-gray-600">
                <strong>Color:</strong> {pet.color}
              </p>


              <p className="text-gray-600">
                <strong>Location:</strong> {pet.location}
              </p>


              <p className="text-gray-600">
                <strong>Shelter:</strong>{" "}
                {pet.shelterId?.name || "Not Assigned"}
              </p>


              
              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    pet.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : pet.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : pet.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {pet.status.toUpperCase()}
                </span>
              </div>


              
              <div className="flex gap-3 mt-6">

                <Link
                  to={`/foster-updates/${pet._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View Updates
                </Link>


                {pet.status === "accepted" && (
                  <Link
                    to={`/add-foster-update/${pet._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Add Update
                  </Link>
                )}


                {pet.status === "accepted" && (
                  <button
                    onClick={() => handleComplete(pet._id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                  >
                    Complete
                  </button>
                )}

              </div>

            </div>

          </div> */

        ))}

      </div>

    )}

  </div>
);

};

export default FosterDashboard;