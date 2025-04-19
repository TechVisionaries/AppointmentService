import express from 'express';
import { authLvl1, authLvl2 } from '../middleware/authMiddleware.js'; 
import {createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment} from '../controllers/appointmentController.js';

const router = express.Router();

// Route to create a new appointment
router.post('/', authLvl1, authLvl2, createAppointment);

// Route to get all appointments
router.get('/', authLvl1, getAppointments);

// Route to get a specific appointment by ID
router.get('/:id', authLvl1, getAppointmentById);

// Route to update an appointment by ID
router.put('/:id', authLvl1, authLvl2, updateAppointment);

// Route to delete an appointment by ID
router.delete('/:id', authLvl1, authLvl2, deleteAppointment);

export default router;
