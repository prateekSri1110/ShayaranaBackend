import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import route from './route/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(cors({
    origin: "https://shayarana.netlify.app",
    methods: ['GET','POST'],
    credentials: true,
}));
app.use(bodyParser.json());

// MongoDB Atlas Connection
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB Atlas");
        app.listen(PORT, () => {
            console.log(`Server is running on http://0.0.0.0:${PORT}`);
        });
    })
    .catch((error) => console.log("MongoDB Connection Error: ", error));

// Routes
app.use("/", route);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;