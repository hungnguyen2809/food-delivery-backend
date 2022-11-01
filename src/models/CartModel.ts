import mongoose from 'mongoose';

const CartSchame = new mongoose.Schema({
  foodId: { type: String, required: true },
  userId: { type: String, required: true },
  quantity: { type: Number },
});

export const CartModel = mongoose.model('carts', CartSchame);
