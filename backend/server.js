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
mongoose.connect(process.env.MONGO_URI)
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

// News route
app.get('/api/news', async (req, res) => {
  try {
    const { category, page = 1, pageSize = 10 } = req.query;

    // Query to fetch news by category with pagination
    const news = await News.find({ "source.name": category })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    const totalResults = await News.countDocuments({ "source.name": category });

    res.json({
      articles: news,
      totalResults
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
