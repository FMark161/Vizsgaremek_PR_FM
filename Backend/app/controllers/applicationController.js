const applicationModel = require('../models/applicationModel');

const applicationController = {
  // GET /api/applications
  getAll: async (req, res, next) => {
    try {
      const applications = await applicationModel.getAll();
      res.json(applications);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/applications/:id
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const application = await applicationModel.getById(id);
      
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      
      res.json(application);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/applications
  create: async (req, res, next) => {
    try {
      const { name, email, phone, birthDate, instrument, level, ownInstrument, message } = req.body;
      
      // Validation
      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email and phone are required' });
      }
      
      const newId = await applicationModel.create({
        name, email, phone, birthDate, instrument, level, ownInstrument, message
      });
      
      res.status(201).json({ 
        message: 'Application successfully saved',
        id: newId 
      });
    } catch (error) {
      next(error);
    }
  },

  // PATCH /api/applications/:id/status
  updateStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const validStatuses = ['new', 'contacted', 'accepted', 'rejected'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      
      const updated = await applicationModel.updateStatus(id, status);
      
      if (!updated) {
        return res.status(404).json({ error: 'Application not found' });
      }
      
      res.json({ message: 'Status updated' });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/applications/:id
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await applicationModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Application not found' });
      }
      
      res.json({ message: 'Application deleted' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = applicationController;