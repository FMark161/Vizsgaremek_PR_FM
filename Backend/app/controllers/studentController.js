const pool = require('../models/db');

const studentController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
      SELECT 
        d.id, d.nev, d.telefonsz, d.email, 
        DATE_FORMAT(d.szulDatum, '%Y-%m-%d') as szulDatum,
        d.sajatHangszer, d.felhasznaloId,
        b.fnev as felhasznaloNev
      FROM diakok d
      LEFT JOIN bejelentkezesek b ON d.felhasznaloId = b.id
      ORDER BY d.id
    `);
      res.json(rows);
    } catch (error) { next(error); }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query(`
      SELECT 
        d.id, d.nev, d.telefonsz, d.email, 
        DATE_FORMAT(d.szulDatum, '%Y-%m-%d') as szulDatum,
        d.sajatHangszer, d.felhasznaloId,
        b.fnev as felhasznaloNev
      FROM diakok d
      LEFT JOIN bejelentkezesek b ON d.felhasznaloId = b.id
      WHERE d.id = ?
    `, [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) { next(error); }
  },

  create: async (req, res, next) => {
    try {
      const { nev, telefonsz, email, szulDatum, sajatHangszer, felhasznaloId } = req.body;
      const [result] = await pool.query(
        'INSERT INTO diakok (nev, telefonsz, email, szulDatum, sajatHangszer, felhasznaloId) VALUES (?, ?, ?, ?, ?, ?)',
        [nev, telefonsz || null, email || null, szulDatum || null, sajatHangszer || null, felhasznaloId || null]
      );
      res.status(201).json({ id: result.insertId, message: 'Diák létrehozva' });
    } catch (error) {
      console.error('Hiba a diák létrehozásakor:', error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nev, telefonsz, email, szulDatum, sajatHangszer, felhasznaloId } = req.body;
      const [result] = await pool.query(
        'UPDATE diakok SET nev = ?, telefonsz = ?, email = ?, szulDatum = ?, sajatHangszer = ?, felhasznaloId = ? WHERE id = ?',
        [nev, telefonsz || null, email || null, szulDatum || null, sajatHangszer || null, felhasznaloId || null, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Diák nem található' });
      res.json({ message: 'Diák frissítve' });
    } catch (error) { next(error); }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM diakok WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Diák törölve' });
    } catch (error) { next(error); }
  }
};

module.exports = studentController;