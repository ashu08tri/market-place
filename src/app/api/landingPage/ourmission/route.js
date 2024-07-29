import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { OurMission } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(){
    try{
        const mission = await OurMission.find();
        return NextResponse.json(mission);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request){
    const payload = {  
                title: 'Our Mission',
                desc: "Escape to sunnier days with Sahara, the sustainable swimwear brand that brings together fashion, function, and sustainability. Our collection features beautiful images of confident models rocking our chic and stylish swimsuits, all while enjoying the summer vibes. But our brand is about more than just looking good – it's about doing good, too. That's why we use eco-friendly materials and ethical production practices to create swimsuits that not only make a statement, but also make a difference. Whether you're hitting the beach or the pool, Sahara has the perfect swimsuit for you. So dive in and join us in making a positive impact on the planet, one swimsuit at a time."  
    };
    try{
        const collection = new OurMission(payload);
        await collection.save();
        return NextResponse.json({ok:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({status: 500})
    }
}