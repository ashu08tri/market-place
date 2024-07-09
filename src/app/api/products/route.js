import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Allproduct } from '@/utils/schema';

if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET() {
    try {
      const allproduct = await Allproduct.find()
        .populate('sale')
        .populate('bestSeller')
        .populate('newArrival')
        .exec();
      return NextResponse.json(allproduct);
    } catch (err) {
        console.log(err);
      return NextResponse.json({ error: err });
    }
  }