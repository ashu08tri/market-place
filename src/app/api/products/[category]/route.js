import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { AllProduct } from '@/utils/schema'; // Adjust path as per your schema location

// Ensure mongoose connects only once
if (!mongoose.connection.readyState) {
  mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Connection to MongoDB failed:', err);
  });
}

export async function GET(request,{params}){
  try{
    const {category} = params;
    const product = await AllProduct.findOne({mainTitle: category});
    if(product){
      return NextResponse.json(product)
    }else{
      return NextResponse.json({status: 404})
    }
  }catch(err){
    console.error(err)
  }
}

export async function POST(request,{params}) {
  const {category} = params;
  const data =  {
   mainTitle: 'sale',
     product: [{
        title: 'Kendal top Flirt',
        quantity: {
          size: [
            { quantity: 5, size: "S" },
            { quantity: 2, size: "M" },
            { quantity: 1, size: "L" },
            { quantity: 6, size: "XL" }
          ]
        },
        amount: 350,
        img: ['https://cdn.shopify.com/s/files/1/0670/8599/2251/products/Photo29-3-22_105222am.jpg']
      }]
    }

  try {

    const existingData = await AllProduct.findOne({mainTitle: category})
    if(existingData){
      existingData.product.push(data.product[0]);
      await existingData.save();
    }else{
      const newData = new AllProduct(data)
      await newData.save();
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong!', details: err.message });
  }
}
