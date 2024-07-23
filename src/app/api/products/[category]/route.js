import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Featured } from '@/utils/schema';


if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(request, { params }) {
  try {
    const { category } = params;
    if (category === 'shop_all') {
      const Products = await Featured.find();
      const allProduct = Products.flatMap(item => item.product)
      return NextResponse.json(allProduct);
    } else {
      const product = await Featured.findOne({ mainTitle: category });
      if (product) {
        return NextResponse.json(product)
      } else {
        return NextResponse.json({ status: 404 })
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export async function POST(request, { params }) {
  const { category } = params;
  const data = await request.json();

  try {

    const existingData = await Featured.findOne({ mainTitle: category })
    if (existingData) {
      existingData.product.push(data.product[0]);
      await existingData.save();
    } else {
      const newData = new Featured(data)
      await newData.save();
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong!', details: err.message });
  }
}
