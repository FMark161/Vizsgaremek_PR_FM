const pool = require('../models/db');

const studentController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
        SELECT d.id, d.nev, d.telefonsz, d.email, d.szulDatum, d.sajatHangszer, b.fnev as felhasznaloNev
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
      const [rows] = await pool.query('SELECT * FROM diakok WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) { next(error); }
  },
  create: async (req, res, next) => {
    try {
      const { nev, telefonsz, email, szulDatum, sajatHangszer, felhasznaloId } = req.body;
      const [result] = await pool.query(
        'INSERT INTO diakok (nev, telefonsz, email, szulDatum, sajatHangszer, felhasznaloId) VALUES (?, ?, ?, ?, ?, ?)',
        [nev, telefonsz, email, szulDatum, sajatHangszer, felhasznaloId]
      );
      res.status(201).json({ id: result.insertId, message: 'Diák létrehozva' });
    } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nev, telefonsz, email, szulDatum, sajatHangszer, felhasznaloId } = req.body;
      const [result] = await pool.query(
        'UPDATE diakok SET nev = ?, telefonsz = ?, email = ?, szulDatum = ?, sajatHangszer = ?, felhasznaloId = ? WHERE id = ?',
        [nev, telefonsz, email, szulDatum, sajatHangszer, felhasznaloId, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
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