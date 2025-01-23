import express from "express";
import User from "../model/userModel.js";

const route = express.Router();

// POST: Add a new user
route.post("/create", async (req, res) => {
    const { name, email, lines, socialLink } = req.body;
    try {
        const newUser = new User({ name, email, lines, socialLink });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
});

// GET: Retrieve all users
route.get("/fetch", async (_, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

export default route;