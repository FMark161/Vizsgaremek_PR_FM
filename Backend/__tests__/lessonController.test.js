// Mock-ok a fájl tetején
jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getByStudentId, getByTeacherId, create, update, delete: deleteLesson } = require('../app/controllers/lessonController');
const pool = require('../app/models/db');

describe('Lesson Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all lessons', async () => {
      const mockLessons = [
        { 
          id: 1, 
          datum: '2025-04-07', 
          ido: '15:00:00', 
          tema: 'Zongora alapok', 
          statusz: 'tervezett',
          tanarNev: 'Kovács Anna',
          tanarId: 1,
          diakNev: 'Kiss Péter',
          diakId: 1,
          hangszerNev: 'Zongora',
          hangszerId: 1
        },
        { 
          id: 2, 
          datum: '2025-04-08', 
          ido: '16:00:00', 
          tema: 'Gitár gyakorlat', 
          statusz: 'tervezett',
          tanarNev: 'Nagy Péter',
          tanarId: 2,
          diakNev: 'Nagy Anna',
          diakId: 2,
          hangszerNev: 'Gitár',
          hangszerId: 3
        }
      ];

      pool.query.mockResolvedValue([mockLessons]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockLessons);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getByStudentId', () => {
    it('should return lessons for a student', async () => {
      req.params.studentId = '1';
      const mockLessons = [
        { 
          id: 1, 
          datum: '2025-04-07', 
          ido: '15:00:00', 
          tema: 'Zongora alapok', 
          statusz: 'tervezett',
          tanarNev: 'Kovács Anna',
          tanarId: 1,
          hangszerNev: 'Zongora',
          hangszerId: 1
        }
      ];

      pool.query.mockResolvedValue([mockLessons]);

      await getByStudentId(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockLessons);
    });
  });

  describe('getByTeacherId', () => {
    it('should return lessons for a teacher', async () => {
      req.params.teacherId = '1';
      const mockLessons = [
        { 
          id: 1, 
          datum: '2025-04-07', 
          ido: '15:00:00', 
          tema: 'Zongora alapok', 
          statusz: 'tervezett',
          tanarId: 1,
          diakId: 1,
          diakNev: 'Kiss Péter',
          hangszerNev: 'Zongora'
        }
      ];

      pool.query.mockResolvedValue([mockLessons]);

      await getByTeacherId(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockLessons);
    });
  });

  describe('create', () => {
    it('should create a new lesson successfully', async () => {
      req.body = {
        tanarId: 1,
        diakId: 1,
        hangszerId: 1,
        tema: 'Új óra',
        ora_datum: '2025-05-10',
        ora_ido: '14:00:00',
        statusz: 'tervezett'
      };

      pool.query.mockResolvedValue([{ insertId: 5 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 5,
          message: 'Óra létrehozva'
        })
      );
    });

    it('should create lesson with default status', async () => {
      req.body = {
        tanarId: 1,
        diakId: 1,
        hangszerId: 1,
        tema: 'Új óra',
        ora_datum: '2025-05-10',
        ora_ido: '14:00:00'
      };

      pool.query.mockResolvedValue([{ insertId: 6 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('update', () => {
    it('should update a lesson successfully', async () => {
      req.params.id = '1';
      req.body = {
        tema: 'Módosított téma',
        ora_datum: '2025-05-15',
        ora_ido: '15:00:00',
        statusz: 'megtartva'
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Óra frissítve' });
    });

    it('should return 404 if lesson not found', async () => {
      req.params.id = '999';
      req.body = {
        tema: 'Nem létező',
        ora_datum: '2025-05-15',
        ora_ido: '15:00:00'
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('delete', () => {
    it('should delete a lesson successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteLesson(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Óra törölve' });
    });

    it('should return 404 if lesson not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteLesson(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});