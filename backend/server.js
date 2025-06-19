const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes.js');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://vsk:shreekrishna2004@cluster1.1xkrr7k.mongodb.net/Tk');


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/api', ticketRoutes);