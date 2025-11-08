import mongoose, { Schema, model } from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  name: string;
  googleId?: string;
  image?: string;
  role: 'user' | 'admin';
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    googleId: { type: String, unique: true, sparse: true },
    image: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
