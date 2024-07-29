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

export async function GET(){
    try{
        const blog = await Blog.find();
        return NextResponse.json(blog);
    }catch(err){
        return NextResponse.json({error: err});
    }
} 

export async function POST(request){
    const payload = [
        {
          image: "https://sahara-theme.myshopify.com/cdn/shop/articles/3-min.jpg",
          title: "The Perfect Black Bikini",
          desc: "As summer approaches, there's one fashion staple that never goes out of style: the black bikini. Versatile, timeless, and eternally chic, the black bikini is a must-have in ev...",
        },
        {
          image: "https://sahara-theme.myshopify.com/cdn/shop/articles/2-min.jpg",
          title: "Your Beach Essentials",
          desc: "Whether you're planning a beach day with friends or a solo vacation, it's important to be prepared. Here are some essential items to pack before heading to the beach!",
        },
        {
          image: "https://sahara-theme.myshopify.com/cdn/shop/articles/1-min.jpg",
          title: "Sahara Swimwear",
          desc: "Welcome to Sahara Swimwear - the perfect beachwear for those hot summer days! Whether you're looking for a classic one-piece or a trendy bikini, Sahara Swimwear",
        },
        {
          image: "https://sahara-theme.myshopify.com/cdn/shop/articles/FAE_BrentBielmann0080-min.jpg",
          title: "Our New Collection: Havana Tropical",
          desc: "Introducing the newest collection of women's swimwear from Sahara, the Havana Tropical line! Get ready to be transported to a sunny paradise with this vibrant and stylish swimwe...",
        },
        {
          image: "https://sahara-theme.myshopify.com/cdn/shop/articles/FAE_Hotel_Sages_-717_3_-min.jpg",
          title: "Sustainable Swimwear",
          desc: "Sustainable swimwear has become an increasingly popular topic in recent years, as the fashion industry has become more aware of the sustainability issues surrounding the",
        },
      ];
    try{
        await Blog.insertMany(payload);
        return NextResponse.json({ok:true});
    }catch(err){
        console.log(err);
        return NextResponse.json({status: 500})
    }
}