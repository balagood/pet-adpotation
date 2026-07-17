import FosterUpdate from "../models/FosterUpdate.js";
import Foster from "../models/Foster.js";
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
 * Foster Parent adds progress update
 * POST /foster-update
 * Role : Foster
 * ======================================================
 */

export const addFosterUpdate = async (req, res) => {
  try {

    if (req.user.role !== "foster") {
      return res.status(403).json({
        success: false,
        message: "Only foster parents can add updates.",
      });
    }

    const photoPaths = req.files?.photos
      ? req.files.photos.map(file => file.path)
      : [];

    console.log(req.body);

    const {
      fosterId,
      petId,
      description,
      healthStatus,
      weight,
      photos,
    } = req.body;

    /* if (!fosterId || !petId || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    } */

    if (!fosterId || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    const foster = await Foster.findById(fosterId);

    if (!foster) {
      return res.status(404).json({
        success: false,
        message: "Foster record not found.",
      });
    }

    if (foster.fosterParentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const update = await FosterUpdate.create({
      fosterId,
      petId: foster.petId,
      fosterParentId: req.user.id,
      description,
      healthStatus,
      weight,
      photos:photoPaths,
    });

    const shelter = await User.findById(foster.shelterId);

    try {

      await sendEmail(
        shelter.email,
        "New Foster Progress Update",
        `
        <h2>New Foster Update</h2>

        <p>A foster parent has posted a new progress update.</p>

        <p><strong>Description:</strong> ${description}</p>

        <p><strong>Health Status:</strong> ${healthStatus}</p>

        <p><strong>Weight:</strong> ${weight} kg</p>
        `
      );

    } catch (err) {

      console.log(
        "Email Error:",
        err.response?.body || err.message
      );

    }

    res.status(201).json({
      success: true,
      message: "Foster update added successfully.",
      data: update,
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
 * Get all updates for a Foster Pet
 * GET /foster-update/:fosterId
 * Role : Foster / Shelter
 * ======================================================
 */

export const getFosterUpdates = async (req, res) => {
  try {

    const { fosterId } = req.params;

    const foster = await Foster.findById(fosterId);

    if (!foster) {
      return res.status(404).json({
        success: false,
        message: "Foster record not found.",
      });
    }

    // Only the assigned foster parent or shelter can view updates
    if (
      foster.fosterParentId.toString() !== req.user.id &&
      foster.shelterId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    const updates = await FosterUpdate.find({ fosterId })
      .populate("fosterParentId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: updates.length,
      data: updates,
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
 * Update Foster Progress
 * PUT /foster-update/:id
 * Role : Foster
 * ======================================================
 */

export const updateFosterUpdate = async (req, res) => {
  try {

    if (req.user.role !== "foster") {
      return res.status(403).json({
        success: false,
        message: "Only foster parents can update progress.",
      });
    }

    const update = await FosterUpdate.findById(req.params.id);

    if (!update) {
      return res.status(404).json({
        success: false,
        message: "Foster update not found.",
      });
    }

    // Only the foster parent who created the update can edit it
    if (update.fosterParentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    const {
      description,
      healthStatus,
      weight,
      photos,
    } = req.body;

    if (description !== undefined) {
      update.description = description;
    }

    if (healthStatus !== undefined) {
      update.healthStatus = healthStatus;
    }

    if (weight !== undefined) {
      update.weight = weight;
    }

    if (photos && photos.length > 0) {
      update.photos = photos;
    }

    await update.save();

    const foster = await Foster.findById(update.fosterId);
    const shelter = await User.findById(foster.shelterId);

    try {

      await sendEmail(
        shelter.email,
        "Foster Progress Updated",
        `
        <h2>Foster Progress Updated</h2>

        <p>A foster parent has updated the pet progress.</p>

        <p><strong>Description:</strong> ${update.description}</p>

        <p><strong>Health Status:</strong> ${update.healthStatus}</p>

        <p><strong>Weight:</strong> ${update.weight} kg</p>

        <p>Please login to your dashboard to review the latest update.</p>
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
      message: "Foster update modified successfully.",
      data: update,
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
 * Delete Foster Progress Update
 * DELETE /foster-update/:id
 * Role : Foster
 * ======================================================
 */

export const deleteFosterUpdate = async (req, res) => {
  try {

    if (req.user.role !== "foster") {
      return res.status(403).json({
        success: false,
        message: "Only foster parents can delete updates.",
      });
    }

    const update = await FosterUpdate.findById(req.params.id);

    if (!update) {
      return res.status(404).json({
        success: false,
        message: "Foster update not found.",
      });
    }

    // Only the owner can delete the update
    if (update.fosterParentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    await FosterUpdate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Foster update deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};