const pool = require('../models/db');

const lessonController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          o.id, 
          DATE_FORMAT(o.ora_datum, '%Y-%m-%d') as datum,
          o.ora_ido as ido, 
          o.tema, 
          o.statusz,
          t.nev as tanarNev, 
          t.id as tanarId,
          d.nev as diakNev, 
          d.id as diakId,
          h.nev as hangszerNev,
          h.id as hangszerId
        FROM orak o
        JOIN tanarok t ON o.tanarId = t.id
        JOIN diakok d ON o.diakId = d.id
        JOIN hangszerek h ON o.hangszerId = h.id
        ORDER BY o.ora_datum ASC, o.ora_ido ASC
      `);
      res.json(rows);
    } catch (error) { next(error); }
  },

  getByStudentId: async (req, res, next) => {
    try {
      const { studentId } = req.params;
      const [rows] = await pool.query(`
        SELECT 
          o.id, 
          DATE_FORMAT(o.ora_datum, '%Y-%m-%d') as datum,
          o.ora_ido as ido, 
          o.tema, 
          o.statusz,
          t.nev as tanarNev, 
          t.id as tanarId,
          h.nev as hangszerNev,
          h.id as hangszerId
        FROM orak o
        JOIN tanarok t ON o.tanarId = t.id
        JOIN hangszerek h ON o.hangszerId = h.id
        WHERE o.diakId = ?
        ORDER BY o.ora_datum ASC, o.ora_ido ASC
      `, [studentId]);
      res.json(rows);
    } catch (error) { next(error); }
  },

  getByTeacherId: async (req, res, next) => {
    try {
      const { teacherId } = req.params;
      const [rows] = await pool.query(`
        SELECT 
          o.id, 
          DATE_FORMAT(o.ora_datum, '%Y-%m-%d') as datum,
          o.ora_ido as ido, 
          o.tema, 
          o.statusz,
          o.tanarId, 
          o.diakId, 
          o.hangszerId,
          d.nev as diakNev, 
          d.id as diakId,
          h.nev as hangszerNev
        FROM orak o
        JOIN diakok d ON o.diakId = d.id
        JOIN hangszerek h ON o.hangszerId = h.id
        WHERE o.tanarId = ?
        ORDER BY o.ora_datum ASC, o.ora_ido ASC
      `, [teacherId]);
      res.json(rows);
    } catch (error) { next(error); }
  },

  create: async (req, res, next) => {
    try {
      const { tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz } = req.body;
      
      console.log('Óra létrehozása - kapott adatok:', { tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz });
      
      const [result] = await pool.query(
        'INSERT INTO orak (tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [tanarId, diakId, hangszerId, tema, ora_datum, ora_ido, statusz || 'tervezett']
      );
      
      res.status(201).json({ 
        id: result.insertId, 
        message: 'Óra létrehozva',
        lesson: {
          id: result.insertId,
          tanarId,
          diakId,
          hangszerId,
          tema,
          ora_datum,
          ora_ido,
          statusz: statusz || 'tervezett'
        }
      });
    } catch (error) { 
      console.error('Hiba az óra létrehozásakor:', error);
      next(error); 
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { tema, ora_datum, ora_ido, statusz } = req.body;
      const [result] = await pool.query(
        'UPDATE orak SET tema = ?, ora_datum = ?, ora_ido = ?, statusz = ? WHERE id = ?',
        [tema, ora_datum, ora_ido, statusz, id]
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