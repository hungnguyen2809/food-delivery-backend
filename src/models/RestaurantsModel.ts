import mongoose from 'mongoose';

const RestaurantsSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    type: { type: String },
    tags: { type: Array },
    location: { type: String },
    distance: { type: Number },
    time: { type: Number },
    images: {
      logo: { type: String },
      poster: { type: String },
      cover: { type: String },
    },
    categories: { type: Array },
  },
  { timestamps: true }
);

export const RestaurantsModel = mongoose.model('Restaurants', RestaurantsSchema);
