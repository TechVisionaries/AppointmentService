import express from 'express';
import bodyParser from 'body-parser'; 
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import appointmentRoutes from './routes/appointmentRoutes.js';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5005;

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true, 
    optionsSuccessStatus: 200, 
};
const app = express(); 

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

// routes
app.use('/api/appointments', appointmentRoutes);


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get('/api/appointments/*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => res.send('Server is ready!'));
    app.get('/api/appointments/health', (req, res) => res.send('Server is ready!'));
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', async () => {
    await connectDB();
    console.log(`Server is up and running on port: ${PORT}`);
});
