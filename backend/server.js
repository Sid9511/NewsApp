const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
const url = process.env.MONGO_URI;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5174/newsapp',
    'http://localhost:5174/newsapp/news',
    'https://sid9511.github.io',
    'https://sid9511.github.io/newsapp',
    'https://sid9511.github.io/newsapp/news',
    'https://newsapp-frontend.onrender.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());

let client;

async function connectToDatabase() {
  try {
      client = await MongoClient.connect(url, { ssl: true });
      console.log('Connected successfully to MongoDB');
  } catch (err) {
      console.error('Error connecting to MongoDB', err);
  }
}


connectToDatabase();

app.get('/', async (req, res) => {
  if (!client) {
      console.error('Database connection not established');
      return res.status(500).send({ error: 'Database connection not established' });
  }

  try {
      const db = client.db('categories');
      const collections = ['data'];
      const results = {};

      for (const collectionName of collections) {
          const collection = db.collection(collectionName);
          const data = await collection.find({}).toArray();
          
          console.log(`Found ${data.length} documents in ${collectionName} collection`);
          
          results[collectionName] = data;
      }

      res.json(results);
  } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).send({ error: 'Failed to fetch news', details: error.message });
  }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
