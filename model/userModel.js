import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: false }, // No unique constraint
    // title: String,
    name: String,
    lines: String,
    socialLink: String,
});

export default mongoose.model("users", userSchema);