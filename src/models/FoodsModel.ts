import mongoose from 'mongoose';

const FoodsSchema = new mongoose.Schema(
  {
    id: { type: String },
    restaurantId: { type: String },
    name: { type: String },
    price: { type: Number },
    image: { type: String },
    category: { type: String },
    description: { type: String },
    ingredients: { type: String },
  },
  { timestamps: true }
);

export const FoodsModel = mongoose.model('foods', FoodsSchema);
