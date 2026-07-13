import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMeetRequest,
  fetchAvailableSlots,
} from "../slices/meetGreetSlice";

const MeetRequestForm = ({ pet, adopterId }) => {
  const dispatch = useDispatch();

  const { availableSlots, loading } = useSelector(
    (state) => state.meetGreet
  );

  const [meetingDate, setMeetingDate] = useState("");
  const [slot, setSlot] = useState("");
  const [message, setMessage] = useState("");

  // Fetch available slots whenever date changes
  useEffect(() => {
    if (meetingDate && pet?.shelterId) {
      dispatch(
        fetchAvailableSlots({
          shelterId: pet.shelterId,
          meetingDate,
        })
      );
    }
  }, [meetingDate, pet, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!slot) {
      alert("Please select a slot");
      return;
    }

    dispatch(
      addMeetRequest({
        petId: pet._id,
        adopterId,
        shelterId: pet.shelterId,
        meetingDate,
        slot,
        message,
      })
    );

    alert("Meet request sent successfully");

    setMeetingDate("");
    setSlot("");
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg p-5 mt-5"
    >
      <h3 className="text-xl font-bold mb-4">
        Request Meet & Greet
      </h3>

      <label className="block mb-2 font-semibold">
        Select Date
      </label>

      <input
        type="date"
        value={meetingDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setMeetingDate(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      {meetingDate && (
        <>
          <h4 className="mt-5 font-semibold">
            Available Slots
          </h4>

          {loading ? (
            <p>Loading slots...</p>
          ) : availableSlots.length === 0 ? (
            <p className="text-red-500">
              No slots available for this date.
            </p>
          ) : (
           /*  <div className="grid grid-cols-2 gap-3 mt-3">
              {availableSlots.map((item) => (
                <label
                  key={item}
                  className={`border rounded p-3 cursor-pointer ${
                    slot === item
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    value={item}
                    checked={slot === item}
                    onChange={() => setSlot(item)}
                    className="mr-2"
                  />
                  {item}
                </label>
              ))}
            </div> */
          <div className="grid grid-cols-2 gap-3 mt-3">
            {availableSlots
              .filter((item) => item.available)
              .map((item) => (
                <label
                  key={item.slot}
                  className={`border rounded p-3 cursor-pointer ${
                    slot === item.slot
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    value={item.slot}
                    checked={slot === item.slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="mr-2"
                  />

                  {item.slot}
                </label>
              ))}
        </div>
          )}
        </>
      )}

      <textarea
        className="border rounded p-2 w-full mt-5"
        rows="4"
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        type="submit"
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Send Request
      </button>
    </form>
  );
};

export default MeetRequestForm;