import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { DualTile } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(request){
    try{
        const dualTiles = await DualTile.find();
        return NextResponse.json(dualTiles);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 


