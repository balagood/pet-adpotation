import MeetGreet from "../models/MeetGreet.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import { sendEmail } from "../utils/sendEmail.js";

// Create Meet & Greet Request (Adopter)
export const createMeetRequest = async (req, res) => {
  try {
    const { petId, shelterId, meetingDate, slot,message } = req.body;

    const adopterId = req.user.id;
    const shelter = await User.findById(shelterId);
    const adopter = await User.findById(adopterId);
    const pet = await Pet.findById(petId);

    console.log(adopterId);

    if (!petId || !adopterId || !shelterId || !slot) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const newRequest = await MeetGreet.create({
      petId,
      adopterId,
      shelterId,
      meetingDate,
      slot,
      message,
    });

     await sendEmail(
      shelter.email,
      "New Meet & Greet Request",
      `
      <h2>New Meet & Greet Request</h2>

      <p><strong>Pet:</strong> ${pet.name}</p>

      <p><strong>Adopter:</strong> ${adopter.name}</p>

      <p><strong>Email:</strong> ${adopter.email}</p>

      <p><strong>Meeting Date:</strong> ${meetingDate}</p>

      <p><strong>Slot:</strong> ${slot}</p>

      <p><strong>Message:</strong></p>

      <p>${message || "-"}</p>

      <br/>

      <p>Please login to your dashboard to Accept or Reject this request.</p>
      `
    );

    res.status(201).json({
      success: true,
      message: "Meet request created successfully",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get all meet requests for Adopter
export const getAdopterRequests = async (req, res) => {
  try {
    //const { id } = req.params;

    console.log("req.user",req.user);
    
    const adopterId = req.user.id;

    console.log("adopterId",adopterId)
    
    const requests = await MeetGreet.find({ adopterId })
      .populate("petId")
      .populate("shelterId", "name email");

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get all meet requests for Shelter
export const getShelterRequests = async (req, res) => {
  try {
    //const { id } = req.params;

    const shelterId = req.user.id;
    
    const requests = await MeetGreet.find({ shelterId })
      .populate("petId")
      .populate("adopterId", "name email");

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get single meet request by ID
export const getSingleMeetRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await MeetGreet.findById(id)
      .populate("petId")
      .populate("adopterId", "name email")
      .populate("shelterId", "name email");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Meet request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Update Meet Request Status (Shelter)
export const updateMeetStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date } = req.body;

   /*  const updatedRequest = await MeetGreet.findByIdAndUpdate(
      id,
      {
        status,
        ...(date && { date }),
      },
      { new: true }
    ); */

    const updatedRequest = await MeetGreet.findByIdAndUpdate(id,{ status },{ new: true });


    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Meet request not found",
      });
    }

    const request = await MeetGreet.findById(id)
    .populate("adopterId")
    .populate("petId");

    await sendEmail(
        request.adopterId.email,
        `Meet Request ${status.toUpperCase()}`,
        `
        <h2>Your Meet Request has been ${status}</h2>

        <p><strong>Pet:</strong> ${request.petId.name}</p>

        <p><strong>Date:</strong> ${request.meetingDate}</p>

        <p><strong>Slot:</strong> ${request.slot}</p>

        <p>Status:
            <strong>${status.toUpperCase()}</strong>
        </p>

        <br/>

        ${
          status === "accepted"
            ? "<p>Please visit the shelter at the scheduled time.</p>"
            : "<p>Please choose another available slot.</p>"
        }
        `
    );



    if (status === "accepted") {

      await MeetGreet.updateMany(
        {
          shelterId: updatedRequest.shelterId,
          meetingDate: updatedRequest.meetingDate,
          slot: updatedRequest.slot,
          status: "pending",
          _id: { $ne: updatedRequest._id },
        },
        {
          $set: {
            status: "rejected",
          },
        }
      );

    }

    res.status(200).json({
      success: true,
      message: "Meet request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Delete Meet Request
export const deleteMeetRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await MeetGreet.findByIdAndDelete(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Meet request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Meet request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAvailableSlots = async (req, res) => {
  try {

    console.log("Params:", req.params);
    console.log("Query:", req.query);


    const { shelterId } = req.params;
    const { meetingDate } = req.query;

    console.log("Shelter ID:", shelterId);
    console.log("Meeting Date:", meetingDate);

    const allSlots = [
      "09:00-09:30",
      "09:30-10:00",
      "10:00-10:30",
      "10:30-11:00",
      "11:00-11:30",
      "11:30-12:00",
      "02:00-02:30",
      "02:30-03:00",
      "03:00-03:30",
      "03:30-04:00",
    ];

    const bookedSlots = await MeetGreet.find({
      shelterId,
      meetingDate,
      status: "accepted",
    }).select("slot");

    console.log("Booked Slots:", bookedSlots);

    const booked = bookedSlots.map(item => item.slot);

    console.log("Booked:", booked);

    const slots = allSlots.map(slot => ({
      slot,
      available: !booked.includes(slot),
    }));

    console.log("Slots:", slots);

    res.status(200).json({
      success: true,
      data: slots,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};