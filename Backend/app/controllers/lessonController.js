const pool = require('../models/db');

const lessonController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
        SELECT o.id, o.ora_datum as datum, o.ora_ido as ido, o.tema, o.statusz,
               t.nev as tanarNev, d.nev as diakNev, h.nev as hangszerNev
        FROM orak o
        JOIN tanarok t ON o.tanarId = t.id
        JOIN diakok d ON o.diakId = d.id
        JOIN hangszerek h ON o.hangszerId = h.id
        ORDER BY o.ora_datum DESC, o.ora_ido DESC
      `);
      res.json(rows);
    } catch (error) { next(error); }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM orak WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) { next(error); }
  },
  create: async (req, res, next) => {
    try {
      const { tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz } = req.body;
      const [result] = await pool.query(
        'INSERT INTO orak (tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz || 'tervezett']
      );
      res.status(201).json({ id: result.insertId, message: 'Óra létrehozva' });
    } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz } = req.body;
      const [result] = await pool.query(
        'UPDATE orak SET tanarId = ?, diakId = ?, hangszerId = ?, tema = ?, ora_datum = ?, ora_ido = ?, statusz = ? WHERE id = ?',
        [tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Óra frissítve' });
    } catch (error) { next(error); }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM orak WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Óra törölve' });
    } catch (error) { next(error); }
  }
};

module.exports = lessonController;