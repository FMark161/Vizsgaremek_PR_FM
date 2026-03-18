const instrumentController = {
  getAll: async (req, res, next) => {
    try {
      // Később jön az adatbázis lekérdezés
      res.json({ message: 'Instruments list - coming soon' });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json({ message: `Instrument ${id} - coming soon` });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = instrumentController;