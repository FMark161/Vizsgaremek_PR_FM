const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getAll);
router.post('/', messageController.create);
router.patch('/:id/read', messageController.markAsRead);
router.delete('/:id', messageController.delete);

module.exports = router;