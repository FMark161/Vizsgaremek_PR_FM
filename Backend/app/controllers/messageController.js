const pool = require('../models/db');

const messageController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, nev, email, telefon, targy, uzenet, statusz,
          DATE_FORMAT(letrehozas, '%Y-%m-%d') as letrehozas,
          DATE_FORMAT(megtekintve, '%Y-%m-%d') as megtekintve
        FROM uzenetek 
        ORDER BY letrehozas DESC
      `);
      res.json(rows);
    } catch (error) { 
      console.error('Hiba az üzenetek lekérésekor:', error);
      next(error); 
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query(`
        SELECT 
          id, nev, email, telefon, targy, uzenet, statusz,
          DATE_FORMAT(letrehozas, '%Y-%m-%d') as letrehozas,
          DATE_FORMAT(megtekintve, '%Y-%m-%d') as megtekintve
        FROM uzenetek 
        WHERE id = ?
      `, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Üzenet nem található' });
      }
      res.json(rows[0]);
    } catch (error) { 
      console.error('Hiba az üzenet lekérésekor:', error);
      next(error); 
    }
  },

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