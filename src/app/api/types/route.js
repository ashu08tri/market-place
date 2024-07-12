import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Alltype } from '@/utils/Modal/typeSchema';

if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET() {
    try {
      const alltype = await Alltype.find()
        .populate('typefirst')
        .populate('typesecond')
        .populate('typethird')
        .populate('typefourth')
        .exec();
      return NextResponse.json(alltype);
    } catch (err) {
        console.log(err);
      return NextResponse.json({ error: err });
    }
  }