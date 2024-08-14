const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// News model
const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  urlToImage: String,
  url: String,
  author: String,
  publishedAt: Date,
  source: {
    id: String,
    name: String
  }
});

const News = mongoose.model('News', NewsSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the News API!');
});

// News route to fetch all news
app.get('/', async (req, res) => {
    try {
        const db = mongoose.connection.db; // Get the MongoDB database instance
        const collection = db.collection('News'); // Get the News collection
        const findResult = await collection.find({}).toArray(); // Fetch all news documents
        res.json(findResult); // Send the result as JSON
    } 
    catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send({ error: 'Failed to fetch news' });
    }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
