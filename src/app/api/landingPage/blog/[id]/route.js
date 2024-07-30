import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Blog } from "@/utils/Modal/LandingPageSchema";

if (!mongoose.connection.readyState) {
    mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function GET(request, {params}){
    const {id} = params;
    try{
        const blog = await Blog.findOne({_id: id});
        return NextResponse.json(blog);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 