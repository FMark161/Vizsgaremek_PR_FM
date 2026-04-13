const pool = require('./db');

const eventModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM esemenyek ORDER BY datum ASC');
    return rows;
  },

  getFeatured: async () => {
    const [rows] = await pool.query('SELECT * FROM esemenyek WHERE kiemelt = TRUE ORDER BY datum ASC');
    return rows;
  },

  getUpcoming: async (limit = 4) => {
    const [rows] = await pool.query(
      'SELECT * FROM esemenyek WHERE datum >= CURDATE() ORDER BY datum ASC LIMIT ?',
      [limit]
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM esemenyek WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = eventModel;