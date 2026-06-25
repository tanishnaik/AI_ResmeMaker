import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const DB_RETRY_INTERVAL_MS = 30000;

let lastMongoError = null;

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static('uploads'));

app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'ResumeIQ API',
    health: '/api/health',
  });
});

app.get('/favicon.ico', (_req, res) => {
  res.status(204).end();
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'ResumeIQ API',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    mongoError: mongoose.connection.readyState === 1 ? null : lastMongoError,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`ResumeIQ API running on http://localhost:${PORT}`);
});

async function connectWithRetry() {
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return;
  }

  try {
    await connectDB();
    lastMongoError = null;
  } catch (error) {
    lastMongoError = error.message;
    console.error('Failed to connect to MongoDB:', error.message);
    setTimeout(connectWithRetry, DB_RETRY_INTERVAL_MS);
  }
}

connectWithRetry();
