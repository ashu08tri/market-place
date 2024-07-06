import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/utils/schema";


if (!mongoose.connection.readyState) {
  mongoose.connect("mongodb://127.0.0.1:27017/ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection to MongoDB failed:", err));
}

export async function POST(request) {
  try {
    const payload = await request.json();

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return NextResponse.json({ message: "No user found!", ok: false }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Email or password is incorrect!", ok: false }, { status: 401 });
    }

    const tokenPayload = { email: user.email };
    const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    // Store the access token in the user's record
    user.accessToken = accessToken;
    await user.save();

    return NextResponse.json({ res:accessToken, ok: true });
  } catch (e) {
    console.error("Error during authentication:", e.message);
    return NextResponse.json({ message: "Something went wrong!", error: e.message, ok: false }, { status: 500 });
  }
}
