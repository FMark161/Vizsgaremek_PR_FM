const pool = require('../models/db');

const teacherController = {
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.query(`
      SELECT 
        id,
        nev as name,
        telefonsz as phone,
        email,
        tapasztalat as experience,
        vegzettseg as education,
        leiras as description
      FROM tanarok
      ORDER BY id
    `);
      console.log('Tanárok adatok:', rows); // Debug
      res.json(rows);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM tanarok WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      // Átalakítjuk a mezőneveket a frontend által várt formátumra
      const teacher = {
        id: rows[0].id,
        name: rows[0].nev,
        phone: rows[0].telefonsz,
        email: rows[0].email,
        experience: rows[0].tapasztalat,
        education: rows[0].vegzettseg,
        description: rows[0].leiras
      };
      res.json(teacher);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      // A frontend által küldött mezőnevek: name, phone, email, experience, education, description
      const { name, phone, email, experience, education, description } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Név és email megadása kötelező' });
      }

      const [result] = await pool.query(
        'INSERT INTO tanarok (nev, telefonsz, email, tapasztalat, vegzettseg, leiras) VALUES (?, ?, ?, ?, ?, ?)',
        [name, phone || null, email, experience || null, education || null, description || null]
      );

      res.status(201).json({ id: result.insertId, message: 'Oktató létrehozva' });
    } catch (error) {
      console.error('Hiba az oktató létrehozásakor:', error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, phone, email, experience, education, description } = req.body;

      const [result] = await pool.query(
        'UPDATE tanarok SET nev = ?, telefonsz = ?, email = ?, tapasztalat = ?, vegzettseg = ?, leiras = ? WHERE id = ?',
        [name, phone || null, email, experience || null, education || null, description || null, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Oktató nem található' });
      }

      res.json({ message: 'Oktató frissítve' });
    } catch (error) {
      console.error('Hiba az oktató frissítésekor:', error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const [result] = await pool.query('DELETE FROM tanarok WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Oktató törölve' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = teacherController;