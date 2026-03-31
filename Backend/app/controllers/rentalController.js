const pool = require('../models/db');

const rentalController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
        SELECT k.id, k.kolcsKezd, k.kolcsVeg, k.megjegyzes, k.statusz,
               h.nev as hangszerNev, d.nev as diakNev
        FROM kolcsonzesek k
        JOIN hangszerek h ON k.hangszerId = h.id
        JOIN diakok d ON k.diakId = d.id
        ORDER BY k.kolcsKezd DESC
      `);
      res.json(rows);
    } catch (error) { next(error); }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM kolcsonzesek WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (error) { next(error); }
  },
  create: async (req, res, next) => {
    try {
      const { hangszerId, diakId, kolcsVeg, megjegyzes, statusz } = req.body;
      const [result] = await pool.query(
        'INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsVeg, megjegyzes, statusz) VALUES (?, ?, ?, ?, ?)',
        [hangszerId, diakId, kolcsVeg, megjegyzes, statusz || 'aktiv']
      );
      res.status(201).json({ id: result.insertId, message: 'Kölcsönzés létrehozva' });
    } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { hangszerId, diakId, kolcsVeg, megjegyzes, statusz } = req.body;
      const [result] = await pool.query(
        'UPDATE kolcsonzesek SET hangszerId = ?, diakId = ?, kolcsVeg = ?, megjegyzes = ?, statusz = ? WHERE id = ?',
        [hangszerId, diakId, kolcsVeg, megjegyzes, statusz, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Kölcsönzés frissítve' });
    } catch (error) { next(error); }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM kolcsonzesek WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Kölcsönzés törölve' });
    } catch (error) { next(error); }
  }
};

module.exports = rentalController;