import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShelterRequests,
  changeMeetStatus,
} from "../slices/meetGreetSlice";

const ShelterRequests = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const requests = useSelector((state) => state.meetGreet?.requests || []);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchShelterRequests(user._id));
    }
  }, [dispatch, user]);

  const updateStatus = (id, status) => {
    dispatch(changeMeetStatus({ id, status }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Shelter Meet Requests
        </h2>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <p className="text-gray-500 text-lg">
              No Meet Requests Found
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border"
              >
                <div className="grid md:grid-cols-4 gap-6">

                  {/* Pet Image */}
                  <div>
                    <img
                      src={
                        request.petId?.photos?.[0]?.url ||
                        request.petId?.photos?.[0] ||
                        "https://placehold.co/300x220?text=No+Image"
                      }
                      alt={request.petId?.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="md:col-span-3">

                    <div className="flex justify-between items-start">

                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {request.petId?.name}
                        </h3>

                        <p className="text-gray-500">
                          {request.petId?.breed}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold
                          ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : request.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : request.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {request.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-6">

                      <div>
                        <p className="text-sm text-gray-500">
                          Adopter Name
                        </p>

                        <p className="font-semibold">
                          {request.adopterId?.name}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Email
                        </p>

                        <p className="font-semibold">
                          {request.adopterId?.email}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Meeting Date
                        </p>

                        <p className="font-semibold">
                          {request.meetingDate}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Time Slot
                        </p>

                        <p className="font-semibold">
                          {request.slot}
                        </p>
                      </div>

                    </div>

                    <div className="mt-5">
                      <p className="text-sm text-gray-500">
                        Message
                      </p>

                      <div className="bg-gray-100 rounded-lg p-4 mt-2">
                        {request.message || "No message provided"}
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-4 mt-6">

                        <button
                          onClick={() =>
                            updateStatus(request._id, "accepted")
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                        >
                          ✅ Accept
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(request._id, "rejected")
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                        >
                          ❌ Reject
                        </button>

                      </div>
                    )}

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelterRequests;