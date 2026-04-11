const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       required:
 *         - hangszerId
 *         - diakId
 *         - kolcsVeg
 *       properties:
 *         id:
 *           type: integer
 *           description: A kölcsönzés egyedi azonosítója
 *         hangszerId:
 *           type: integer
 *           description: A hangszer ID-ja
 *         diakId:
 *           type: integer
 *           description: A diák ID-ja
 *         kolcsKezd:
 *           type: string
 *           format: date
 *           description: Kölcsönzés kezdő dátuma
 *         kolcsVeg:
 *           type: string
 *           format: date
 *           description: Kölcsönzés végző dátuma
 *         megjegyzes:
 *           type: string
 *           description: Megjegyzés
 *         statusz:
 *           type: string
 *           enum: [aktiv, lezart]
 *           description: Kölcsönzés státusza
 */

/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Összes kölcsönzés lekérése
 *     tags: [Kölcsönzések]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A kölcsönzések listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 */
router.get('/', rentalController.getAll);

/**
 * @swagger
 * /rentals/{id}:
 *   get:
 *     summary: Egy kölcsönzés lekérése ID alapján
 *     tags: [Kölcsönzések]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A kölcsönzés ID-ja
 *     responses:
 *       200:
 *         description: A kölcsönzés adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Kölcsönzés nem található
 */
router.get('/:id', rentalController.getById);

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Új kölcsönzés létrehozása
 *     tags: [Kölcsönzések]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       201:
 *         description: Kölcsönzés sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', rentalController.create);

/**
 * @swagger
 * /rentals/{id}:
 *   put:
 *     summary: Kölcsönzés frissítése
 *     tags: [Kölcsönzések]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A kölcsönzés ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rental'
 *     responses:
 *       200:
 *         description: Kölcsönzés sikeresen frissítve
 *       404:
 *         description: Kölcsönzés nem található
 */
router.put('/:id', rentalController.update);

/**
 * @swagger
 * /rentals/{id}:
 *   delete:
 *     summary: Kölcsönzés törlése
 *     tags: [Kölcsönzések]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A kölcsönzés ID-ja
 *     responses:
 *       200:
 *         description: Kölcsönzés sikeresen törölve
 *       404:
 *         description: Kölcsönzés nem található
 */
router.delete('/:id', rentalController.delete);

module.exports = router;