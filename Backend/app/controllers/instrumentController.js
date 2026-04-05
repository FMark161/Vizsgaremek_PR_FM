const instrumentModel = require('../models/instrumentModel');

const instrumentController = {
  getAll: async (req, res, next) => {
    try {
      console.log('=== instrumentController.getAll lefut ===');
      const instruments = await instrumentModel.getAll();
      res.json(instruments);
    } catch (error) {
      console.error('Hiba a getAll-ben:', error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const instrument = await instrumentModel.getById(id);
      if (!instrument) {
        return res.status(404).json({ error: 'Instrument not found' });
      }
      res.json(instrument);
    } catch (error) {
      next(error);
    }
  },

  createRental: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { diakId, duration, megjegyzes } = req.body;
      
      if (!diakId || !duration) {
        return res.status(400).json({ error: 'Diák ID és időtartam megadása kötelező' });
      }
      
      const rentalId = await instrumentModel.createRental(id, diakId, duration, megjegyzes);
      
      res.status(201).json({ 
        message: 'Kölcsönzés sikeresen létrehozva',
        rentalId: rentalId
      });
    } catch (error) {
      console.error('Hiba a kölcsönzés létrehozásakor:', error);
      next(error);
    }
  }
};

module.exports = instrumentController;