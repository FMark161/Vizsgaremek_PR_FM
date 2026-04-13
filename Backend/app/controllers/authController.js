const pool = require('../models/db');
const authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'harmonia_zeneiskola_secret_key_2025';

const authController = {
  register: async (req, res, next) => {
    try {
      const { fnev, jelszo, email, jogosultsag } = req.body;

      if (!fnev || !jelszo || !email) {
        return res.status(400).json({ error: 'Minden mező kitöltése kötelező' });
      }

      if (jelszo.length < 6) {
        return res.status(400).json({ error: 'A jelszónak legalább 6 karakter hosszúnak kell lennie' });
      }

      const existingUser = await authModel.findByUsername(fnev);
      if (existingUser) {
        return res.status(400).json({ error: 'Ez a felhasználónév már foglalt' });
      }

      const existingEmail = await authModel.findByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Ez az email cím már regisztrálva van' });
      }

      const userRole = jogosultsag || 'diak';
      const userId = await authModel.create({
        fnev,
        jelszo,
        jogosultsag: userRole,
        email
      });

      console.log('Létrehozott felhasználó ID:', userId);

      const token = jwt.sign(
        { id: userId, fnev, jogosultsag: userRole, email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Sikeres regisztráció',
        token,
        user: {
          id: userId,
          fnev,
          email,
          jogosultsag: userRole
        }
      });
    } catch (error) {
      console.error('Regisztrációs hiba:', error);
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { fnev, jelszo, rememberMe } = req.body;

      if (!fnev || !jelszo) {
        return res.status(400).json({ error: 'Felhasználónév és jelszó megadása kötelező' });
      }

      const user = await authModel.findByUsername(fnev);
      if (!user) {
        return res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó' });
      }

      const isValid = await authModel.verifyPassword(jelszo, user.jelszo);
      if (!isValid) {
        return res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó' });
      }

      const expiresIn = rememberMe ? '30d' : '1d';

      const token = jwt.sign(
        { id: user.id, fnev: user.fnev, jogosultsag: user.jogosultsag, email: user.email },
        JWT_SECRET,
        { expiresIn: expiresIn }
      );

      res.json({
        message: 'Sikeres bejelentkezés',
        token,
        user: {
          id: user.id,
          fnev: user.fnev,
          email: user.email,
          jogosultsag: user.jogosultsag
        }
      });
    } catch (error) {
      console.error('Bejelentkezési hiba:', error);
      next(error);
    }
  },

  verify: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Nincs token' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({
        valid: true,
        user: {
          id: decoded.id,
          fnev: decoded.fnev,
          email: decoded.email,
          jogosultsag: decoded.jogosultsag
        }
      });
    } catch (error) {
      console.error('Token ellenőrzési hiba:', error);
      res.status(401).json({ error: 'Érvénytelen token' });
    }
  }
};

module.exports = authController;