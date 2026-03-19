import Foster from "../models/Foster.js";
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
};
