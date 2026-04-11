const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: Az oktató egyedi azonosítója
 *         name:
 *           type: string
 *           description: Az oktató neve
 *         phone:
 *           type: string
 *           description: Telefonszám
 *         email:
 *           type: string
 *           description: Email cím
 *         experience:
 *           type: string
 *           description: Tapasztalat (években)
 *         education:
 *           type: string
 *           description: Végzettség
 *         description:
 *           type: string
 *           description: Leírás az oktatóról
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Összes oktató lekérése
 *     tags: [Oktatók]
 *     responses:
 *       200:
 *         description: Az oktatók listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */
router.get('/', teacherController.getAll);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Egy oktató lekérése ID alapján
 *     tags: [Oktatók]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az oktató ID-ja
 *     responses:
 *       200:
 *         description: Az oktató adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Oktató nem található
 */
router.get('/:id', teacherController.getById);

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Új oktató létrehozása
 *     tags: [Oktatók]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Oktató sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', teacherController.create);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Oktató frissítése
 *     tags: [Oktatók]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az oktató ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Oktató sikeresen frissítve
 *       404:
 *         description: Oktató nem található
 */
router.put('/:id', teacherController.update);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Oktató törlése
 *     tags: [Oktatók]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az oktató ID-ja
 *     responses:
 *       200:
 *         description: Oktató sikeresen törölve
 *       404:
 *         description: Oktató nem található
 */
router.delete('/:id', teacherController.delete);

module.exports = router;