const express = require('express');
const router = express.Router();
const instrumentController = require('../controllers/instrumentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Instrument:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - rentalPrice
 *       properties:
 *         id:
 *           type: integer
 *           description: A hangszer egyedi azonosítója
 *         name:
 *           type: string
 *           description: A hangszer neve
 *         category:
 *           type: string
 *           description: A hangszer kategóriája (pl. Billentyűs, Gitár)
 *         rentalPrice:
 *           type: string
 *           description: Kölcsönzési ár (Ft/hó)
 *         teacher:
 *           type: string
 *           description: Az oktató neve
 *         teacherId:
 *           type: integer
 *           description: Az oktató ID-ja
 *         status:
 *           type: string
 *           enum: [available, rented, maintenance]
 *           description: A hangszer státusza
 */

/**
 * @swagger
 * /instruments:
 *   get:
 *     summary: Összes hangszer lekérése
 *     tags: [Hangszerek]
 *     responses:
 *       200:
 *         description: A hangszerek listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instrument'
 */
router.get('/', instrumentController.getAll);

/**
 * @swagger
 * /instruments/{id}:
 *   get:
 *     summary: Egy hangszer lekérése ID alapján
 *     tags: [Hangszerek]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A hangszer ID-ja
 *     responses:
 *       200:
 *         description: A hangszer adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instrument'
 *       404:
 *         description: Hangszer nem található
 */
router.get('/:id', instrumentController.getById);

/**
 * @swagger
 * /instruments:
 *   post:
 *     summary: Új hangszer létrehozása
 *     tags: [Hangszerek]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instrument'
 *     responses:
 *       201:
 *         description: Hangszer sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', instrumentController.create);

/**
 * @swagger
 * /instruments/{id}:
 *   put:
 *     summary: Hangszer frissítése
 *     tags: [Hangszerek]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A hangszer ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instrument'
 *     responses:
 *       200:
 *         description: Hangszer sikeresen frissítve
 *       404:
 *         description: Hangszer nem található
 */
router.put('/:id', instrumentController.update);

/**
 * @swagger
 * /instruments/{id}:
 *   delete:
 *     summary: Hangszer törlése
 *     tags: [Hangszerek]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A hangszer ID-ja
 *     responses:
 *       200:
 *         description: Hangszer sikeresen törölve
 *       404:
 *         description: Hangszer nem található
 */
router.delete('/:id', instrumentController.delete);

/**
 * @swagger
 * /instruments/{id}/rental:
 *   post:
 *     summary: Hangszer kölcsönzése
 *     tags: [Hangszerek]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A hangszer ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - diakId
 *               - duration
 *             properties:
 *               diakId:
 *                 type: integer
 *                 description: A diák ID-ja
 *               duration:
 *                 type: string
 *                 description: Kölcsönzés időtartama hónapokban
 *               megjegyzes:
 *                 type: string
 *                 description: Megjegyzés a kölcsönzéshez
 *     responses:
 *       201:
 *         description: Kölcsönzés sikeresen létrehozva
 *       400:
 *         description: Hiányzó adatok
 *       404:
 *         description: Hangszer nem található
 */
router.post('/:id/rental', instrumentController.createRental);

module.exports = router;