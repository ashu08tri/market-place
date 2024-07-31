import mongoose from "mongoose";
import { MainCarousel } from "@/utils/data";
import { NextResponse } from "next/server";

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected"))
    .catch((err) => console.log("something Went Wrong", err));

export async function GET(){
    try{
        const data = await MainCarousel.find();
        return NextResponse.json(data);
    }catch(err){
        return NextResponse.json({message: err})
    }
};

export async function POST(request){
    const payload = await request.json();
    try{
        const newImage = new MainCarousel(payload);
        await newImage.save();
        return NextResponse.json({ok:true});
    }catch(err){
        return NextResponse.json({status: 500})
    }
}

export async function DELETE(request){
    const {imageURL} = await request.json();
    try{
        await MainCarousel.deleteOne({images: imageURL});
        return NextResponse.json({ok: true})
    }catch(err){
        return NextResponse.json({status: 500})
    }
}

// export async function POST(request){
//     const res = await fetch('https://api-preproduction.signzy.app/api/v3/aadhaar/verify', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'v4QnfEldJSCu25sKTJhZJ3FKgOb5waU5'
//         },
//         body: JSON.stringify({ uid: '867986257652' })
//       })
//       const data = await res.json()
//       return NextResponse.json()
// }
  