import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  fetchShelterFosterPets,
  changeShelterStatus,
} from "../slices/fosterSlice";


const ShelterFosterRequests = () => {

  const dispatch = useDispatch();


  const {
    fosterPets = [],
    loading,
    error,
  } = useSelector(
    (state) => state.foster
  );


  useEffect(() => {

    dispatch(fetchShelterFosterPets());

  }, [dispatch]);



  const handleStatusUpdate = async (id, status) => {

    try {

      await dispatch(
        changeShelterStatus({
          id,
          status,
        })
      ).unwrap();


      toast.success(
        `Foster request ${status}`
      );


      dispatch(fetchShelterFosterPets());


    } catch (error) {

      toast.error(
        error || "Something went wrong"
      );

    }

  };



  return (

    <div className="max-w-7xl mx-auto p-6">


      <h2 className="text-3xl font-bold mb-8">
        Foster Requests
      </h2>



      {loading ? (

        <div className="text-center py-10">

          <h3 className="text-xl font-semibold">
            Loading Requests...
          </h3>

        </div>


      ) : fosterPets.length === 0 ? (

        <div className="bg-white shadow rounded-lg p-10 text-center">

          <h3 className="text-2xl font-bold">
            No Foster Requests Found
          </h3>


          <p className="text-gray-500 mt-2">
            Currently there are no foster pets waiting for approval.
          </p>


        </div>


      ) : (


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">


          {fosterPets.map((pet) => (

            <div
              key={pet._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >


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
                  <strong>Color:</strong> {pet.color}
                </p>


                <p className="text-gray-600">
                  <strong>Location:</strong> {pet.location}
                </p>



                {/* Foster Parent Details */}

                <div className="mt-4 bg-gray-100 p-3 rounded">

                  <h3 className="font-semibold">
                    Foster Parent
                  </h3>


                  <p>
                    Name: {pet.fosterParentId?.name || "N/A"}
                  </p>


                  <p>
                    Email: {pet.fosterParentId?.email || "N/A"}
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

                    {pet.status.toUpperCase()}

                  </span>

                </div>




                {/* Actions */}

                {pet.status === "pending" && (

                  <div className="flex gap-3 mt-6">


                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          pet._id,
                          "accepted"
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Accept
                    </button>



                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          pet._id,
                          "rejected"
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>


                  </div>

                )}


              </div>


            </div>

          ))}


        </div>

      )}


    </div>

  );

};


export default ShelterFosterRequests;