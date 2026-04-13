import Pet from "../models/Pet.js"
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pets",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const upload = multer({ storage });
/* const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
 */


export const addPet = async (req, res) => {
  try {
    const { shelterId, name, age, breed, size, color, medicalHistory, status } = req.body;
    //const photoPaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const photoPaths = req.files? req.files.map(file => file.path): [];

    const pet = new Pet({
      shelterId,
      name,
      age,
      breed,
      size,
      color,
      medicalHistory,
      status,
      photos: photoPaths
    });

    await pet.save();
    res.status(201).json({ message: "Pet added successfully", pet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPets = async (req, res) => {
  try {
    const filters = {};
   /*  if (req.query.species) filters.species = req.query.species;
    if (req.query.breed) filters.breed = req.query.breed;
    if (req.query.age) filters.age = req.query.age;
    if (req.query.size) filters.size = req.query.size;
    if (req.query.color) filters.color = req.query.color;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.location) filters.location = req.query.location;
    if (req.query.location) filters.name = { $regex: req.query.name, $options: "i" }; ;*/
    
     if (req.query.species && req.query.species.trim() !== "") {
      filters.species = req.query.species;
    }
    if (req.query.breed && req.query.breed.trim() !== "") {
      filters.breed = req.query.breed;
    }
    if (req.query.age && req.query.age.trim() !== "") {
      filters.age = req.query.age;
    }
    if (req.query.size && req.query.size.trim() !== "") {
      filters.size = req.query.size;
    }
    if (req.query.color && req.query.color.trim() !== "") {
      filters.color = req.query.color;
    }
    if (req.query.status && req.query.status.trim() !== "") {
      filters.status = req.query.status;
    }
    if (req.query.location && req.query.location.trim() !== "") {
      filters.location = req.query.location;
    }
    if (req.query.name && req.query.name.trim() !== "") {
      filters.name = { $regex: req.query.name, $options: "i" }; // case-insensitive partial match
    }

    const pets = await Pet.find(filters).select("-__v");
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).select("-__v");
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updatePet = async (req, res) => {
  try {
    const updates = req.body;
    const photoPaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

   /*  if (photoPaths.length > 0) {
      updates.photos = photoPaths;
    } */

    if (req.files && req.files.length > 0) {
      updates.photos = req.files.map(file => file.path);
    }

    const pet = await Pet.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-__v");
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
