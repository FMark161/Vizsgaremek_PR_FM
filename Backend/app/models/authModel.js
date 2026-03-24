const pool = require('./db');
const bcrypt = require('bcrypt');

const authModel = {
  // Felhasználó keresése email alapján
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM bejelentkezesek WHERE email = ?', [email]);
    return rows[0];
  },

  // Felhasználó keresése felhasználónév alapján
  findByUsername: async (username) => {
    const [rows] = await pool.query('SELECT * FROM bejelentkezesek WHERE fnev = ?', [username]);
    return rows[0];
  },

  // Új felhasználó regisztrálása
  create: async (userData) => {
    const { fnev, jelszo, jogosultsag, email } = userData;
    const hashedPassword = await bcrypt.hash(jelszo, 10);
    
    const sql = 'INSERT INTO bejelentkezesek (fnev, jelszo, jogosultsag, email) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(sql, [fnev, hashedPassword, jogosultsag, email]);
    return result.insertId;
  },

  // Jelszó ellenőrzése
  verifyPassword: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
};

module.exports = authModel;