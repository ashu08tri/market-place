import mongoose from "mongoose";
import { Link } from "@/utils/Modal/links";
import { NextResponse } from "next/server";

if (!mongoose.connection.readyState) {
    mongoose.connect("mongodb://127.0.0.1:27017/ecom")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Connection to MongoDB failed:", err));
  }

export async function GET(){
    try{
        const link = await Link.find();
        return NextResponse.json(link);
    }catch(err){
        return NextResponse.json({message: err.message})
    }
}

export async function POST(request) {
    const data = [
      {
        title: 'New In',
        subLinks: [
          {
            title: 'Featured',
            sublink: [
              { url: '/collections/allproducts/sale', title: 'Sale' },
              { url: '/collections/allproducts/new_arrivals', title: 'New Arrivals' },
              { url: '/collections/allproducts/best_seller', title: 'Best Seller' },
              { url: '/shop_all', title: 'Shop All' },
            ],
          },
          {
            title: 'Types',
            sublink: [
              { url: '/types/type1', title: 'One Piece Swimsuits' },
              { url: '/types/type2', title: 'Two Piece Swimsuits' },
              { url: '/types/type3', title: 'Bikini Tops' },
              { url: '/types/type4', title: 'Bikini Bottoms' },
              { url: '/shop_all', title: 'Shop All' },
            ],
          },
          {
            title: 'Collections',
            sublink: [
              { url: '/2nd items', title: '2nd items' },
              { url: '/3rd item', title: '3rd item' },
              { url: '/4th', title: '4th' },
              { url: '/5th', title: '5th' },
            ],
          },
        ],
        images: [
          { img: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-205-min.jpg', alt: 'img', text: 'some text' },
          { img: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_-44-min.jpg', alt: 'img', text: 'some text' },
        ],
      },
      {
        title: 'Swimwear',
        images: [
          { img: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-968-min.jpg', alt: 'img', text: 'some text' },
          { img: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-126-min.jpg', alt: 'img', text: 'some text' },
          { img: 'https://sahara-theme.myshopify.com/cdn/shop/files/onepiece-1-min.jpg', alt: 'img', text: 'some text' },
          { img: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_-26-min.jpg', alt: 'img', text: 'some text' },
          { img: 'https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-73-min.jpg', alt: 'img', text: 'some text' },
        ],
      },
    ];
  
    try {
      const navLink = await Link.insertMany(data);
      return NextResponse.json(navLink);
    } catch (err) {
      console.error('Error inserting navigation data:', err);
      return NextResponse.json({ message: 'Error inserting navigation data', details: err.message });
    }
  }