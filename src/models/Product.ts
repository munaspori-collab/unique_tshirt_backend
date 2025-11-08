import mongoose, { Schema, model } from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: 'limited' | 'seasonal';
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  fabricDetails?: string;
  careInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    category: { type: String, enum: ['limited', 'seasonal'], required: true },
    sizes: { type: [String], default: ['S','M','L'] },
    colors: { type: [String], default: [] },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    fabricDetails: { type: String },
    careInstructions: { type: String },
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', ProductSchema);
