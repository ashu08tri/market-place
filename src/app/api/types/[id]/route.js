import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Alltype } from '@/utils/Modal/typeSchema'; // Adjust path as per your schema location

// Ensure mongoose connects only once
if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Fetch all products and populate arrays
    const alltype = await Alltype.find()
    .populate('typefirst')
    .populate('typesecond')
    .populate('typethird')
    .populate('typefourth')
      .exec();

    // Combine arrays and filter by _id
    let combinedProducts = [];
    alltype.forEach(product => {
      combinedProducts.push(...product.typefirst, ...product.typesecond, ...product.typethird, ...product.typefourth);
    });

    // Find item by _id
    const item = combinedProducts.find(item => item._id.toString() === id);

    if (!item) {
      return NextResponse.json({ error: `Item with id ${id} not found` }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (err) {
    console.error('Error fetching item:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
