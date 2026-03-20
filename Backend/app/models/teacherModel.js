const pool = require('./db');

const teacherModel = {
  // Összes tanár lekérése
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT 
        t.id,
        t.nev as name,
        t.telefonsz as phone,
        t.email,
        t.tapasztalat as experience,
        t.vegzettseg as education,
        t.leiras as description,
        GROUP_CONCAT(DISTINCT h.nev) as instruments
      FROM tanarok t
      LEFT JOIN tanar_mit_tud tmt ON t.id = tmt.tanarId
      LEFT JOIN hangszerek h ON tmt.hangszerId = h.id
      GROUP BY t.id
      ORDER BY t.id
    `);
    
    // Feldolgozzuk a hangszereket
    return rows.map(teacher => ({
      ...teacher,
      instruments: teacher.instruments ? teacher.instruments.split(',') : []
    }));
  },

  // Egy tanár lekérése ID alapján
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT 
        t.id,
        t.nev as name,
        t.telefonsz as phone,
        t.email,
        t.tapasztalat as experience,
        t.vegzettseg as education,
        t.leiras as description,
        GROUP_CONCAT(DISTINCT h.nev) as instruments
      FROM tanarok t
      LEFT JOIN tanar_mit_tud tmt ON t.id = tmt.tanarId
      LEFT JOIN hangszerek h ON tmt.hangszerId = h.id
      WHERE t.id = ?
      GROUP BY t.id
    `, [id]);
    
    if (rows.length === 0) return null;
    
    return {
      ...rows[0],
      instruments: rows[0].instruments ? rows[0].instruments.split(',') : []
    };
  }
};

module.exports = teacherModel;