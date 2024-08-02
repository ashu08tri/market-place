import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Order } from '@/utils/schema';

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Connection to MongoDB failed:', err);
    });
}

export async function POST(request) {
    const { email, isAdmin } = await request.json();
    try {
        if (isAdmin) {
            const allOrders = await Order.find().populate('products');
            if (allOrders.length > 0) {
                return NextResponse.json(allOrders);
            } else {
                return NextResponse.json({ ok: false, message: `No orders are placed yet!` });
            }
        } else {
            const userOrders = await Order.find({ email }).populate('products');
            if (userOrders.length > 0) {
                return NextResponse.json(userOrders);
            } else {
                return NextResponse.json({ ok: false, message: `No order is associated with ${email} !` });
            }
        }
    } catch (err) {
        return NextResponse.json({ err });
    }
}
