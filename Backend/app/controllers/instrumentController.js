const pool = require('../models/db');

const instrumentController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          h.id, h.nev as name, k.katNev as category, l.ar as rentalPrice, 
          l.elerhetoseg as isAvailable, t.nev as teacher, t.id as teacherId
        FROM hangszerek h
        JOIN kategoriak k ON h.katId = k.id
        JOIN leltarak l ON h.leltarId = l.id
        LEFT JOIN tanar_mit_tud tmt ON h.katId = tmt.hangszerId
        LEFT JOIN tanarok t ON tmt.tanarId = t.id
        ORDER BY h.id
      `);
      res.json(rows);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM hangszerek WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { nev, katId, leltarId } = req.body;
      const [result] = await pool.query(
        'INSERT INTO hangszerek (nev, katId, leltarId) VALUES (?, ?, ?)',
        [nev, katId, leltarId]
      );
      res.status(201).json({ id: result.insertId, message: 'Hangszer létrehozva' });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nev, katId, leltarId } = req.body;
      const [result] = await pool.query(
        'UPDATE hangszerek SET nev = ?, katId = ?, leltarId = ? WHERE id = ?',
        [nev, katId, leltarId, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Hangszer frissítve' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM hangszerek WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Hangszer törölve' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = instrumentController;