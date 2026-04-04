const pool = require('../models/db');

const messageController = {
  // Összes üzenet lekérése
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query('SELECT * FROM uzenetek ORDER BY letrehozas DESC');
      res.json(rows);
    } catch (error) { 
      console.error('Hiba az üzenetek lekérésekor:', error);
      next(error); 
    }
  },

  // Új üzenet létrehozása
  create: async (req, res, next) => {
    try {
      const { nev, email, telefon, targy, uzenet } = req.body;
      
      if (!nev || !email || !uzenet) {
        return res.status(400).json({ error: 'Név, email és üzenet megadása kötelező' });
      }
      
      const [result] = await pool.query(
        'INSERT INTO uzenetek (nev, email, telefon, targy, uzenet, statusz) VALUES (?, ?, ?, ?, ?, "uj")',
        [nev, email, telefon || null, targy || null, uzenet]
      );
      
      res.status(201).json({ id: result.insertId, message: 'Üzenet sikeresen elküldve' });
    } catch (error) { 
      console.error('Hiba az üzenet mentésekor:', error);
      next(error); 
    }
  },

  // Üzenet olvasottá jelölése
  markAsRead: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query(
        'UPDATE uzenetek SET statusz = "olvasott", megtekintve = NOW() WHERE id = ?',
        [id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Üzenet olvasottnak jelölve' });
    } catch (error) { 
      console.error('Hiba az üzenet frissítésekor:', error);
      next(error); 
    }
  },

  // Üzenet törlése
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM uzenetek WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Üzenet törölve' });
    } catch (error) { 
      console.error('Hiba az üzenet törlésekor:', error);
      next(error); 
    }
  }
};

module.exports = messageController;