const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - nev
 *         - email
 *         - uzenet
 *       properties:
 *         id:
 *           type: integer
 *           description: Az üzenet egyedi azonosítója
 *         nev:
 *           type: string
 *           description: A küldő neve
 *         email:
 *           type: string
 *           format: email
 *           description: A küldő email címe
 *         telefon:
 *           type: string
 *           description: A küldő telefonszáma
 *         targy:
 *           type: string
 *           description: Az üzenet tárgya
 *         uzenet:
 *           type: string
 *           description: Az üzenet tartalma
 *         statusz:
 *           type: string
 *           enum: [uj, olvasott]
 *           description: Az üzenet státusza
 *         letrehozas:
 *           type: string
 *           format: date
 *           description: Az üzenet létrehozásának dátuma
 */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Összes üzenet lekérése
 *     tags: [Üzenetek]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Az üzenetek listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
router.get('/', messageController.getAll);

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Egy üzenet lekérése ID alapján
 *     tags: [Üzenetek]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az üzenet ID-ja
 *     responses:
 *       200:
 *         description: Az üzenet adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Üzenet nem található
 */
router.get('/:id', messageController.getById);

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Új üzenet küldése (látogatóknak)
 *     tags: [Üzenetek]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Üzenet sikeresen elküldve
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', messageController.create);

/**
 * @swagger
 * /messages/{id}/read:
 *   patch:
 *     summary: Üzenet olvasottá jelölése
 *     tags: [Üzenetek]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az üzenet ID-ja
 *     responses:
 *       200:
 *         description: Üzenet olvasottnak jelölve
 *       404:
 *         description: Üzenet nem található
 */
router.patch('/:id/read', messageController.markAsRead);

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Üzenet törlése
 *     tags: [Üzenetek]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az üzenet ID-ja
 *     responses:
 *       200:
 *         description: Üzenet sikeresen törölve
 *       404:
 *         description: Üzenet nem található
 */
router.delete('/:id', messageController.delete);

module.exports = router;