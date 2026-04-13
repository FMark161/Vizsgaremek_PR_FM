jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, update, delete: deleteTeacher } = require('../app/controllers/teacherController');
const pool = require('../app/models/db');

describe('Teacher Controller', () => {
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
    it('should return all teachers', async () => {
      const mockTeachers = [
        { 
          id: 1, 
          nev: 'Kovács Anna', 
          telefonsz: '06701234567', 
          email: 'kovacs.anna@harmonia.hu',
          tapasztalat: '15 év',
          vegzettseg: 'Zeneakadémia',
          leiras: 'Tapasztalt zongoratanár'
        }
      ];

      pool.query.mockResolvedValue([mockTeachers]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockTeachers);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return teacher by id', async () => {
      req.params.id = '1';
      const mockTeacher = [{ 
        id: 1, 
        nev: 'Kovács Anna', 
        telefonsz: '06701234567', 
        email: 'kovacs.anna@harmonia.hu',
        tapasztalat: '15 év',
        vegzettseg: 'Zeneakadémia',
        leiras: 'Tapasztalt zongoratanár'
      }];

      pool.query.mockResolvedValue([mockTeacher]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });

    it('should return 404 if teacher not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('create', () => {
    it('should create a new teacher successfully', async () => {
      req.body = {
        name: 'Új Tanár',
        phone: '06701234569',
        email: 'uj@tanar.hu',
        experience: '5 év',
        education: 'Egyetemi végzettség',
        description: 'Leírás az új tanárról'
      };

      pool.query.mockResolvedValue([{ insertId: 10 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 10,
        message: 'Oktató létrehozva'
      });
    });

    it('should return 400 if name is missing', async () => {
      req.body = {
        email: 'uj@tanar.hu'
      };

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Név és email megadása kötelező' });
    });
  });

  describe('update', () => {
    it('should update a teacher successfully', async () => {
      req.params.id = '1';
      req.body = {
        name: 'Módosított Tanár',
        phone: '06701234570',
        email: 'modositott@tanar.hu',
        experience: '6 év',
        education: 'Mesterképzés',
        description: 'Módosított leírás'
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Oktató frissítve' });
    });

    it('should return 404 if teacher not found', async () => {
      req.params.id = '999';
      req.body = {
        name: 'Nem létező',
        email: 'nonexistent@tanar.hu'
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Oktató nem található' });
    });
  });

  describe('delete', () => {
    it('should delete a teacher successfully', async () => {
      req.params.id = '1';

      pool.query.mockResolvedValueOnce([[{ id: 1 }]]);
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      await deleteTeacher(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Oktató törölve' });
    });

    it('should return 404 if teacher not found', async () => {
      req.params.id = '999';
      
      pool.query.mockResolvedValueOnce([[]]);

      await deleteTeacher(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Oktató nem található' });
    });
  });
});