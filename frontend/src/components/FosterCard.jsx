import React from "react";
import { Link } from "react-router-dom";


const FosterCard = ({ pet, onComplete }) => {


  return (

    <div className="bg-white rounded-xl shadow-lg overflow-hidden">


      {/* Pet Image */}

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


        {/* Pet Name */}

        <h2 className="text-2xl font-bold mb-3">
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
          <strong>Location:</strong> {pet.location}
        </p>



        {/* Shelter Information */}

        <div className="mt-3 bg-gray-100 p-3 rounded">

          <h3 className="font-semibold">
            Shelter Details
          </h3>


          <p>
            {pet.shelterId?.name || "Not Assigned"}
          </p>


          <p className="text-sm">
            {pet.shelterId?.email || ""}
          </p>


        </div>



        {/* Status */}

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

            {pet.status?.toUpperCase()}

          </span>


        </div>




        {/* Actions */}

        <div className="flex flex-wrap gap-3 mt-6">


          {/* View Updates */}

          <Link
            to={`/foster-updates/${pet._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Updates
          </Link>




          {/* Add Update only after approval */}

          {/* {pet.status === "accepted" && (

            <Link
              to={`/add-foster-update/${pet._id}`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Update
            </Link>

          )} */}




          {/* Complete Foster */}

          {pet.status === "accepted" && (

            <button
              onClick={() => onComplete(pet._id)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Complete
            </button>

          )}


          {pet.adopterId && (
  <div className="mt-3 bg-green-100 p-3 rounded">
    <h3 className="font-semibold">
      Adopter Details
    </h3>

    <p>
      Name: {pet.adopterId.name}
    </p>

    <p>
      Email: {pet.adopterId.email}
    </p>
  </div>
)}



        </div>


      </div>


    </div>

  );

};
export default FosterCard;