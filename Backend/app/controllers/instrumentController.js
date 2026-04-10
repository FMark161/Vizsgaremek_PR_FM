const instrumentModel = require('../models/instrumentModel');
const pool = require('../models/db');  // <-- HIÁNYZOTT IMPORT

const instrumentController = {
  getAll: async (req, res, next) => {
    try {
      console.log('=== instrumentController.getAll lefut ===');
      const instruments = await instrumentModel.getAll();
      res.json(instruments);
    } catch (error) {
      console.error('Hiba a getAll-ben:', error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const instrument = await instrumentModel.getById(id);
      if (!instrument) {
        return res.status(404).json({ error: 'Instrument not found' });
      }
      res.json(instrument);
    } catch (error) {
      next(error);
    }
  },

  createRental: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { diakId, duration, megjegyzes } = req.body;

      if (!diakId || !duration) {
        return res.status(400).json({ error: 'Diák ID és időtartam megadása kötelező' });
      }

      const rentalId = await instrumentModel.createRental(id, diakId, duration, megjegyzes);

      res.status(201).json({
        message: 'Kölcsönzés sikeresen létrehozva',
        rentalId: rentalId
      });
    } catch (error) {
      console.error('Hiba a kölcsönzés létrehozásakor:', error);
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, category, rentalPrice, teacher, status } = req.body;

      if (!name || !category || !rentalPrice) {
        return res.status(400).json({ error: 'Név, kategória és ár megadása kötelező' });
      }

      let [categoryRow] = await pool.query('SELECT id FROM kategoriak WHERE katNev = ?', [category]);
      let katId;
      if (categoryRow.length === 0) {
        const [newCat] = await pool.query('INSERT INTO kategoriak (katNev) VALUES (?)', [category]);
        katId = newCat.insertId;
      } else {
        katId = categoryRow[0].id;
      }

      const priceNumber = parseInt(rentalPrice.replace(/[^0-9]/g, ''));
      const [stockResult] = await pool.query(
        'INSERT INTO leltarak (ar, elerhetoseg) VALUES (?, ?)',
        [priceNumber, status === 'available' ? 1 : 0]
      );

      const [result] = await pool.query(
        'INSERT INTO hangszerek (nev, katId, leltarId) VALUES (?, ?, ?)',
        [name, katId, stockResult.insertId]
      );

      if (teacher) {
        const [teacherRow] = await pool.query('SELECT id FROM tanarok WHERE nev = ?', [teacher]);
        if (teacherRow.length > 0) {
          await pool.query(
            'INSERT INTO tanar_mit_tud (tanarId, hangszerId) VALUES (?, ?)',
            [teacherRow[0].id, result.insertId]
          );
        }
      }

      res.status(201).json({ id: result.insertId, message: 'Hangszer létrehozva' });
    } catch (error) {
      console.error('Hiba a hangszer létrehozásakor:', error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, category, rentalPrice, teacher, status } = req.body;

      // Ár feldolgozása
      let priceNumber = typeof rentalPrice === 'number'
        ? rentalPrice
        : parseInt(String(rentalPrice).replace(/[^0-9]/g, ''), 10);
      if (isNaN(priceNumber)) priceNumber = 0;

      // Hangszer ellenőrzése
      const [instrument] = await pool.query('SELECT katId, leltarId FROM hangszerek WHERE id = ?', [id]);
      if (instrument.length === 0) {
        return res.status(404).json({ error: 'Hangszer nem található' });
      }

      // Kategória kezelése
      let [categoryRow] = await pool.query('SELECT id FROM kategoriak WHERE katNev = ?', [category]);
      let katId;
      if (categoryRow.length === 0) {
        const [newCat] = await pool.query('INSERT INTO kategoriak (katNev) VALUES (?)', [category]);
        katId = newCat.insertId;
      } else {
        katId = categoryRow[0].id;
      }

      // Leltár frissítése (elerhetoseg: 1 = available, 0 = egyéb)
      const isAvailable = (status === 'available') ? 1 : 0;
      await pool.query(
        'UPDATE leltarak SET ar = ?, elerhetoseg = ? WHERE id = ?',
        [priceNumber, isAvailable, instrument[0].leltarId]
      );

      // Hangszer frissítése
      await pool.query(
        'UPDATE hangszerek SET nev = ?, katId = ? WHERE id = ?',
        [name, katId, id]
      );

      // A státusz módosításakor, ha 'available' vagy 'maintenance' az új státusz, zárd le a kölcsönzéseket
      if (status !== 'rented') {
        await pool.query('UPDATE kolcsonzesek SET statusz = "lezart" WHERE hangszerId = ? AND statusz = "aktiv"', [id]);
      }

      // Tanár hozzárendelés frissítése - csak akkor, ha a teacher nem üres
      await pool.query('DELETE FROM tanar_mit_tud WHERE hangszerId = ?', [id]);
      if (teacher && teacher.trim() !== '') {
        const [teacherRow] = await pool.query('SELECT id FROM tanarok WHERE nev = ?', [teacher]);
        if (teacherRow.length > 0) {
          await pool.query(
            'INSERT INTO tanar_mit_tud (tanarId, hangszerId) VALUES (?, ?)',
            [teacherRow[0].id, id]
          );
        }
      }

      res.json({ message: 'Hangszer frissítve' });
    } catch (error) {
      console.error('Hiba a hangszer frissítésekor:', error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      const [instrument] = await pool.query('SELECT leltarId FROM hangszerek WHERE id = ?', [id]);
      if (instrument.length === 0) {
        return res.status(404).json({ error: 'Hangszer nem található' });
      }

      await pool.query('DELETE FROM tanar_mit_tud WHERE hangszerId = ?', [id]);
      await pool.query('DELETE FROM kolcsonzesek WHERE hangszerId = ?', [id]);
      await pool.query('DELETE FROM hangszerek WHERE id = ?', [id]);
      await pool.query('DELETE FROM leltarak WHERE id = ?', [instrument[0].leltarId]);

      res.json({ message: 'Hangszer törölve' });
    } catch (error) {
      console.error('Hiba a hangszer törlésekor:', error);
      next(error);
    }
  }
};

module.exports = instrumentController;