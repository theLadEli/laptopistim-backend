import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Security

import spotRoutes from './routes/spotRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import authRoutes from './routes/authRoutes.js';
import account from './routes/account.js';

const app = express();
const PORT = 5200;

// Allow requests from your frontend
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5172',
  'http://localhost:5173',
  'https://laptopistim.vercel.app',
  'https://laptopistim.com',
];
app.use(cors({
  origin: allowedOrigins
}));

// Middleware
app.use(express.json());

// Security
app.use(helmet());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Route: auth
app.use('/auth', authRoutes);

// Route: account
app.use('/account', account);

// Route: spots
app.use('/spots', spotRoutes);

// Route: cities
app.use('/cities', cityRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Route: test
app.use('/', (req, res) => {
    res.send('✅ Server online and running.\nIf you have any questions please contact eli@echocreations.co.uk.');
})