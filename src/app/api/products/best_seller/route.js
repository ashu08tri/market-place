import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { BestSeller, Allproduct } from '@/utils/schema';

if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(){
    try{
        const bestSeller = await BestSeller.find();
        return NextResponse.json(bestSeller)
    }catch(err){
        return NextResponse.json({error:'Something went wrong!'})
    }
}

export async function POST(request) {
  const data =  
    {
      title: 'Kendal Mid Flirt',
      quantity: {
        size: [
          { quantity: 5, size: "S" },
          { quantity: 2, size: "M" },
          { quantity: 1, size: "L" },
          { quantity: 6, size: "XL" }
        ]
      },
      amount: 300,
      img: ['https://cdn.shopify.com/s/files/1/0670/8599/2251/products/Photo29-3-22_105222am.jpg']
    };

  try {
    const newBestSellers = new BestSeller(data);
    await newBestSellers.save();

    // Get the object IDs of the newly created documents
    const newBestSellerIds = newBestSellers._id;

    // // Assuming you want to update the `newArrival` field in the `Allproduct` collection
    const allProductUpdate = await Allproduct.findOneAndUpdate(
      {}, // Specify the query to find the document to update, or {} to update the first document found
      { $push: { bestSeller: [ newBestSellerIds ] } },
      { new: true, upsert: true } // Create a new document if none exists
    );

    return NextResponse.json({ newBestSellers, allProductUpdate });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong!', details: err.message });
  }
}