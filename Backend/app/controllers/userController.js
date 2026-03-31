const pool = require('../models/db');
const bcrypt = require('bcrypt');

const userController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query('SELECT id, fnev, jogosultsag, email, created_at FROM bejelentkezesek ORDER BY id');
      res.json(rows);
    } catch (error) { next(error); }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT id, fnev, jogosultsag, email, created_at FROM bejelentkezesek WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) { next(error); }
  },
  create: async (req, res, next) => {
    try {
      const { fnev, jelszo, jogosultsag, email } = req.body;
      const hashedPassword = await bcrypt.hash(jelszo, 10);
      const [result] = await pool.query(
        'INSERT INTO bejelentkezesek (fnev, jelszo, jogosultsag, email) VALUES (?, ?, ?, ?)',
        [fnev, hashedPassword, jogosultsag, email]
      );
      res.status(201).json({ id: result.insertId, message: 'Felhasználó létrehozva' });
    } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fnev, jogosultsag, email, jelszo } = req.body;
      let query = 'UPDATE bejelentkezesek SET fnev = ?, jogosultsag = ?, email = ?';
      let params = [fnev, jogosultsag, email];
      
      if (jelszo && jelszo !== '') {
        const hashedPassword = await bcrypt.hash(jelszo, 10);
        query += ', jelszo = ?';
        params.push(hashedPassword);
      }
      query += ' WHERE id = ?';
      params.push(id);
      
      const [result] = await pool.query(query, params);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Felhasználó frissítve' });
    } catch (error) { next(error); }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM bejelentkezesek WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Felhasználó törölve' });
    } catch (error) { next(error); }
  }
};

module.exports = userController;