const pool = require('./db');

const instrumentModel = {
  getAll: async () => {
    try {
      console.log('=== instrumentModel.getAll lefut ===');
      
      const [activeRentals] = await pool.query(`
        SELECT DISTINCT hangszerId 
        FROM kolcsonzesek 
        WHERE statusz = 'aktiv'
      `);
      
      const rentedIds = activeRentals.map(r => r.hangszerId);
      console.log('Kölcsönzött ID-k:', rentedIds);
      
      const [instruments] = await pool.query(`
        SELECT 
          h.id,
          h.nev as name,
          k.katNev as category,
          l.ar as rentalPrice,
          t.nev as teacher,
          t.id as teacherId
        FROM hangszerek h
        JOIN kategoriak k ON h.katId = k.id
        JOIN leltarak l ON h.leltarId = l.id
        LEFT JOIN tanar_mit_tud tmt ON h.id = tmt.hangszerId
        LEFT JOIN tanarok t ON tmt.tanarId = t.id
        ORDER BY h.id
      `);
      
      console.log('Hangszerek tanárokkal:', instruments.map(r => ({ name: r.name, teacher: r.teacher })));
      console.log('Hangszerek lekérve, darabszám:', instruments.length);
      
      const result = instruments.map(instrument => ({
        ...instrument,
        status: rentedIds.includes(instrument.id) ? 'rented' : 'available'
      }));
      
      console.log('Eredmény státuszok:', result.map(r => ({ id: r.id, name: r.name, status: r.status })));
      return result;
    } catch (error) {
      console.error('Hiba a instrumentModel.getAll-ben:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      console.log('=== instrumentModel.getById lefut, id:', id);
      
      const [rows] = await pool.query(`
        SELECT 
          h.id,
          h.nev as name,
          k.katNev as category,
          l.ar as rentalPrice,
          t.nev as teacher,
          t.id as teacherId
        FROM hangszerek h
        JOIN kategoriak k ON h.katId = k.id
        JOIN leltarak l ON h.leltarId = l.id
        LEFT JOIN tanar_mit_tud tmt ON h.id = tmt.hangszerId
        LEFT JOIN tanarok t ON tmt.tanarId = t.id
        WHERE h.id = ?
        ORDER BY h.id
      `, [id]);
      
      if (rows.length === 0) return null;
      
      const [activeRental] = await pool.query(`
        SELECT id FROM kolcsonzesek WHERE hangszerId = ? AND statusz = 'aktiv'
      `, [id]);
      
      return {
        ...rows[0],
        status: activeRental.length > 0 ? 'rented' : 'available'
      };
    } catch (error) {
      console.error('Hiba a instrumentModel.getById-ben:', error);
      throw error;
    }
  },

  createRental: async (instrumentId, diakId, duration, megjegyzes = null) => {
    console.log('=== instrumentModel.createRental lefut ===');
    
    const kolcsVeg = new Date();
    kolcsVeg.setMonth(kolcsVeg.getMonth() + parseInt(duration));
    const kolcsVegStr = kolcsVeg.toISOString().split('T')[0];
    
    const [result] = await pool.query(
      `INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsVeg, megjegyzes, statusz) 
       VALUES (?, ?, ?, ?, 'aktiv')`,
      [instrumentId, diakId, kolcsVegStr, megjegyzes]
    );
    
    console.log('Kölcsönzés beszúrva, ID:', result.insertId);
    
    await pool.query(
      `UPDATE leltarak l 
       JOIN hangszerek h ON l.id = h.leltarId 
       SET l.elerhetoseg = 0 
       WHERE h.id = ?`,
      [instrumentId]
    );
    
    console.log('Leltár frissítve');
    
    return result.insertId;
  }
};

module.exports = instrumentModel;