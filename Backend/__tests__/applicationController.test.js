// Mock-ok a fájl tetején
jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, update, delete: deleteApplication } = require('../app/controllers/applicationController');
const pool = require('../app/models/db');

describe('Application Controller', () => {
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
    it('should return all applications', async () => {
      const mockApplications = [
        { 
          id: 1, 
          nev: 'Teszt Elek', 
          email: 'teszt@email.hu', 
          telefon: '06301234567',
          hangszer: 'Gitár',
          statusz: 'new',
          letrehozas: '2025-01-01'
        },
        { 
          id: 2, 
          nev: 'Minta Anna', 
          email: 'minta@email.hu', 
          telefon: '06301234568',
          hangszer: 'Zongora',
          statusz: 'contacted',
          letrehozas: '2025-01-02'
        }
      ];

      pool.query.mockResolvedValue([mockApplications]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockApplications);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return application by id', async () => {
      req.params.id = '1';
      const mockApplication = [{ 
        id: 1, 
        nev: 'Teszt Elek', 
        email: 'teszt@email.hu', 
        telefon: '06301234567',
        hangszer: 'Gitár',
        statusz: 'new'
      }];

      pool.query.mockResolvedValue([mockApplication]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockApplication[0]);
    });

    it('should return 404 if application not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('create', () => {
    it('should create a new application successfully', async () => {
      req.body = {
        nev: 'Új Jelentkező',
        email: 'uj@jelentkezo.hu',
        telefon: '06301234569',
        szul_datum: '2000-01-01',
        hangszer: 'Hegedű',
        szint: 'beginner',
        sajat_hangszer: 'no',
        uzenet: 'Teszt üzenet'
      };

      pool.query.mockResolvedValue([{ insertId: 5 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 5,
        message: 'Jelentkezés létrehozva'
      });
    });

    it('should return 400 if name is missing', async () => {
      req.body = {
        email: 'uj@jelentkezo.hu'
      };

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Név és email megadása kötelező' });
    });

    it('should return 400 if email is missing', async () => {
      req.body = {
        nev: 'Új Jelentkező'
      };

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Név és email megadása kötelező' });
    });
  });

  describe('update', () => {
    it('should update an application successfully', async () => {
      req.params.id = '1';
      req.body = {
        nev: 'Módosított Név',
        email: 'modositott@email.hu',
        telefon: '06301234570',
        szul_datum: '1999-12-31',
        hangszer: 'Fuvola',
        szint: 'intermediate',
        sajat_hangszer: 'yes',
        uzenet: 'Módosított üzenet',
        statusz: 'accepted'
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Jelentkezés frissítve' });
    });

    it('should return 404 if application not found', async () => {
      req.params.id = '999';
      req.body = {
        nev: 'Nem létező',
        email: 'nonexistent@email.hu'
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('delete', () => {
    it('should delete an application successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteApplication(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Jelentkezés törölve' });
    });

    it('should return 404 if application not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});