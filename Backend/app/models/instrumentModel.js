const pool = require('./db');

const instrumentModel = {
  // Összes hangszer lekérése kölcsönzéshez
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT 
        h.id,
        h.nev as name,
        k.katNev as category,
        l.ar as rentalPrice,
        l.elerhetoseg as isAvailable,
        t.nev as teacher,
        t.id as teacherId
      FROM hangszerek h
      JOIN kategoriak k ON h.katId = k.id
      JOIN leltarak l ON h.leltarId = l.id
      LEFT JOIN tanar_mit_tud tmt ON h.katId = tmt.hangszerId
      LEFT JOIN tanarok t ON tmt.tanarId = t.id
      ORDER BY h.id
    `);
    
    // Átalakítjuk az adatokat a frontend számára
    return rows.map(instrument => ({
      id: instrument.id,
      name: instrument.name,
      category: instrument.category,
      rentalPrice: `${instrument.rentalPrice} Ft/hó`,
      teacher: instrument.teacher || 'Oktató',
      teacherId: instrument.teacherId || null,
      status: instrument.isAvailable ? 'available' : 'rented',
      returnDate: instrument.isAvailable ? null : '2025.04.20' // Ideiglenes, később kolcsonzesek táblából
    }));
  },

  // Egy hangszer lekérése ID alapján
  getById: async (id) => {
    const [rows] = await pool.query(`
      SELECT 
        h.id,
        h.nev as name,
        k.katNev as category,
        l.ar as rentalPrice,
        l.elerhetoseg as isAvailable,
        t.nev as teacher,
        t.id as teacherId
      FROM hangszerek h
      JOIN kategoriak k ON h.katId = k.id
      JOIN leltarak l ON h.leltarId = l.id
      LEFT JOIN tanar_mit_tud tmt ON h.katId = tmt.hangszerId
      LEFT JOIN tanarok t ON tmt.tanarId = t.id
      WHERE h.id = ?
    `, [id]);
    
    if (rows.length === 0) return null;
    
    const instrument = rows[0];
    return {
      id: instrument.id,
      name: instrument.name,
      category: instrument.category,
      rentalPrice: `${instrument.rentalPrice} Ft/hó`,
      teacher: instrument.teacher || 'Oktató',
      teacherId: instrument.teacherId || null,
      status: instrument.isAvailable ? 'available' : 'rented'
    };
  },

  // Kölcsönzés létrehozása
  createRental: async (instrumentId, diakId, duration, megjegyzes = null) => {
    const kolcsVeg = new Date();
    kolcsVeg.setMonth(kolcsVeg.getMonth() + parseInt(duration));
    
    const sql = `
      INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsVeg, megjegyzes, statusz) 
      VALUES (?, ?, ?, ?, 'aktiv')
    `;
    
    const [result] = await pool.query(sql, [
      instrumentId, 
      diakId, 
      kolcsVeg.toISOString().split('T')[0], 
      megjegyzes
    ]);
    
    // Frissítjük a hangszer elérhetőségét
    await pool.query(
      'UPDATE leltarak l JOIN hangszerek h ON l.id = h.leltarId SET l.elerhetoseg = FALSE WHERE h.id = ?',
      [instrumentId]
    );
    
    return result.insertId;
  }
};

module.exports = instrumentModel;