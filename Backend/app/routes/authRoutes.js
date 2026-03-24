const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Regisztráció
router.post('/register', authController.register);

// Bejelentkezés
router.post('/login', authController.login);

// Token ellenőrzés
router.get('/verify', authController.verify);

module.exports = router;