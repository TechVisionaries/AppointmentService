import Appointment from '../models/appointmentModel.js';

// Controller to create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { patientId = null, doctorId = null, date = new Date(), time = "00:00", reason = "No reason provided" } = req.body;
    console.log({ patientId, doctorId, date, time, reason });
    
    const newAppointment = await Appointment.create({ patientId, doctorId, date, time, reason });
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

// Controller to get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

// Controller to get a specific appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error });
  }
};

// Controller to update an appointment by ID
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorId, date, time, reason } = req.body;
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      appointment.patientId = patientId || appointment.patientId;
      appointment.doctorId = doctorId || appointment.doctorId;
      appointment.date = date || appointment.date;
      appointment.time = time || appointment.time;
      appointment.reason = reason || appointment.reason;
      await appointment.save();
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error updating appointment", error });
  }
};

// Controller to delete an appointment by ID
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      await appointment.destroy();
      res.status(200).json({ message: "Appointment deleted successfully" });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

export {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
