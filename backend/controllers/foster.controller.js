/*import Foster from "../models/Foster.js";
import Pet from "../models/Pet.js";
export const createFoster = async (req, res) => {
  try {
    const { petId, endDate } = req.body;
    const userId = req.user._id; // from authMiddleware

    // Create foster record
    const foster = new Foster({ userId, petId, endDate });
    await foster.save();

    // Update pet status to fostered
    await Pet.findByIdAndUpdate(petId, { status: "fostered" });

    res.status(201).json({ message: "Foster created successfully", foster });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getFostersByUser = async (req, res) => {
  try {
    const fosters = await Foster.find({ userId: req.params.userId })
      .populate("petId", "name breed status")
      .populate("userId", "name email");
    res.json(fosters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getFostersByShelter = async (req, res) => {
  try {
    const fosters = await Foster.find({ shelterId: req.params.shelterId })
      .populate("petId", "name breed status")
      .populate("userId", "name email");
    res.json(fosters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateFoster = async (req, res) => {
  try {
    const foster = await Foster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!foster) return res.status(404).json({ message: "Foster not found" });
    res.json(foster);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const endFoster = async (req, res) => {
  try {
    const foster = await Foster.findByIdAndUpdate(
      req.params.id,
      { status: "completed", endDate: new Date() },
      { new: true }
    );
    if (!foster) return res.status(404).json({ message: "Foster not found" });

    // Reset pet status back to available
    await Pet.findByIdAndUpdate(foster.petId, { status: "available" });

    res.json({ message: "Foster ended successfully", foster });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/

import Foster from "../models/Foster.js";
import Pet from "../models/Pet.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async(req, file) => {
    if (file.fieldname  === "videos") {
      return {
        folder: "pets/videos",
        resource_type: "video",
        allowed_formats: ["mp4", "mov"],
      };
    }
    if(file.fieldname  === "photos"){
      return {
        folder: "pets/images",
        resource_type: "image",
        allowed_formats: ["jpg", "png", "jpeg"],
      };
    }
    throw new Error("Invalid file field");
  },
  // params: {
  //   folder: "pets",
  //   allowed_formats: ["jpg", "png", "jpeg","mp4","mov"],
  // },
});

export const upload = multer({ storage });


/**
 * ======================================================
 * Foster uploads a pet
 * POST /foster
 * Role : Foster
 * ======================================================
 */

