import mongoose from 'mongoose';

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI || (process.env.NODE_ENV === 'production' ? null : 'mongodb://localhost:27017/AIDB');

  if (!mongoUri) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log(`MongoDB connected: ${mongoUri}`);
}
