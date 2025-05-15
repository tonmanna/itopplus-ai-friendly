import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';

// Import routes
import { authRoutes } from './routes/auth.routes';
import { websiteRoutes } from './routes/website.routes';
import { articleRoutes } from './routes/article.routes';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Configure passport
import './config/passport';

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/articles', articleRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
