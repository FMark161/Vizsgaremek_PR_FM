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

      // Ellenőrizzük, hogy a hangszer már ki van-e kölcsönözve
      const [activeRental] = await pool.query(
        'SELECT id FROM kolcsonzesek WHERE hangszerId = ? AND statusz = "aktiv"',
        [hangszerId]
      );

      if (activeRental.length > 0) {
        return res.status(400).json({ error: 'Ez a hangszer már ki van kölcsönözve!' });
      }

      // Ellenőrizzük, hogy a hangszer létezik-e
      const [instrument] = await pool.query('SELECT id FROM hangszerek WHERE id = ?', [hangszerId]);
      if (instrument.length === 0) {
        return res.status(404).json({ error: 'Hangszer nem található' });
      }

      // Ellenőrizzük, hogy a diák létezik-e
      const [student] = await pool.query('SELECT id FROM diakok WHERE id = ?', [diakId]);
      if (student.length === 0) {
        return res.status(404).json({ error: 'Diák nem található' });
      }

      const [result] = await pool.query(
        'INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsVeg, megjegyzes, statusz) VALUES (?, ?, ?, ?, ?)',
        [hangszerId, diakId, kolcsVeg, megjegyzes, statusz || 'aktiv']
      );

      // Frissítjük a leltárban az elérhetőséget
      await pool.query(
        'UPDATE leltarak l JOIN hangszerek h ON l.id = h.leltarId SET l.elerhetoseg = 0 WHERE h.id = ?',
        [hangszerId]
      );

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