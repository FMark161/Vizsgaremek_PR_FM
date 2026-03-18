const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET /api/events/featured - kiemelt események
router.get('/featured', eventController.getFeatured);

// GET /api/events/upcoming - következő események
router.get('/upcoming', eventController.getUpcoming);

// GET /api/events/:id - egy esemény ID alapján
router.get('/:id', eventController.getById);

// GET /api/events - összes esemény
router.get('/', eventController.getAll);

module.exports = router;