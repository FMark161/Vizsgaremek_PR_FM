const express = require('express');
const router = express.Router();
const instrumentController = require('../controllers/instrumentController');

router.get('/', instrumentController.getAll);
router.get('/:id', instrumentController.getById);
router.post('/', instrumentController.create);
router.put('/:id', instrumentController.update);
router.delete('/:id', instrumentController.delete);

module.exports = router;