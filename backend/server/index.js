const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/error');
const { connectDB } = require('./config/database');

// Routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const regionsRoutes = require('./routes/regions');
const economyRoutes = require('./routes/economy');
const assetsRoutes = require('./routes/assets');
const statsRoutes = require('./routes/stats');

// Environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/regions', regionsRoutes);
app.use('/api/economy', economyRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Avitronmetaverse API is running' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡️ Server running on port ${PORT}`);
  console.log(`📊 Avitronmetaverse Grid Dashboard API`);
});

module.exports = app;