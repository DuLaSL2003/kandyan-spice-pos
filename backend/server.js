// Import required packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001; // Use port from environment or default to 3001

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for connecting to Supabase
    }
});
// Test the database connection on server startup
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Successfully connected to the database');
    }
});
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow server to accept JSON data in requests

// A simple test route to make sure everything is working
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Kandyan Spice backend API!" });
});
// --- API Endpoints will go here ---
// GET all menu items
app.get('/api/menu-items', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM public.menu_items ORDER BY id');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});