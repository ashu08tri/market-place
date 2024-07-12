import mongoose from "mongoose";

if (mongoose.models.TypeFirst) {
    delete mongoose.models.TypeFirst;
  }

export const typeFirstSchema = new mongoose.Schema({
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
export const TypeFirst = mongoose.models.TypeFirst || mongoose.model('TypeFirst', typeFirstSchema); 

if (mongoose.models.TypeSecond) {
    delete mongoose.models.TypeSecond;
  }

export const typeSecondSchema = new mongoose.Schema({
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
export const TypeSecond = mongoose.models.TypeSecond || mongoose.model('TypeSecond', typeSecondSchema);

if (mongoose.models.TypeThird) {
    delete mongoose.models.TypeThird;
  }

export const typeThirdSchema = new mongoose.Schema({
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
export const TypeThird = mongoose.models.TypeThird || mongoose.model('TypeThird', typeThirdSchema);

if (mongoose.models.TypeFourth) {
    delete mongoose.models.TypeFourth;
  }

export const typefourthSchema = new mongoose.Schema({
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
export const TypeFourth = mongoose.models.TypeFourth || mongoose.model('TypeFourth', typefourthSchema);

if (mongoose.models.Alltype) {
    delete mongoose.models.Alltype;
  }

const alltypeSchema = new mongoose.Schema({
  typefirst: [{type: mongoose.Schema.Types.ObjectId, ref: 'TypeFirst'}],
  typesecond: [{type: mongoose.Schema.Types.ObjectId, ref: 'TypeSecond'}],
  typethird: [{type: mongoose.Schema.Types.ObjectId, ref: 'TypeThird'}],
  typefourth: [{type: mongoose.Schema.Types.ObjectId, ref: 'TypeFourth'}],
  })
  
export const Alltype = mongoose.models.AllTypes || mongoose.model('AllTypes', alltypeSchema);