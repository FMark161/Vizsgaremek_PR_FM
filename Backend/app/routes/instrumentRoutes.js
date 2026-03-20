const express = require('express');
const router = express.Router();
const instrumentController = require('../controllers/instrumentController');

// GET /api/instruments - összes hangszer
router.get('/', instrumentController.getAll);

// GET /api/instruments/:id - egy hangszer
router.get('/:id', instrumentController.getById);

// POST /api/instruments/:id/rental - kölcsönzés
router.post('/:id/rental', instrumentController.createRental);

module.exports = router;