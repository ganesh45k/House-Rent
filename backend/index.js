const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const listingRouter = require('./routes/listing.route');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

const mongoUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/rentnest';

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Serve the 'index.html' file for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
