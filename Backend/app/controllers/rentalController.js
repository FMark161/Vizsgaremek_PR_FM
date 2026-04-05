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

      console.log('Kölcsönzés létrehozása - kapott adatok:', { hangszerId, diakId, kolcsVeg, megjegyzes, statusz });

      // Ellenőrizzük, hogy a hangszer már ki van-e kölcsönözve
      const [activeRental] = await pool.query(
        'SELECT id FROM kolcsonzesek WHERE hangszerId = ? AND statusz = "aktiv"',
        [hangszerId]
      );

      if (activeRental.length > 0) {
        console.log('Hangszer már ki van kölcsönözve, nem hozunk létre új kölcsönzést');
        return res.status(400).json({ error: 'Ez a hangszer már ki van kölcsönözve!' });
      }

      // 1. Kölcsönzés beszúrása
      const [result] = await pool.query(
        'INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsVeg, megjegyzes, statusz) VALUES (?, ?, ?, ?, ?)',
        [hangszerId, diakId, kolcsVeg, megjegyzes, 'aktiv']
      );

      console.log('Kölcsönzés beszúrva, ID:', result.insertId);

      // 2. Leltár frissítése
      const [updateResult] = await pool.query(
        `UPDATE leltarak l 
       JOIN hangszerek h ON l.id = h.leltarId 
       SET l.elerhetoseg = 0 
       WHERE h.id = ?`,
        [hangszerId]
      );

      console.log('Leltár frissítve, érintett sorok:', updateResult.affectedRows);

      res.status(201).json({ id: result.insertId, message: 'Kölcsönzés létrehozva' });
    } catch (error) {
      console.error('Hiba a kölcsönzés létrehozásakor:', error);
      next(error);
    }
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

      // Ha a kölcsönzés lezárásra kerül, frissítsük a leltárban az elérhetőséget
      if (statusz === 'lezart') {
        await pool.query(
          'UPDATE leltarak l JOIN hangszerek h ON l.id = h.leltarId SET l.elerhetoseg = 1 WHERE h.id = ?',
          [hangszerId]
        );
      }

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