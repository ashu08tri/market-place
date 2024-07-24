import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Type } from '@/utils/schema'; // Adjust path as per your schema location

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
    const { category } = params;
    const categories = await Type.find().select('mainTitle -_id');
    const uniqueCategories = categories.map(cat => cat.mainTitle);

    if (category === 'shop_all') {
      const Products = await Type.find();
      const allProduct = Products.flatMap(item => item.product);
      return NextResponse.json({ products: allProduct, categories: uniqueCategories });
    } else {
      const product = await Type.findOne({ mainTitle: category });
      if (product) {
        return NextResponse.json({ products: product.product, categories: uniqueCategories });
      } else {
        return NextResponse.json({ status: 404, categories: uniqueCategories });
      }
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request,{params}) {
  const {category} = params;
  const data =  await request.json();

  try {

    const existingData = await Type.findOne({mainTitle: category})
    if(existingData){
      existingData.product.push(data.product[0]);
      await existingData.save();
    }else{
      const newData = new Type(data)
      await newData.save();
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong!', details: err.message });
  }
}
