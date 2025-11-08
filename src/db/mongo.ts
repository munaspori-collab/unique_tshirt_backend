import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

export async function connectMongo() {
  if (!MONGODB_URI) {
    console.warn('[MongoDB] MONGODB_URI not set. Skipping connection.');
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'unique_tshirts',
    } as any);
    console.log('[MongoDB] Connected');
  } catch (err) {
    console.error('[MongoDB] Connection error:', err);
    process.exit(1);
  }
}
