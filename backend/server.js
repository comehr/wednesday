const express = require('express');
const db = require('./db');
const cors = require('cors');
const PORT = 5000;
const app = express();




app.use(express.json());
app.use(cors()); 

app.get('/api/packages', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT PackageNumber, PackageName FROM package');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cars', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT PlateNumber FROM car');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/servicepackages', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT RecordNumber FROM servicepackage');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/report', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.RecordNumber,
        c.PlateNumber,
        c.DriverName,
        p.PackageName,
        p.PackageDescription,
        s.ServiceDate,
        pay.AmountPaid,
        pay.PaymentDate
      FROM servicepackage s
      JOIN car c ON s.PlateNumber = c.PlateNumber
      JOIN package p ON s.PackageNumber = p.PackageNumber
      LEFT JOIN payment pay ON s.RecordNumber = pay.RecordNumber
      ORDER BY s.ServiceDate DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/payments', async (req, res) => {
  const { RecordNumber, AmountPaid, PaymentDate } = req.body;
  try {
    const sql = 'INSERT INTO payment (RecordNumber, AmountPaid, PaymentDate) VALUES (?, ?, ?)';
    await db.query(sql, [RecordNumber, AmountPaid, PaymentDate]);
    res.status(201).json({ message: 'Payment added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test route to check DB connection
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'DB Connected!', solution: rows[0].solution });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});
app.post('/api/servicepackage', async (req, res) => {
  const { PlateNumber, PackageNumber, ServiceDate } = req.body;
  try {
    const sql = 'INSERT INTO servicepackage (PlateNumber, PackageNumber, ServiceDate) VALUES (?, ?, ?)';
    await db.query(sql, [PlateNumber, PackageNumber, ServiceDate]);
    res.status(201).json({ message: 'Service package added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/packages', async (req, res) => {
  const { PackageName, PackageDescription, PackagePrice } = req.body;
  try {
    const sql = 'INSERT INTO package (PackageName, PackageDescription, PackagePrice) VALUES (?, ?, ?)';
    await db.query(sql, [PackageName, PackageDescription, PackagePrice]);
    res.status(201).json({ message: 'Package added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cars', async (req, res) => {
  const { PlateNumber, CarType, CarSize, DriverName, PhoneNumber } = req.body;
  try {
    const sql = 'INSERT INTO car (PlateNumber, CarType, CarSize, DriverName, PhoneNumber) VALUES (?, ?, ?, ?, ?)';
    await db.query(sql, [PlateNumber, CarType, CarSize, DriverName, PhoneNumber]);
    res.status(201).json({ message: 'Car added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
