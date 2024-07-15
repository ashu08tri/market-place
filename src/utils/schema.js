import mongoose from "mongoose";


// Users Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String, required: [true, "Email is required"],
    unique: true,
  },
  password: String,
  accessToken: String,
  isAdmin: {type: Boolean, default: true}
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);

if (mongoose.models.NewArrival) {
  delete mongoose.models.NewArrival;
}

export const allProductSchema = new mongoose.Schema({
  mainTitle: String,
  product : [{
    title: String,
    amount: Number,
    img: [String],
    quantity : {
      size: [
        {
          quantity: Number,
          size: String
        }
      ]
    }
  }]
})

export const AllProduct = mongoose.models.AllProduct || mongoose.model('AllProduct', allProductSchema); 

const cartItemSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  img: [String],
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



const paymentSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  img: [String],
  amount: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  sessionId: String,
});

export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
  },
  createdAt: {type: Date, default: Date.now()},
  address: String,
  phoneNumber: Number,
  state: String,
  city: String,
  zipcode: Number,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }], 
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);


