import Application from "../models/Application.js"
import Pet from "../models/Pet.js";






export const submitApplication = async (req, res) => {
  try {
    const { petId, shelterId,status } = req.body;
    const userId = req.user._id; // from authMiddleware

    //const application = new Application({ userId, petId, shelterId, status });
    const existing = await Application.findOne({userId,petId,status: { $in: ["submitted", "approved"] }});

    if (existing) {
      return res.status(400).json({ message: "You already applied for this pet" });
    }

    const application = new Application({
      userId,
      petId,
      shelterId
    });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId })
      .populate("petId", "name breed")
      .populate("shelterId", "name location");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getApplicationsByShelter = async (req, res) => {
  try {
    const applications = await Application.find({ shelterId: req.params.shelterId })
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
    );
    if (!application) return res.status(404).json({ message: "Application not found" });
      // If approved -> pet becomes adopted
    if (status === "approved") {
      await Pet.findByIdAndUpdate(
        application.petId,
        { status: "adopted" }
      );

      // Reject all other pending requests
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
