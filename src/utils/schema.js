import mongoose from "mongoose";


// Users Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String, required: [true, "Email is required"],
    unique: true,
  },
  password: String,
  accessToken: String
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);

if (mongoose.models.NewArrival) {
  delete mongoose.models.NewArrival;
}

export const newArrivalSchema = new mongoose.Schema({
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
});
export const NewArrival = mongoose.models.NewArrival || mongoose.model('NewArrival', newArrivalSchema); 

if (mongoose.models.Sale) {
  delete mongoose.models.Sale
}

export const saleSchema = new mongoose.Schema({
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
});
export const Sale = mongoose.models.Sale || mongoose.model('Sale', saleSchema);

if (mongoose.models.BestSeller) {
  delete mongoose.models.BestSeller;
}

export const bestsellerSchema = new mongoose.Schema({
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
});
export const BestSeller = mongoose.models.Bestseller || mongoose.model('BestSeller', bestsellerSchema);

if (mongoose.models.Allproduct) {
  delete mongoose.models.Allproduct;
}

const allproductSchema = new mongoose.Schema({
  sale: [{type: mongoose.Schema.Types.ObjectId, ref: 'Sale'}],
  bestSeller: [{type: mongoose.Schema.Types.ObjectId, ref: 'BestSeller'}],
  newArrival: [{type: mongoose.Schema.Types.ObjectId, ref: 'NewArrival'}]
  })
  
export const Allproduct = mongoose.models.Allproducts || mongoose.model('Allproduct', allproductSchema);

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


