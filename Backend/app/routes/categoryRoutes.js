const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - katNev
 *       properties:
 *         id:
 *           type: integer
 *           description: A kategória egyedi azonosítója
 *         katNev:
 *           type: string
 *           description: A kategória neve (pl. Gitár, Zongora)
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Összes kategória lekérése
 *     tags: [Kategóriák]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A kategóriák listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', categoryController.getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Egy kategória lekérése ID alapján
 *     tags: [Kategóriák]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A kategória ID-ja
 *     responses:
 *       200:
 *         description: A kategória adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Kategória nem található
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Új kategória létrehozása
 *     tags: [Kategóriák]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Kategória sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', categoryController.create);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Kategória frissítése
 *     tags: [Kategóriák]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A kategória ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Kategória sikeresen frissítve
 *       404:
 *         description: Kategória nem található
 */
router.put('/:id', categoryController.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Kategória törlése
 *     tags: [Kategóriák]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A kategória ID-ja
 *     responses:
 *       200:
 *         description: Kategória sikeresen törölve
 *       404:
 *         description: Kategória nem található
 */
router.delete('/:id', categoryController.delete);

module.exports = router;