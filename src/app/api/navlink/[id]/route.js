import mongoose from "mongoose";
import { Link } from "@/utils/Modal/links";
import { NextResponse } from "next/server";

if (!mongoose.connection.readyState) {
    mongoose.connect("mongodb://127.0.0.1:27017/ecom")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Connection to MongoDB failed:", err));
  }

// export async function PUT(request){
//     const payload = await request.json();
//     try{
//         const updateLink = await Link.updateMany({_id: ''},{})
//     }catch(err){
//         return NextResponse.json({message: err.message})
//     }
// }