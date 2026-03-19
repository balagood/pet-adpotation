import Application from "../models/Application.js"


export const submitApplication = async (req, res) => {
  try {
    const { petId, shelterId,userId,status } = req.body;
    //const userId = req.user._id; // from authMiddleware

    const application = new Application({ userId, petId, shelterId, status });
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
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: "Application not found" });
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
