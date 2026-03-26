const pool = require('../models/db');

const applicationController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query('SELECT * FROM jelentkezesek ORDER BY letrehozas DESC');
      res.json(rows);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM jelentkezesek WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { nev, email, telefon, szul_datum, hangszer, szint, sajat_hangszer, uzenet } = req.body;
      const [result] = await pool.query(
        'INSERT INTO jelentkezesek (nev, email, telefon, szul_datum, hangszer, szint, sajat_hangszer, uzenet, statusz) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "new")',
        [nev, email, telefon, szul_datum, hangszer, szint, sajat_hangszer, uzenet]
      );
      res.status(201).json({ id: result.insertId, message: 'Jelentkezés létrehozva' });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nev, email, telefon, szul_datum, hangszer, szint, sajat_hangszer, uzenet, statusz } = req.body;
      const [result] = await pool.query(
        'UPDATE jelentkezesek SET nev = ?, email = ?, telefon = ?, szul_datum = ?, hangszer = ?, szint = ?, sajat_hangszer = ?, uzenet = ?, statusz = ? WHERE id = ?',
        [nev, email, telefon, szul_datum, hangszer, szint, sajat_hangszer, uzenet, statusz, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Jelentkezés frissítve' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM jelentkezesek WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Jelentkezés törölve' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = applicationController;