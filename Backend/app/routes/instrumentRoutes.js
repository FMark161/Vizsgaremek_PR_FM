const express = require('express');
const router = express.Router();

// Összes hangszer lekérése
router.get('/', (req, res) => {
  res.json({ message: 'Instruments list - coming soon' });
});

// Egy hangszer lekérése ID alapján
router.get('/:id', (req, res) => {
  res.json({ message: `Instrument ${req.params.id} - coming soon` });
});

module.exports = router;