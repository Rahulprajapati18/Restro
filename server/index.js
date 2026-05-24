import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes    from './routes/authRoutes.js';
import menuRoutes    from './routes/menuRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import orderRoutes   from './routes/orderRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', /\.vercel\.app$/, /\.netlify\.app$/],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth',     authRoutes);
app.use('/api/menu',     menuRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/api/menu', (_req, res) =>
  res.json({ message: 'Welcome to Samridhii Restaurant API [Supabase]' })
);

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, _req, res, _next) => res.status(500).json({ message: err.message }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} [Supabase backend]`));

export default app;
