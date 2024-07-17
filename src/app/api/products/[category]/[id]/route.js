import { NextResponse } from 'next/server';
import { Featured } from '@/utils/schema'; 
import mongoose from 'mongoose';

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
      const { category, id } = params;
  
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
      }
      
      if (category === 'shop_all') {
        const products = await Featured.find();
        const allProducts = products.flatMap(item => item.product);
        const singleItem = allProducts.find(item => item._id.toString() === id);
        if (singleItem) {
          return NextResponse.json(singleItem);
        } else {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
      }
     
      const product = await Featured.findOne(
        { mainTitle: category, 'product._id': id },
        { 'product.$': 1 } // This will only return the matched product in the array
      );
  
      if (product && product.product.length > 0) {
        return NextResponse.json(product.product[0]);
      } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Something went wrong', details: err.message }, { status: 500 });
    }
  }
