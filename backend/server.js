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
    'http://localhost:3000', // Update to match your frontend URL
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
        client = await MongoClient.connect(url);
        console.log('Connected successfully to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err.message);
        console.error('Error details:', err);
        process.exit(1); // Exit the process with error code
    }
}

connectToDatabase();

app.get('/', async (req, res) => {
    if (!client) {
        return res.status(500).send({ error: 'Database connection not established' });
    }

    try {
        const db = client.db('categories');
        const collection = db.collection('data');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send({ error: 'Failed to fetch news' });
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    if (client) {
        client.close().then(() => {
            console.log('MongoDB client disconnected');
            process.exit(0);
        }).catch((err) => {
            console.error('Error disconnecting MongoDB client', err);
            process.exit(1);
        });
    } else {
        process.exit(0);
    }
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
