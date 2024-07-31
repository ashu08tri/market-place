import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { CartItem } from '@/utils/schema';

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection to MongoDB failed:', err);
    });
  }

export async function DELETE(request,{params}){
    try{
        const {id} = params;
        console.log(id);
        await CartItem.deleteOne({_id: id})
        return NextResponse.json({ok:true})
    }catch(err){
        console.error(err)
    }
}