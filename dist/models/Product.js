"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    category: { type: String, enum: ['men', 'women', 'unisex', 'limited', 'seasonal'], required: true },
    sizes: { type: [String], default: ['S', 'M', 'L'] },
    colors: { type: [String], default: [] },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    fabricDetails: { type: String },
    careInstructions: { type: String },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