export const createFosterRequest = async (req, res) => {
  try {
    if (req.user.role !== "foster") {
      return res.status(403).json({
        message: "Only foster parents can upload pets.",
      });
    }

    const {
      name,
      age,
      breed,
      size,
      color,
      medicalHistory,
      location,
      shelterId,
      startDate,
      endDate,
      notes,
    } = req.body;


    if (
      !name ||
      !age ||
      !breed ||
      !size ||
      !color ||
      !location ||
      !shelterId
    ) {
      return res.status(400).json({
        message: "Required fields are missing.",
      });
    }

    if (!startDate) {
      return res.status(400).json({
        message: "Start date is required.",
      });
    }

    if (age < 0 || age > 25) {
      return res.status(400).json({
        message: "Invalid age.",
      });
    }

    const photoPaths = req.files?.photos
      ? req.files.photos.map(file => file.path)
      : [];

    const videoPaths = req.files?.videos
      ? req.files.videos.map(file => file.path)
      : [];


    const shelter = await User.findById(shelterId);

    /* if (!shelter || shelter.role !== "shelter") {
      return res.status(404).json({
        message: "Shelter not found.",
      });
    } */

    if (!shelter) {
      return res.status(404).json({
        message: "Shelter not found",
      });
    }

    if (shelter.role !== "shelter") {
      return res.status(400).json({
        message: "Selected user is not a shelter",
      });
    }
    const fosterPet = await Foster.create({
      fosterParentId: req.user.id,
      shelterId,
      name,
      age,
      breed,
      size,
      color,
      medicalHistory,
      location,
      photos:photoPaths,
      videos:videoPaths,
      startDate,
      endDate,
      notes,
      status: "pending",
    });

    const fosterUser = await User.findById(req.user.id);

    try {
      await sendEmail(
        shelter.email,
        "New Foster Pet Request",
        `
          <h2>New Foster Pet Submitted</h2>

          <p><strong>Pet Name:</strong> ${name}</p>
          <p><strong>Breed:</strong> ${breed}</p>
          <p><strong>Foster Parent:</strong> ${fosterUser.name}</p>
          <p><strong>Email:</strong> ${fosterUser.email}</p>
          <p>Please login and review this pet.</p>
        `
      );
    } catch (emailError) {
      console.log("Email Error:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Foster pet submitted successfully.",
      data: fosterPet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ======================================================
 * Foster Dashboard
 * GET /foster/my
 * ======================================================
 */

export const getMyFosterPets = async (req, res) => {
  try {
    const pets = await Foster.find({
      fosterParentId: req.user.id,
    })
      .populate("shelterId", "name email")
      .populate("adopterId", "name email")
      .populate("petId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pets.length,
      data: pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * ======================================================
 * Shelter Dashboard
 * Get all foster pets assigned to this shelter
 * GET /foster/shelter
 * Role : Shelter
 * ======================================================
 */

export const getShelterFosterPets = async (req, res) => {
  try {

    if (req.user.role !== "shelter") {
      return res.status(403).json({
        success: false,
        message: "Only shelters can access this resource.",
      });
    }

    const fosterPets = await Foster.find({
      shelterId: req.user.id,
    })
      .populate("fosterParentId", "name email contactInfo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fosterPets.length,
      data: fosterPets,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ======================================================
 * Shelter reviews Foster Pet
 * PUT /foster/shelter/:id
 * Role : Shelter
 * ======================================================
 */

export const updateShelterStatus = async (req, res) => {
  try {

    if (req.user.role !== "shelter") {
      return res.status(403).json({
        success: false,
        message: "Only shelters can perform this action.",
      });
    }

    const { status, notes } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const fosterPet = await Foster.findById(req.params.id);

    if (!fosterPet) {
      return res.status(404).json({
        success: false,
        message: "Foster pet not found.",
      });
    }

    fosterPet.status = status;
    fosterPet.notes = notes || fosterPet.notes;
    fosterPet.requestedBy = req.user.id;

    await fosterPet.save();

    const fosterUser = await User.findById(fosterPet.fosterParentId);

    try {

      if (status === "accepted") {

        await sendEmail(
          fosterUser.email,
          "Shelter Accepted Your Foster Pet",
          `
            <h2>Congratulations!</h2>

            <p>Your foster pet <b>${fosterPet.name}</b> has been accepted by the shelter.</p>

            <p>Please login to your account and approve the shelter request.</p>
          `
        );

      } else {

        await sendEmail(
          fosterUser.email,
          "Shelter Rejected Your Foster Pet",
          `
            <h2>Foster Request Rejected</h2>

            <p>Unfortunately the shelter has rejected your foster pet.</p>

            <p><strong>Reason:</strong> ${notes || "No reason provided"}</p>
          `
        );

      }

    } catch (emailError) {

      console.log(
        "Email Error:",
        emailError.response?.body || emailError.message
      );

    }

    res.status(200).json({
      success: true,
      message:
        status === "accepted"
          ? "Shelter request sent successfully."
          : "Foster pet rejected successfully.",
      data: fosterPet,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


/**
 * ======================================================
 * Foster Parent accepts/rejects Shelter Request
 * PUT /foster/foster/:id
 * Role : Foster
 * ======================================================
 */

export const updateFosterStatus = async (req, res) => {
  try {

    if (req.user.role !== "foster") {
      return res.status(403).json({
        success: false,
        message: "Only foster parents can perform this action.",
      });
    }

    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const fosterPet = await Foster.findById(req.params.id);

    if (!fosterPet) {
      return res.status(404).json({
        success: false,
        message: "Foster pet not found.",
      });
    }

    // Only the owner of the foster pet can respond
    if (fosterPet.fosterParentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (status === "accepted") {

      // Create pet in Pet collection
      const pet = await Pet.create({
        shelterId: fosterPet.shelterId,
        name: fosterPet.name,
        age: fosterPet.age,
        breed: fosterPet.breed,
        size: fosterPet.size,
        color: fosterPet.color,
        medicalHistory: fosterPet.medicalHistory,
        location: fosterPet.location,
        photos: fosterPet.photos,
        videos: fosterPet.videos,
        status: "available",
      });

    //fosterPet.petId = pet._id;
      fosterPet.status = "available"
      await fosterPet.save();

      const shelter = await User.findById(fosterPet.shelterId);

      try {
        await sendEmail(
          shelter.email,
          "Foster Request Approved",
          `
            <h2>Foster Request Approved</h2>

            <p>The foster parent has approved your request.</p>

            <p><strong>Pet Name:</strong> ${pet.name}</p>

            <p>The pet is now available for adoption.</p>
          `
        );
      } catch (err) {
        console.log(
          "Email Error:",
          err.response?.body || err.message
        );
      }

      return res.status(200).json({
        success: true,
        message: "Pet published successfully.",
        pet,
      });
    }

    // Foster rejected shelter request
    fosterPet.status = "rejected";
    await fosterPet.save();

    const shelter = await User.findById(fosterPet.shelterId);

    try {
      await sendEmail(
        shelter.email,
        "Foster Request Rejected",
        `
          <h2>Request Rejected</h2>

          <p>The foster parent rejected your request for the pet:</p>

          <p><strong>${fosterPet.name}</strong></p>
        `
      );
    } catch (err) {
      console.log(
        "Email Error:",
        err.response?.body || err.message
      );
    }

    res.status(200).json({
      success: true,
      message: "Shelter request rejected.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


/**
 * ======================================================
 * Complete Foster Process
 * PUT /foster/complete/:id
 * Role : Foster
 * ======================================================
 */

export const completeFoster = async (req, res) => {
  try {

    if (req.user.role !== "foster") {
      return res.status(403).json({
        success: false,
        message: "Only foster parents can complete foster requests.",
      });
    }

    const fosterPet = await Foster.findById(req.params.id);

    if (!fosterPet) {
      return res.status(404).json({
        success: false,
        message: "Foster record not found.",
      });
    }

    if (fosterPet.fosterParentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    if (fosterPet.petId) {
      return res.status(400).json({
        success: false,
        message: "Pet has already been published.",
      });
    }

    const pet = await Pet.create({
      shelterId: fosterPet.shelterId,
      name: fosterPet.name,
      age: fosterPet.age,
      breed: fosterPet.breed,
      size: fosterPet.size,
      color: fosterPet.color,
      medicalHistory: fosterPet.medicalHistory,
      location: fosterPet.location,
      photos: fosterPet.photos,
      videos: fosterPet.videos,
      status: "available",
    });

  //fosterPet.petId = pet._id;
    fosterPet.status = "completed";
    fosterPet.endDate = new Date();

  //fosterPet.status = "available";
  //fosterPet.endDate = new Date();

    await fosterPet.save();

    const shelter = await User.findById(fosterPet.shelterId);

    try {

      await sendEmail(
        shelter.email,
        "Foster Process Completed",
        `
        <h2>Foster Process Completed</h2>

        <p>The foster parent has completed the fostering process.</p>

        <p><strong>Pet Name:</strong> ${fosterPet.name}</p>

        <p>Completion Date: ${new Date().toLocaleDateString()}</p>
        `
      );

    } catch (err) {

      console.log(
        "Email Error:",
        err.response?.body || err.message
      );

    }

    res.status(200).json({
      success: true,
      message: "Foster process completed successfully.",
      data: fosterPet,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getShelters = async (req, res) => {
  try {
    const shelters = await User.find(
      { role: "shelter" },
      "_id name email"
    );
    res.status(200).json(shelters);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};