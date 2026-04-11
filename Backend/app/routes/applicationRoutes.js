const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       required:
 *         - nev
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: A jelentkezés egyedi azonosítója
 *         nev:
 *           type: string
 *           description: Jelentkező neve
 *         email:
 *           type: string
 *           format: email
 *           description: Email cím
 *         telefon:
 *           type: string
 *           description: Telefonszám
 *         szul_datum:
 *           type: string
 *           format: date
 *           description: Születési dátum
 *         hangszer:
 *           type: string
 *           description: Választott hangszer
 *         szint:
 *           type: string
 *           description: Zenei szint
 *         sajat_hangszer:
 *           type: string
 *           description: Van saját hangszere?
 *         uzenet:
 *           type: string
 *           description: Üzenet a jelentkezőtől
 *         statusz:
 *           type: string
 *           enum: [new, contacted, accepted, rejected]
 *           description: Jelentkezés státusza
 *         letrehozas:
 *           type: string
 *           format: date-time
 *           description: Létrehozás dátuma
 */

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Összes jelentkezés lekérése
 *     tags: [Jelentkezések]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A jelentkezések listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.get('/', applicationController.getAll);

/**
 * @swagger
 * /applications/{id}:
 *   get:
 *     summary: Egy jelentkezés lekérése ID alapján
 *     tags: [Jelentkezések]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A jelentkezés ID-ja
 *     responses:
 *       200:
 *         description: A jelentkezés adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       404:
 *         description: Jelentkezés nem található
 */
router.get('/:id', applicationController.getById);

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Új jelentkezés létrehozása
 *     tags: [Jelentkezések]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: Jelentkezés sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', applicationController.create);

/**
 * @swagger
 * /applications/{id}:
 *   put:
 *     summary: Jelentkezés frissítése
 *     tags: [Jelentkezések]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A jelentkezés ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       200:
 *         description: Jelentkezés sikeresen frissítve
 *       404:
 *         description: Jelentkezés nem található
 */
router.put('/:id', applicationController.update);

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: Jelentkezés törlése
 *     tags: [Jelentkezések]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A jelentkezés ID-ja
 *     responses:
 *       200:
 *         description: Jelentkezés sikeresen törölve
 *       404:
 *         description: Jelentkezés nem található
 */
router.delete('/:id', applicationController.delete);

module.exports = router;