const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       required:
 *         - tanarId
 *         - diakId
 *         - hangszerId
 *         - ora_datum
 *         - ora_ido
 *       properties:
 *         id:
 *           type: integer
 *           description: Az óra egyedi azonosítója
 *         tanarId:
 *           type: integer
 *           description: A tanár ID-ja
 *         diakId:
 *           type: integer
 *           description: A diák ID-ja
 *         hangszerId:
 *           type: integer
 *           description: A hangszer ID-ja
 *         tema:
 *           type: string
 *           description: Az óra témája
 *         ora_datum:
 *           type: string
 *           format: date
 *           description: Az óra dátuma
 *         ora_ido:
 *           type: string
 *           description: Az óra időpontja
 *         statusz:
 *           type: string
 *           enum: [tervezett, megtartva, lemondva]
 *           description: Az óra státusza
 */

/**
 * @swagger
 * /lessons:
 *   get:
 *     summary: Összes óra lekérése
 *     tags: [Órák]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Az órák listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 */
router.get('/', lessonController.getAll);

/**
 * @swagger
 * /lessons/student/{studentId}:
 *   get:
 *     summary: Egy diák óráinak lekérése
 *     tags: [Órák]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: A diák ID-ja
 *     responses:
 *       200:
 *         description: A diák óráinak listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 */
router.get('/student/:studentId', lessonController.getByStudentId);

/**
 * @swagger
 * /lessons/teacher/{teacherId}:
 *   get:
 *     summary: Egy tanár óráinak lekérése
 *     tags: [Órák]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *         description: A tanár ID-ja
 *     responses:
 *       200:
 *         description: A tanár óráinak listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lesson'
 */
router.get('/teacher/:teacherId', lessonController.getByTeacherId);

/**
 * @swagger
 * /lessons:
 *   post:
 *     summary: Új óra létrehozása
 *     tags: [Órák]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       201:
 *         description: Óra sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', lessonController.create);

/**
 * @swagger
 * /lessons/{id}:
 *   put:
 *     summary: Óra frissítése
 *     tags: [Órák]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az óra ID-ja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       200:
 *         description: Óra sikeresen frissítve
 *       404:
 *         description: Óra nem található
 */
router.put('/:id', lessonController.update);

/**
 * @swagger
 * /lessons/{id}:
 *   delete:
 *     summary: Óra törlése
 *     tags: [Órák]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Az óra ID-ja
 *     responses:
 *       200:
 *         description: Óra sikeresen törölve
 *       404:
 *         description: Óra nem található
 */
router.delete('/:id', lessonController.delete);

module.exports = router;