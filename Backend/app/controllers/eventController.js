const eventModel = require('../models/eventModel');

const eventController = {
  // GET /api/events
  getAll: async (req, res, next) => {
    try {
      const events = await eventModel.getAll();
      res.json(events);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/events/featured
  getFeatured: async (req, res, next) => {
    try {
      const events = await eventModel.getFeatured();
      res.json(events);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/events/upcoming?limit=4
  getUpcoming: async (req, res, next) => {
    try {
      const limit = req.query.limit || 4;
      const events = await eventModel.getUpcoming(parseInt(limit));
      res.json(events);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/events/:id
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await eventModel.getById(id);
      
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = eventController;