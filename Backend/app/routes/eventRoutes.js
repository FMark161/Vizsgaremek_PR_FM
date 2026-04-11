const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - cim
 *         - datum
 *         - idopont
 *         - helyszin
 *       properties:
 *         id:
 *           type: integer
 *           description: Az esemény egyedi azonosítója
 *         cim:
 *           type: string
 *           description: Az esemény címe
 *         datum:
 *           type: string
 *           format: date
 *           description: Az esemény dátuma (YYYY-MM-DD)
 *         idopont:
 *           type: string
 *           description: Az esemény időpontja
 *         helyszin:
 *           type: string
 *           description: Az esemény helyszíne
 *         leiras:
 *           type: string
 *           description: Rövid leírás
 *         hosszuleiras:
 *           type: string
 *           description: Hosszú leírás
 *         kategoria:
 *           type: string
 *           description: Esemény kategória
 *         kiemelt:
 *           type: boolean
 *           description: Kiemelt esemény-e
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Összes esemény lekérése
 *     tags: [Események]
 *     responses:
 *       200:
 *         description: Az események listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/', eventController.getAll);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Egy esemény lekérése ID alapján
 *     tags: [Események]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az esemény ID-ja
 *     responses:
 *       200:
 *         description: Az esemény adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Esemény nem található
 */
router.get('/:id', eventController.getById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Új esemény létrehozása
 *     tags: [Események]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Esemény sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', eventController.create);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Esemény frissítése
 *     tags: [Események]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az esemény ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Esemény sikeresen frissítve
 *       404:
 *         description: Esemény nem található
 */
router.put('/:id', eventController.update);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Esemény törlése
 *     tags: [Események]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az esemény ID-ja
 *     responses:
 *       200:
 *         description: Esemény sikeresen törölve
 *       404:
 *         description: Esemény nem található
 */
router.delete('/:id', eventController.delete);

module.exports = router;