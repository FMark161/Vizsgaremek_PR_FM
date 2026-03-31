const express = require('express');
const router = express.Router();
const teacherSkillController = require('../controllers/teacherSkillController');

// GET /api/teacher-skills - összes kapcsolat
router.get('/', teacherSkillController.getAll);

// GET /api/teacher-skills/:id - egy kapcsolat
router.get('/:id', teacherSkillController.getById);

// POST /api/teacher-skills - új kapcsolat
router.post('/', teacherSkillController.create);

// DELETE /api/teacher-skills/:id - kapcsolat törlése
router.delete('/:id', teacherSkillController.delete);

module.exports = router;