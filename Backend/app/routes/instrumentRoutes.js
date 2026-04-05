const express = require('express');
const router = express.Router();
const instrumentController = require('../controllers/instrumentController');

router.get('/', instrumentController.getAll);
router.get('/:id', instrumentController.getById);
router.post('/:id/rental', instrumentController.createRental);

module.exports = router;