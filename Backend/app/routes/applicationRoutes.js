const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Get all applications
router.get('/', applicationController.getAll);

// Get one application by ID
router.get('/:id', applicationController.getById);

// Create new application
router.post('/', applicationController.create);

// Update status
router.patch('/:id/status', applicationController.updateStatus);

// Delete application
router.delete('/:id', applicationController.delete);

module.exports = router; 