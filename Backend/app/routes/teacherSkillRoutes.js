const express = require('express');
const router = express.Router();
const teacherSkillController = require('../controllers/teacherSkillController');

/**
 * @swagger
 * components:
 *   schemas:
 *     TeacherSkill:
 *       type: object
 *       required:
 *         - tanarId
 *         - hangszerId
 *       properties:
 *         id:
 *           type: integer
 *           description: A kapcsolat egyedi azonosítója
 *         tanarId:
 *           type: integer
 *           description: A tanár ID-ja
 *         hangszerId:
 *           type: integer
 *           description: A hangszer ID-ja
 *         tanarNev:
 *           type: string
 *           description: A tanár neve (JOIN-ból)
 *         hangszerNev:
 *           type: string
 *           description: A hangszer neve (JOIN-ból)
 */

/**
 * @swagger
 * /teacher-skills:
 *   get:
 *     summary: Összes tanár-hangszer kapcsolat lekérése
 *     tags: [Oktatók hangszerei]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A kapcsolatok listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeacherSkill'
 */
router.get('/', teacherSkillController.getAll);

/**
 * @swagger
 * /teacher-skills/{id}:
 *   get:
 *     summary: Egy tanár-hangszer kapcsolat lekérése ID alapján
 *     tags: [Oktatók hangszerei]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A kapcsolat ID-ja
 *     responses:
 *       200:
 *         description: A kapcsolat adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherSkill'
 *       404:
 *         description: Kapcsolat nem található
 */
router.get('/:id', teacherSkillController.getById);

/**
 * @swagger
 * /teacher-skills:
 *   post:
 *     summary: Új tanár-hangszer kapcsolat létrehozása
 *     tags: [Oktatók hangszerei]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tanarId
 *               - hangszerId
 *             properties:
 *               tanarId:
 *                 type: integer
 *                 description: A tanár ID-ja
 *               hangszerId:
 *                 type: integer
 *                 description: A hangszer ID-ja
 *     responses:
 *       201:
 *         description: Kapcsolat sikeresen létrehozva
 *       400:
 *         description: Hiányzó vagy érvénytelen adatok
 */
router.post('/', teacherSkillController.create);

/**
 * @swagger
 * /teacher-skills/{id}:
 *   delete:
 *     summary: Tanár-hangszer kapcsolat törlése
 *     tags: [Oktatók hangszerei]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: A kapcsolat ID-ja
 *     responses:
 *       200:
 *         description: Kapcsolat sikeresen törölve
 *       404:
 *         description: Kapcsolat nem található
 */
router.delete('/:id', teacherSkillController.delete);

module.exports = router;