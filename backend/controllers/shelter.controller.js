import Shelter from "../models/Shelter.js";

export const createShelter = async(req,res)=>{
    try {
    const { name, address, contactInfo, description,ratingAvg } = req.body;
    const shelter = new Shelter({ name, address, contactInfo, description, ratingAvg });
    await shelter.save();
    res.status(201).json({ message: "Shelter created successfully", shelterId: shelter._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find().select("-__v");
    res.json(shelters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getShelterById = async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id).select("-__v");
    if (!shelter) return res.status(404).json({ message: "Shelter not found" });
    res.json(shelter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
