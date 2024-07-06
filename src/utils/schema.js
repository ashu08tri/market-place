import mongoose from "mongoose";


// Users Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: [true, "Email is required"],
        unique: true,},
    password: String,
    accessToken: String
})

export const User = mongoose.models.users || mongoose.model('users',userSchema)