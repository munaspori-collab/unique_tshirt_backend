import dotenv from 'dotenv';
import { connectMongo } from './db/mongo';
import { Product } from './models/Product';

dotenv.config();

const sampleProducts = [
  // Limited Edition Products
  {
    name: 'Exclusive Vintage Print',
    slug: 'exclusive-vintage-print',
    description: 'Limited edition vintage-inspired design. Only 50 pieces available worldwide. Features premium screen printing with fade-resistant inks.',
    price: 1499,
    images: ['https://placehold.co/600x600/D6CCC2/FFFFFF?text=Vintage+Print'],
    category: 'limited',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Charcoal', 'Navy'],
    inStock: true,
    featured: true,
    fabricDetails: '100% Premium Cotton, 220 GSM',
    careInstructions: 'Machine wash cold, tumble dry low, do not bleach',
  },
  {
    name: 'Artist Collaboration Series',
    slug: 'artist-collaboration-series',
    description: 'Exclusive collaboration with renowned artist. Hand-illustrated design that tells a story. Limited to 100 pieces.',
    price: 1799,
    images: ['https://placehold.co/600x600/E3D5CA/FFFFFF?text=Artist+Series'],
    category: 'limited',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Cream', 'Beige'],
    inStock: true,
    featured: true,
    fabricDetails: '100% Organic Cotton, 240 GSM',
    careInstructions: 'Gentle cycle, hang dry, iron inside out',
  },
  {
    name: 'Premium Heritage Collection',
    slug: 'premium-heritage-collection',
    description: 'Classic design meets modern comfort. Part of our heritage collection celebrating timeless fashion. Only 75 pieces made.',
    price: 1999,
    images: ['https://placehold.co/600x600/D5BDAF/FFFFFF?text=Heritage'],
    category: 'limited',
    sizes: ['M', 'L', 'XL'],
    colors: ['Burgundy', 'Forest Green', 'Navy Blue'],
    inStock: false,
    featured: false,
    fabricDetails: 'Premium Blend: 95% Cotton, 5% Elastane, 260 GSM',
    careInstructions: 'Wash with similar colors, do not bleach, low heat dry',
  },

  // Seasonal Products
  {
    name: 'Autumn Leaves Collection',
    slug: 'autumn-leaves-collection',
    description: 'Embrace the fall season with warm tones and cozy designs. Perfect for layering on cool autumn days.',
    price: 1299,
    images: ['https://placehold.co/600x600/D6CCC2/FFFFFF?text=Autumn+Leaves'],
    category: 'seasonal',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Burnt Orange', 'Rust', 'Brown', 'Olive'],
    inStock: true,
    featured: true,
    fabricDetails: '100% Cotton, 200 GSM',
    careInstructions: 'Machine wash warm, tumble dry medium',
  },
  {
    name: 'Winter Warmth Series',
    slug: 'winter-warmth-series',
    description: 'Extra thick fabric for those cold winter days. Soft, warm, and stylish for the season.',
    price: 1399,
    images: ['https://placehold.co/600x600/E3D5CA/FFFFFF?text=Winter+Warmth'],
    category: 'seasonal',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Deep Navy', 'Forest Green', 'Burgundy'],
    inStock: true,
    featured: true,
    fabricDetails: 'Heavyweight Cotton Blend, 280 GSM',
    careInstructions: 'Cold wash, tumble dry low',
  },
  {
    name: 'Spring Blossom Edition',
    slug: 'spring-blossom-edition',
    description: 'Light and airy design inspired by spring flowers. Fresh colors for the new season.',
    price: 1199,
    images: ['https://placehold.co/600x600/F5EBE0/FFFFFF?text=Spring+Blossom'],
    category: 'seasonal',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pastel Pink', 'Sky Blue', 'Mint Green', 'Lavender'],
    inStock: true,
    featured: false,
    fabricDetails: '100% Cotton, 180 GSM',
    careInstructions: 'Gentle wash, hang dry recommended',
  },
  {
    name: 'Summer Vibes Collection',
    slug: 'summer-vibes-collection',
    description: 'Lightweight and breathable for hot summer days. Vibrant colors and comfortable fit.',
    price: 1099,
    images: ['https://placehold.co/600x600/EDEDE9/666666?text=Summer+Vibes'],
    category: 'seasonal',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Coral', 'Turquoise', 'Yellow', 'White'],
    inStock: true,
    featured: false,
    fabricDetails: 'Lightweight Cotton, 160 GSM',
    careInstructions: 'Machine wash cold, air dry',
  },
];

async function seed() {
  try {
    await connectMongo();
    console.log('[Seed] Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('[Seed] Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`[Seed] Created ${products.length} products`);

    console.log('[Seed] ✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] ❌ Error:', error);
    process.exit(1);
  }
}

seed();
