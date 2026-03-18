const pool = require('./db');

const applicationModel = {
  // Get all applications
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM jelentkezesek ORDER BY letrehozas DESC');
    return rows;
  },

  // Get one application by ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM jelentkezesek WHERE id = ?', [id]);
    return rows[0];
  },

  // Create new application
  create: async (application) => {
    const { name, email, phone, birthDate, instrument, level, ownInstrument, message } = application;
    const sql = `INSERT INTO jelentkezesek 
                (nev, email, telefon, szul_datum, hangszer, szint, sajat_hangszer, uzenet, statusz) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')`;
    const [result] = await pool.query(sql, [
      name, email, phone, birthDate || null, 
      instrument || null, level || null, ownInstrument || null, message || null
    ]);
    return result.insertId;
  },

  // Update status
  updateStatus: async (id, status) => {
    const sql = 'UPDATE jelentkezesek SET statusz = ? WHERE id = ?';
    const [result] = await pool.query(sql, [status, id]);
    return result.affectedRows > 0;
  },

  // Delete application
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM jelentkezesek WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = applicationModel;