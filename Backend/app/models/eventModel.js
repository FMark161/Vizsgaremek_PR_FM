const pool = require('./db');

const eventModel = {
  // Összes esemény lekérése
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM esemenyek ORDER BY datum ASC');
    return rows;
  },

  // Kiemelt események lekérése
  getFeatured: async () => {
    const [rows] = await pool.query('SELECT * FROM esemenyek WHERE kiemelt = TRUE ORDER BY datum ASC');
    return rows;
  },

  // Legközelebbi 4 esemény lekérése
  getUpcoming: async (limit = 4) => {
    const [rows] = await pool.query(
      'SELECT * FROM esemenyek WHERE datum >= CURDATE() ORDER BY datum ASC LIMIT ?',
      [limit]
    );
    return rows;
  },

  // Egy esemény lekérése ID alapján
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM esemenyek WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = eventModel;