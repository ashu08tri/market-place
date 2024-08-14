import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Address } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const address = await Address.find();
        return NextResponse.json(address);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 
