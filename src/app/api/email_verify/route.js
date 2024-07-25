import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Order } from '@/utils/schema';

if (!mongoose.connection.readyState) {
    mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

  
  export async function POST(request) {
    const { email } = await request.json();
    try {
      const userOrders = await Order.find({ email }).populate('products');
      if (userOrders.length > 0) {
        return NextResponse.json(userOrders);
      } else {
        return NextResponse.json({ ok: false, message: `User ${email} not registered!` });
      }
    } catch (err) {
      return NextResponse.json({ err });
    }
  }