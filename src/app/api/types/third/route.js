import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { TypeThird, Alltype } from '@/utils/Modal/typeSchema';

if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(){
    try{
        const thirdType = await TypeThird.find();
        return NextResponse.json(thirdType)
    }catch(err){
        return NextResponse.json({error:'Something went wrong!'})
    }
}

export async function POST(request) {
    const data =  
      {
        title: 'GOLDIE TOP INTIMACY',
        quantity: {
          size: [
            { quantity: 5, size: "S" },
            { quantity: 4, size: "M" },
            { quantity: 8, size: "L" },
            { quantity: 10, size: "XL" }
          ]
        },
        amount: 400,
        img: ['https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio_March2022_-1130_6f2faacc-4c10-4238-8bee-d692a53c11f0.jpg']
      };
  
    try {
      const newThirdTypes = new TypeThird(data);
      await newThirdTypes.save();
  
      // Get the object IDs of the newly created documents
      const newThirdTypesIds = newThirdTypes._id;
  
      // // Assuming you want to update the `newArrival` field in the `Allproduct` collection
      await Alltype.findOneAndUpdate(
        {}, // Specify the query to find the document to update, or {} to update the first document found
        { $push: { typethird: [ newThirdTypesIds ] } },
        { new: true, upsert: true } // Create a new document if none exists
      );
  
      return NextResponse.json({ ok: true });
    } catch (err) {
      return NextResponse.json({ error: 'Something went wrong!', details: err.messageFirstType})
    }
}