const teacherModel = require('../models/teacherModel');

const teacherController = {
  // GET /api/teachers
  getAll: async (req, res, next) => {
    try {
      const teachers = await teacherModel.getAll();
      res.json(teachers);
    } catch (error) {
      console.error('Hiba a tanárok lekérésekor:', error);
      next(error);
    }
  },

  // GET /api/teachers/:id
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const teacher = await teacherModel.getById(id);
      
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      
      res.json(teacher);
    } catch (error) {
      console.error('Hiba a tanár lekérésekor:', error);
      next(error);
    }
  }
};

module.exports = teacherController;