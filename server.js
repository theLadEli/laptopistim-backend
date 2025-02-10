import express from 'express';
import cors from 'cors';

import spotRoutes from './routes/spotRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import authRoutes from './routes/authRoutes.js';
import account from './routes/account.js';

const app = express();
const PORT = 5200;

// Allow requests from your frontend
app.use(cors());

// Middleware
app.use(express.json());

// // Route: auth
app.use('/auth', authRoutes);

// // Route: account
app.use('/account', account);

// Route: spots
app.use('/spots', spotRoutes);

// Route: cities
app.use('/cities', cityRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});