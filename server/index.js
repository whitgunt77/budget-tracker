const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');
const notFound = require('./middleware/notFound');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Middleware
app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`DEBUG: Incoming request URL: ${req.url}, Method: ${req.method}`);
    next();
});

// Routes
app.use('/api/transactions', transactionRoutes);

// 404 Middleware
app.use(notFound);

// Start Server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error("Database connection error:", err);
        process.exit(1);
    });