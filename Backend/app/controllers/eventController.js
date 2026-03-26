const pool = require('../models/db');

const eventController = {
  // Összes esemény lekérése
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query('SELECT * FROM esemenyek ORDER BY datum ASC');
      res.json(rows);
    } catch (error) {
      next(error);
    }
  },

  // Egy esemény lekérése
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM esemenyek WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      next(error);
    }
  },

  // Esemény létrehozása
  create: async (req, res, next) => {
    try {
      const { cim, datum, idopont, helyszin, leiras, hosszuleiras, kategoria, kiemelt } = req.body;
      const [result] = await pool.query(
        'INSERT INTO esemenyek (cim, datum, idopont, helyszin, leiras, hosszuleiras, kategoria, kiemelt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [cim, datum, idopont, helyszin, leiras, hosszuleiras, kategoria, kiemelt || 0]
      );
      res.status(201).json({ id: result.insertId, message: 'Esemény létrehozva' });
    } catch (error) {
      next(error);
    }
  },

  // Esemény frissítése
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { cim, datum, idopont, helyszin, leiras, hosszuleiras, kategoria, kiemelt } = req.body;
      const [result] = await pool.query(
        'UPDATE esemenyek SET cim = ?, datum = ?, idopont = ?, helyszin = ?, leiras = ?, hosszuleiras = ?, kategoria = ?, kiemelt = ? WHERE id = ?',
        [cim, datum, idopont, helyszin, leiras, hosszuleiras, kategoria, kiemelt || 0, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json({ message: 'Esemény frissítve' });
    } catch (error) {
      next(error);
    }
  },

  // Esemény törlése
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM esemenyek WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json({ message: 'Esemény törölve' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = eventController;