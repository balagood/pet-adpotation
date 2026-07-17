import React, { useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FosterUpdateCard from "../components/FosterUpdateCard";

import {
  fetchFosterUpdates,
} from "../slices/fosterUpdateSlice";


const FosterUpdates = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const {
    updates = [],
    loading,
  } = useSelector(
    (state) => state.fosterUpdate
  );

  const handleDelete = async (updateId) => {
  try {
    await dispatch(removeFosterUpdate(updateId)).unwrap();
    dispatch(fetchFosterUpdates(id));
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {

    if (id) {
      dispatch(fetchFosterUpdates(id));
    }

  }, [dispatch, id]);



  return (

    <div className="max-w-6xl mx-auto p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      <div className="flex justify-between items-center mb-8">


        <h2 className="text-3xl font-bold">
          Foster Pet Updates
        </h2>


        <Link
          to={`/add-foster-update/${id}`}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Update
        </Link>


      </div>




      {loading ? (

        <div className="text-center py-10">

          <h3 className="text-xl font-semibold">
            Loading Updates...
          </h3>

        </div>



      ) : updates.length === 0 ? (


        <div className="bg-white shadow rounded-lg p-10 text-center">

          <h3 className="text-2xl font-bold">
            No Updates Found
          </h3>


          <p className="text-gray-500 mt-2">
            No progress updates have been added for this pet.
          </p>


        </div>



      ) : (


        <div className="grid md:grid-cols-2 gap-6">


          {updates.map((update) => (

            /* <div
              key={update._id}
              className="bg-white shadow-lg rounded-xl p-5"
            >
              <h3 className="text-xl font-bold mb-3">
                Pet Progress Update
              </h3>
              <p className="text-gray-700">
                <strong>Description:</strong>{" "}
                {update.description}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Health Status:</strong>{" "}
                {update.healthStatus || "Not mentioned"}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Weight:</strong>{" "}
                {update.weight} kg
              </p>
              {update.photos &&
                update.photos.length > 0 && (

                <div className="grid grid-cols-2 gap-3 mt-4">


                  {update.photos.map((photo, index) => (

                    <img
                      key={index}
                      src={photo}
                      alt="Foster Update"
                      className="w-full h-32 object-cover rounded-lg"
                    />

                  ))}

                </div>

              )}

              <p className="text-sm text-gray-500 mt-4">
                Updated On:{" "}
                {new Date(
                  update.createdAt
                ).toLocaleDateString()}
              </p>



            </div> */
            <FosterUpdateCard
      key={update._id}
      update={update}
      onDelete={handleDelete}
  />


          ))}


        </div>


      )}


    </div>

  );

};


export default FosterUpdates;