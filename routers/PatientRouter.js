const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database(':memory:'); // Replace with your database path

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Patients (
      id INTEGER PRIMARY KEY,
      name TEXT,
      surname TEXT,
      email TEXT UNIQUE,
      age INTEGER
    )
  `);
});

// Get all patients
router.get('/', (req, res) => {
  db.all('SELECT * FROM Patients', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Get a specific patient by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Patients WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: row });
  });
});

// Create a new patient
router.post('/', (req, res) => {
  const { name, surname, email, age } = req.body;
  db.run('INSERT INTO Patients (name, surname, email, age) VALUES (?, ?, ?, ?)', [name, surname, email, age], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Update a patient by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, surname, email, age } = req.body;
  db.run('UPDATE Patients SET name = ?, surname = ?, email = ?, age = ? WHERE id = ?', [name, surname, email, age, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// Delete a patient by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Patients WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

module.exports = router;