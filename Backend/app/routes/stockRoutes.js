const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Stock:
 *       type: object
 *       required:
 *         - ar
 *       properties:
 *         id:
 *           type: integer
 *           description: A leltár elem egyedi azonosítója
 *         ar:
 *           type: integer
 *           description: A hangszer ára (Ft)
 *         elerhetoseg:
 *           type: boolean
 *           description: Elérhető-e a hangszer (1 = igen, 0 = nem)
 */

/**
 * @swagger
 * /stock:
 *   get:
 *     summary: Összes leltár elem lekérése
 *     tags: [Leltár]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A leltár elemek listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stock'
 */
router.get('/', stockController.getAll);

/**
 * @swagger
 * /stock/{id}:
 *   get:
 *     summary: Egy leltár elem lekérése ID alapján
 *     tags: [Leltár]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A leltár elem ID-ja
 *     responses:
 *       200:
 *         description: A leltár elem adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stock'
 *       404:
 *         description: Leltár elem nem található
 */
router.get('/:id', stockController.getById);

/**
 * @swagger
 * /stock:
 *   post:
 *     summary: Új leltár elem létrehozása
 *     tags: [Leltár]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       201:
 *         description: Leltár elem sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', stockController.create);

/**
 * @swagger
 * /stock/{id}:
 *   put:
 *     summary: Leltár elem frissítése
 *     tags: [Leltár]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A leltár elem ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       200:
 *         description: Leltár elem sikeresen frissítve
 *       404:
 *         description: Leltár elem nem található
 */
router.put('/:id', stockController.update);

/**
 * @swagger
 * /stock/{id}:
 *   delete:
 *     summary: Leltár elem törlése
 *     tags: [Leltár]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A leltár elem ID-ja
 *     responses:
 *       200:
 *         description: Leltár elem sikeresen törölve
 *       404:
 *         description: Leltár elem nem található
 */
router.delete('/:id', stockController.delete);

module.exports = router;