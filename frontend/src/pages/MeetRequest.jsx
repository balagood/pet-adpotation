import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdopterRequests } from "../slices/meetGreetSlice";

const MeetRequests = () => {
  const dispatch = useDispatch();

  // SAFE ACCESS
  //const user = useSelector((state) => state.auth?.user);
  const user = useSelector((state) => state.user.user);
  const requests = useSelector((state) => state.meetGreet?.requests || []);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchAdopterRequests(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div>
      <h2>My Meet Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        requests.map((request) => (
          <div key={request._id}>
            <h3>{request.petId?.name}</h3>
            <p>Shelter: {request.shelterId?.name}</p>
            <p>Date: {new Date(request.date).toLocaleString()}</p>
            <p>Status: {request.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MeetRequests;