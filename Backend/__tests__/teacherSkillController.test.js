// Mock-ok a fájl tetején
jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, delete: deleteTeacherSkill } = require('../app/controllers/teacherSkillController');
const pool = require('../app/models/db');

describe('Teacher Skill Controller', () => {
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
    it('should return all teacher-skill relationships', async () => {
      const mockRelations = [
        { id: 1, tanarId: 1, hangszerId: 1, tanarNev: 'Kovács Anna', hangszerNev: 'Akusztikus zongora' },
        { id: 2, tanarId: 1, hangszerId: 2, tanarNev: 'Kovács Anna', hangszerNev: 'Digitális zongora' },
        { id: 3, tanarId: 2, hangszerId: 3, tanarNev: 'Nagy Péter', hangszerNev: 'Akusztikus gitár' },
        { id: 4, tanarId: 2, hangszerId: 4, tanarNev: 'Nagy Péter', hangszerNev: 'Elektromos gitár' }
      ];

      pool.query.mockResolvedValue([mockRelations]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockRelations);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return teacher-skill relationship by id', async () => {
      req.params.id = '1';
      const mockRelation = [{ 
        id: 1, 
        tanarId: 1, 
        hangszerId: 1, 
        tanarNev: 'Kovács Anna', 
        hangszerNev: 'Akusztikus zongora' 
      }];

      pool.query.mockResolvedValue([mockRelation]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockRelation[0]);
    });

    it('should return 404 if relationship not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('create', () => {
    it('should create a new teacher-skill relationship successfully', async () => {
      req.body = {
        tanarId: 3,
        hangszerId: 5
      };

      pool.query.mockResolvedValue([{ insertId: 10 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 10,
        message: 'Oktató-hangszer kapcsolat létrehozva'
      });
    });
  });

  describe('delete', () => {
    it('should delete a teacher-skill relationship successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteTeacherSkill(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Kapcsolat törölve' });
    });

    it('should return 404 if relationship not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteTeacherSkill(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});