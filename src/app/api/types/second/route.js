import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { TypeSecond, Alltype } from '@/utils/Modal/typeSchema';

if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(){
    try{
        const secondType = await TypeSecond.find();
        return NextResponse.json(secondType)
    }catch(err){
        return NextResponse.json({error:'Something went wrong!'})
    }
}

export async function POST(request) {
    const data =  
      {
        title: 'NALU TOP COCONUT',
        quantity: {
          size: [
            { quantity: 5, size: "S" },
            { quantity: 4, size: "M" },
            { quantity: 2, size: "L" },
            { quantity: 6, size: "XL" }
          ]
        },
        amount: 500,
        img: ['https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio-047.jpg']
      };
  
    try {
      const newSecondTypes = new TypeSecond(data);
      await newSecondTypes.save();
  
      // Get the object IDs of the newly created documents
      const newSecondTypesIds = newSecondTypes._id;
  
      // // Assuming you want to update the `newArrival` field in the `Allproduct` collection
      await Alltype.findOneAndUpdate(
        {}, // Specify the query to find the document to update, or {} to update the first document found
        { $push: { typesecond: [ newSecondTypesIds ] } },
        { new: true, upsert: true } // Create a new document if none exists
      );
  
      return NextResponse.json({ ok: true });
    } catch (err) {
      return NextResponse.json({ error: 'Something went wrong!', details: err.messageFirstType})
    }
}