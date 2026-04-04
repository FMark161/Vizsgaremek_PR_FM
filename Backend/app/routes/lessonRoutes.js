const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/', lessonController.getAll);
router.get('/student/:studentId', lessonController.getByStudentId);
router.get('/teacher/:teacherId', lessonController.getByTeacherId);
router.post('/', lessonController.create);
router.put('/:id', lessonController.update);
router.delete('/:id', lessonController.delete);

module.exports = router;