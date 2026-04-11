const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - nev
 *       properties:
 *         id:
 *           type: integer
 *           description: A diák egyedi azonosítója
 *         nev:
 *           type: string
 *           description: A diák neve
 *         telefonsz:
 *           type: string
 *           description: Telefonszám
 *         email:
 *           type: string
 *           format: email
 *           description: Email cím
 *         szulDatum:
 *           type: string
 *           format: date
 *           description: Születési dátum (YYYY-MM-DD)
 *         sajatHangszer:
 *           type: string
 *           description: Saját hangszer (ha van)
 *         felhasznaloId:
 *           type: integer
 *           description: Kapcsolódó felhasználó ID-ja a bejelentkezesek táblából
 *         felhasznaloNev:
 *           type: string
 *           description: Kapcsolódó felhasználónév
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Összes diák lekérése
 *     tags: [Diákok]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A diákok listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/', studentController.getAll);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Egy diák lekérése ID alapján
 *     tags: [Diákok]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A diák ID-ja
 *     responses:
 *       200:
 *         description: A diák adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Diák nem található
 */
router.get('/:id', studentController.getById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Új diák létrehozása
 *     tags: [Diákok]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nev
 *             properties:
 *               nev:
 *                 type: string
 *                 description: A diák neve
 *               telefonsz:
 *                 type: string
 *                 description: Telefonszám
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email cím
 *               szulDatum:
 *                 type: string
 *                 format: date
 *                 description: Születési dátum (YYYY-MM-DD)
 *               sajatHangszer:
 *                 type: string
 *                 description: Saját hangszer
 *               felhasznaloId:
 *                 type: integer
 *                 description: Kapcsolódó felhasználó ID-ja
 *     responses:
 *       201:
 *         description: Diák sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', studentController.create);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Diák frissítése
 *     tags: [Diákok]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A diák ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Diák sikeresen frissítve
 *       404:
 *         description: Diák nem található
 */
router.put('/:id', studentController.update);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Diák törlése
 *     tags: [Diákok]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A diák ID-ja
 *     responses:
 *       200:
 *         description: Diák sikeresen törölve
 *       404:
 *         description: Diák nem található
 */
router.delete('/:id', studentController.delete);

module.exports = router;