import Appointment from "../models/Appointment.js";

// Create appointment
export const createAppointment = async (req, res) => {
  try {
    const { petId, shelterId, date, notes } = req.body;
    const userId = req.user._id; // from authMiddleware

    const appointment = new Appointment({ userId, petId, shelterId, date, notes });
    await appointment.save();

    res.status(201).json({ message: "Appointment created successfully", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get appointments by user
export const getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId })
      .populate("petId", "name breed")
      .populate("shelterId", "name location");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get appointments by shelter
export const getAppointmentsByShelter = async (req, res) => {
  try {
    const appointments = await Appointment.find({ shelterId: req.params.shelterId })
      .populate("userId", "name email")
      .populate("petId", "name breed");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update appointment status or details
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
