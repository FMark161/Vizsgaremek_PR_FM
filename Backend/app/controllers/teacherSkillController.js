const pool = require('../models/db');

const teacherSkillController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
        SELECT tmt.id, tmt.tanarId, tmt.hangszerId, 
               tn.nev as tanarNev, h.nev as hangszerNev
        FROM tanar_mit_tud tmt
        JOIN tanarok tn ON tmt.tanarId = tn.id
        JOIN hangszerek h ON tmt.hangszerId = h.id
        ORDER BY tmt.id
      `);
      res.json(rows);
    } catch (error) { next(error); }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query(`
        SELECT tmt.id, tmt.tanarId, tmt.hangszerId, 
               tn.nev as tanarNev, h.nev as hangszerNev
        FROM tanar_mit_tud tmt
        JOIN tanarok tn ON tmt.tanarId = tn.id
        JOIN hangszerek h ON tmt.hangszerId = h.id
        WHERE tmt.id = ?
      `, [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) { next(error); }
  },

  create: async (req, res, next) => {
    try {
      const { tanarId, hangszerId } = req.body;
      const [result] = await pool.query(
        'INSERT INTO tanar_mit_tud (tanarId, hangszerId) VALUES (?, ?)',
        [tanarId, hangszerId]
      );
      res.status(201).json({ id: result.insertId, message: 'Oktató-hangszer kapcsolat létrehozva' });
    } catch (error) { next(error); }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM tanar_mit_tud WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Kapcsolat törölve' });
    } catch (error) { next(error); }
  }
};

module.exports = teacherSkillController;