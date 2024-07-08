import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Order, Payment } from '@/utils/schema';

if (!mongoose.connection.readyState) {
    mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

  export async function GET(request){
    try{
      const populatedOrder = await Order.findById('668be6c9093ed1c309ca9936').populate('products').exec();
      return NextResponse.json(populatedOrder)
    }catch(err){
      return NextResponse.json({err})
    }
  }

  export async function POST(request) {
    const payload = await request.json();
  
    try {
      const { products, ...orderData } = payload;
  
      // Check if each product exists in the Payment collection
      const paymentIds = await Payment.find({ _id: { $in: products } }).select('_id');
  
      if (paymentIds.length !== products.length) {
        throw new Error('One or more products do not exist');
      }
  
      const order = new Order({ ...orderData, products: paymentIds.map(p => p._id) });
      await order.save();
  
      return NextResponse.json(populatedOrder);
    } catch (err) {
      console.error('Error creating order:', err);
      return NextResponse.json({ ok: false, error: err.message });
    }
  }

 