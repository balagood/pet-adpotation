import Application from "../models/Application.js"
import Pet from "../models/Pet.js";
import User from "../models/User.js";

import {sendEmail} from "../utils/sendEmail.js";

export const submitApplication = async (req, res) => {
  try {

    if (req.user.role !== "adopter") {
      return res.status(403).json({
        message: "Only adopters can apply for pets"
      });
    }
    const { petId, shelterId,status } = req.body;
    const userId = req.user.id; // from authMiddleware

    const pet = await Pet.findById(petId);

    if (!pet || !pet.shelterId) {
  return res.status(400).json({
    message: "Invalid pet data: shelter not assigned"
  });
}

    // if (!pet) {
    //   return res.status(404).json({ message: "Pet not found" });
    // }

    if (pet.status !== "available") {
      return res.status(400).json({
        message: "This pet is not available for adoption"
      });
    }

    // if (pet.status === "adopted") {
    //   return res.status(400).json({
    //     message: "This pet is already adopted"
    //   });
    // }

    //const application = new Application({ userId, petId, shelterId, status });
    //const existing = await Application.findOne({userId,petId,status: { $in: ["submitted", "approved","reviewed"] }});

    // if (existing) {
    //   return res.status(400).json({ message: "You already applied for this pet" });
    // }

    const existing = await Application.findOne({ userId, petId });

    if (existing && existing.status !== "rejected") {
      return res.status(400).json({
        message: "You already applied for this pet"
      });
    }

    const application = new Application({
      userId,
      petId,
      shelterId:pet.shelterId
    });
    await application.save();
    try{
      
      const shelter = await User.findById(pet.shelterId);
      const adopter = await User.findById(userId);
      //console.log(shelter);
     await sendEmail(
  shelter.email,
  "New Adoption Request",
  `
  <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- Header -->
      <div style="background:#4CAF50; padding:20px; text-align:center;">
        <h2 style="color:white; margin:0;">🐾 New Adoption Request</h2>
      </div>

      <!-- Body -->
      <div style="padding:25px; color:#333;">

        <p style="font-size:16px;">Hello Shelter Team,</p>

        <p style="font-size:15px; line-height:1.6;">
          You have received a new adoption request for your pet.
        </p>

        <!-- Info Box -->
        <div style="background:#f9f9f9; padding:15px; border-radius:8px; margin:20px 0;">
          <p style="margin:8px 0;"><strong>👤 Adopter Name:</strong> ${adopter.name}</p>
          <p style="margin:8px 0;"><strong>📧 Adopter Email:</strong> ${adopter.email}</p>
          <p style="margin:8px 0;"><strong>🐶 Pet Name:</strong> ${pet.name}</p>
        </div>

        <p style="font-size:14px; color:#555;">
          Please log in to your dashboard to review and respond to this request.
        </p>

        <!-- Button -->
        <div style="text-align:center; margin:25px 0;">
          <a href="http://localhost:5173"
             style="background:#4CAF50; color:white; padding:12px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">
            View Application
          </a>
        </div>

        <p style="font-size:12px; color:#888; text-align:center;">
          Pet Adoption System Notification 🐾
        </p>

      </div>
    </div>
  </div>
  `
);

      } catch (err) {
        console.log("Application Error:",err.response?.body || err.message || err)
    }
    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id || req.user._id })
      .populate("petId", "name breed")
      .populate("shelterId", "name location");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getApplicationsByShelter = async (req, res) => {
  try {
    const applications = await Application.find({ shelterId: req.user.id || req.user._id})
      .populate("userId", "name email")
      .populate("petId", "name breed");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["reviewed", "approved", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("userId", "name email")
     .populate("petId", "name");
    if (!application) return res.status(404).json({ message: "Application not found" });
      // If approved -> pet becomes adopted
    if (status === "approved") {
      await Pet.findByIdAndUpdate(
        application.petId,
        { status: "adopted" }
      );

      //Reject all other pending requests
      await Application.updateMany(
        {
          petId: application.petId,
          _id: { $ne: application._id },
          status: "submitted"
        },
        {
          status: "rejected"
        }
      );
      //console.log(application);
      const adopterEmail = application.userId.email;   // ✅ adopter from user table
      const petName = application.petId.name;
      try {
          await sendEmail(
  adopterEmail,
  "Adoption Approved 🎉",
  `
  <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <!-- Header -->
      <div style="background:#2ecc71; padding:25px; text-align:center;">
        <h1 style="color:white; margin:0;">🎉 Congratulations!</h1>
      </div>

      <!-- Body -->
      <div style="padding:25px; text-align:center;">

        <p style="font-size:18px; color:#333;">
          Your adoption request has been <b style="color:#2ecc71;">approved</b>!
        </p>

        <!-- Pet Card -->
        <div style="background:#f9f9f9; padding:20px; border-radius:10px; margin:20px 0;">
          <p style="font-size:16px; margin:5px 0;">
            🐶 <b>Pet Name:</b> ${petName}
          </p>
        </div>

        <p style="font-size:14px; color:#555; line-height:1.6;">
          We are excited to inform you that your adoption request has been successfully approved.
          You can now proceed with the next steps to welcome your new furry friend ❤️
        </p>

        <!-- Button -->
        <div style="margin:25px 0;">
          <a href="http://localhost:5173"
             style="background:#2ecc71; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-weight:bold;">
            View Details
          </a>
        </div>

        <p style="font-size:12px; color:#888;">
          Thank you for using our Pet Adoption Platform 🐾
        </p>

      </div>
    </div>
  </div>
  `
);
      } catch (err) {
        console.log("Application Error:",err.response?.body || err.message || err)
        //console.log("Email error (adopter):", emailErr.message);
      }
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
