import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { TypeFourth, Alltype } from '@/utils/Modal/typeSchema';

if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(){
    try{
        const fourthType = await TypeFourth.find();
        return NextResponse.json(fourthType)
    }catch(err){
        return NextResponse.json({error:'Something went wrong!'})
    }
}

export async function POST(request) {
    const payload = await request.json();
    
    try {
      const newFourthTypes = new TypeFourth(payload);
      await newFourthTypes.save();
  
      // Get the object IDs of the newly created documents
      const newFourthTypesIds = newFourthTypes._id;
  
      // // Assuming you want to update the `newArrival` field in the `Allproduct` collection
      await Alltype.findOneAndUpdate(
        {}, // Specify the query to find the document to update, or {} to update the first document found
        { $push: { typefourth: [ newFourthTypesIds ] } },
        { new: true, upsert: true } // Create a new document if none exists
      );
  
      return NextResponse.json({ ok: true });
    } catch (err) {
      return NextResponse.json({ error: 'Something went wrong!', details: err.messageFirstType})
    }
}