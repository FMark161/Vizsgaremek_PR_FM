const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// GET /api/teachers - összes tanár
router.get('/', teacherController.getAll);

// GET /api/teachers/:id - egy tanár
router.get('/:id', teacherController.getById);

module.exports = router;