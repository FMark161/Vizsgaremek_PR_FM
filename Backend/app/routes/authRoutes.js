const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - fnev
 *         - jelszo
 *         - email
 *       properties:
 *         fnev:
 *           type: string
 *           description: "Felhasználónév"
 *         jelszo:
 *           type: string
 *           description: "Jelszó (min. 6 karakter)"
 *         email:
 *           type: string
 *           format: email
 *           description: "Email cím"
 *         jogosultsag:
 *           type: string
 *           enum: [admin, tanar, diak]
 *           description: "Jogosultság (alapértelmezett: diak)"
 *     LoginRequest:
 *       type: object
 *       required:
 *         - fnev
 *         - jelszo
 *       properties:
 *         fnev:
 *           type: string
 *           description: "Felhasználónév"
 *         jelszo:
 *           type: string
 *           description: "Jelszó"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             fnev:
 *               type: string
 *             email:
 *               type: string
 *             jogosultsag:
 *               type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: "Új felhasználó regisztrálása"
 *     tags: [Autentikáció]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: "Sikeres regisztráció"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: "Hibás adatok vagy már létező felhasználó"
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: "Bejelentkezés"
 *     tags: [Autentikáció]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: "Sikeres bejelentkezés"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: "Hibás felhasználónév vagy jelszó"
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: "Token ellenőrzése"
 *     tags: [Autentikáció]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Token érvényes"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     fnev:
 *                       type: string
 *                     email:
 *                       type: string
 *                     jogosultsag:
 *                       type: string
 *       401:
 *         description: "Érvénytelen vagy hiányzó token"
 */
router.get('/verify', authController.verify);

module.exports = router;