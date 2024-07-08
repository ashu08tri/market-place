import Razorpay from "razorpay";
import shortid from "shortid";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const {taxAmt} = await request.json();

  if (!taxAmt) {
    return NextResponse.json({ error: "Tax amount is required" });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_APIKEY,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });

  const payment_capture = 1;
  const amount = taxAmt;
  const currency = "INR";
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create Razorpay order" });
  }
};
