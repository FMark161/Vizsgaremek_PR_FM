const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fnev
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: "A felhasználó egyedi azonosítója"
 *         fnev:
 *           type: string
 *           description: "Felhasználónév"
 *         email:
 *           type: string
 *           format: email
 *           description: "Email cím"
 *         jogosultsag:
 *           type: string
 *           enum: [admin, tanar, diak]
 *           description: "Jogosultság"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: "Regisztráció dátuma"
 *     UserCreate:
 *       type: object
 *       required:
 *         - fnev
 *         - jelszo
 *         - email
 *       properties:
 *         fnev:
 *           type: string
 *           description: "Felhasználónév"
 *         jelszo:
 *           type: string
 *           description: "Jelszó (min. 6 karakter)"
 *         email:
 *           type: string
 *           format: email
 *           description: "Email cím"
 *         jogosultsag:
 *           type: string
 *           enum: [admin, tanar, diak]
 *           description: "Jogosultság (alapértelmezett: diak)"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Összes felhasználó lekérése"
 *     tags: [Felhasználók]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "A felhasználók listája"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', userController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: "Egy felhasználó lekérése ID alapján"
 *     tags: [Felhasználók]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "A felhasználó ID-ja"
 *     responses:
 *       200:
 *         description: "A felhasználó adatai"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: "Felhasználó nem található"
 */
router.get('/:id', userController.getById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: "Új felhasználó létrehozása"
 *     tags: [Felhasználók]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: "Felhasználó sikeresen létrehozva"
 *       400:
 *         description: "Hiányzó vagy érvénytelen adatok"
 */
router.post('/', userController.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: "Felhasználó frissítése"
 *     tags: [Felhasználók]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "A felhasználó ID-ja"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: "Felhasználó sikeresen frissítve"
 *       404:
 *         description: "Felhasználó nem található"
 */
router.put('/:id', userController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: "Felhasználó törlése"
 *     tags: [Felhasználók]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "A felhasználó ID-ja"
 *     responses:
 *       200:
 *         description: "Felhasználó sikeresen törölve"
 *       404:
 *         description: "Felhasználó nem található"
 */
router.delete('/:id', userController.delete);

module.exports = router;