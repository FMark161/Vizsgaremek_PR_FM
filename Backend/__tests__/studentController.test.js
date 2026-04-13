jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, update, delete: deleteStudent } = require('../app/controllers/studentController');
const pool = require('../app/models/db');

describe('Student Controller', () => {
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
    it('should return all students', async () => {
      const mockStudents = [
        { 
          id: 1, 
          nev: 'Kiss Péter', 
          telefonsz: '06701234501', 
          email: 'kiss.peter@email.hu',
          szulDatum: '2010-03-15',
          sajatHangszer: null,
          felhasznaloId: 10,
          felhasznaloNev: 'kiss.peter'
        },
        { 
          id: 2, 
          nev: 'Nagy Anna', 
          telefonsz: '06701234502', 
          email: 'nagy.anna@email.hu',
          szulDatum: '2009-07-22',
          sajatHangszer: 'Akusztikus gitár',
          felhasznaloId: 11,
          felhasznaloNev: 'nagy.anna'
        }
      ];

      pool.query.mockResolvedValue([mockStudents]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockStudents);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return student by id', async () => {
      req.params.id = '1';
      const mockStudent = [{ 
        id: 1, 
        nev: 'Kiss Péter', 
        telefonsz: '06701234501', 
        email: 'kiss.peter@email.hu',
        szulDatum: '2010-03-15',
        sajatHangszer: null,
        felhasznaloId: 10,
        felhasznaloNev: 'kiss.peter'
      }];

      pool.query.mockResolvedValue([mockStudent]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockStudent[0]);
    });

    it('should return 404 if student not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('create', () => {
    it('should create a new student successfully', async () => {
      req.body = {
        nev: 'Új Diák',
        telefonsz: '06701234570',
        email: 'uj.diak@email.hu',
        szulDatum: '2012-01-01',
        sajatHangszer: 'Hegedű',
        felhasznaloId: 20
      };

      pool.query.mockResolvedValue([{ insertId: 10 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 10,
        message: 'Diák létrehozva'
      });
    });

    it('should create student without optional fields', async () => {
      req.body = {
        nev: 'Minimális Diák'
      };

      pool.query.mockResolvedValue([{ insertId: 11 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('update', () => {
    it('should update a student successfully', async () => {
      req.params.id = '1';
      req.body = {
        nev: 'Módosított Diák',
        telefonsz: '06701234571',
        email: 'modositott@email.hu',
        szulDatum: '2011-12-31',
        sajatHangszer: 'Zongora',
        felhasznaloId: 20
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Diák frissítve' });
    });

    it('should return 404 if student not found', async () => {
      req.params.id = '999';
      req.body = {
        nev: 'Nem létező'
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Diák nem található' });
    });
  });

  describe('delete', () => {
    it('should delete a student successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteStudent(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Diák törölve' });
    });

    it('should return 404 if student not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteStudent(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});