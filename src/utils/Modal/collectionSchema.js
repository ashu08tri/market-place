import mongoose from "mongoose";

if (mongoose.models.CollectionOne) {
    delete mongoose.models.CollectionOne;
  }

export const collectionOneSchema = new mongoose.Schema({
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
export const CollectionOne = mongoose.models.CollectionOne || mongoose.model('CollectionOne', collectionOneSchema); 

if (mongoose.models.CollectionTwo) {
    delete mongoose.models.CollectionTwo;
  }

export const collectionTwoSchema = new mongoose.Schema({
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
export const CollectionTwo = mongoose.models.CollectionTwo || mongoose.model('CollectionTwo', collectionTwoSchema);

if (mongoose.models.CollectionThree) {
    delete mongoose.models.CollectionThree;
  }

export const collectionThreeSchema = new mongoose.Schema({
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
export const CollectionThree = mongoose.models.CollectionThree || mongoose.model('CollectionThree', collectionThreeSchema);

if (mongoose.models.CollectionFour) {
  delete mongoose.models.CollectionFour;
}

export const collectionFourSchema = new mongoose.Schema({
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
export const CollectionFour = mongoose.models.CollectionFour || mongoose.model('CollectionFour', collectionFourSchema);

if (mongoose.models.Allcollection) {
  delete mongoose.models.Allcollection;
}

const allCollectionSchema = new mongoose.Schema({
itemfirst: [{type: mongoose.Schema.Types.ObjectId, ref: 'CollectionOne'}],
itemsecond: [{type: mongoose.Schema.Types.ObjectId, ref: 'CollectionTwo'}],
itemthird: [{type: mongoose.Schema.Types.ObjectId, ref: 'CollectionThree'}],
itemfourth: [{type: mongoose.Schema.Types.ObjectId, ref: 'CollectionFour'}],
})

export const Allcollection = mongoose.models.Allcollections || mongoose.model('Allcollections', allCollectionSchema);