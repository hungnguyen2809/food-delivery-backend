import mongoose from 'mongoose';

const UserSchame = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 6, maxlength: 20, unique: true },
    password: { type: String, required: true, minlength: 6 },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, minlength: 6 },
    active: { type: Boolean, default: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('Users', UserSchame);
