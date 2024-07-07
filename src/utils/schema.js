import mongoose from "mongoose";


// Users Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: [true, "Email is required"],
        unique: true,},
    password: String,
    accessToken: String
})

export const User = mongoose.models.users || mongoose.model('users',userSchema)

const cartItemSchema = new mongoose.Schema({
    id: Number,
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    img: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    availableQuantity: {
      type: Number,
      required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    sessionId: String,
  });
  
export const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
  
