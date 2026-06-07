const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API endpoint for products
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        console.log('Sending products:', rows.length);
        res.json(rows);
    } catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// API endpoint for orders
app.post('/api/orders', async (req, res) => {
    const { customer_name, total, items } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO orders (customer_name, total, items, order_date) VALUES (?, ?, ?, ?)',
            [customer_name, total, JSON.stringify(items), new Date()]
        );
        res.json({ success: true, orderId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});