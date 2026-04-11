// Mock-ok a fájl tetején
jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, update, delete: deleteRental } = require('../app/controllers/rentalController');
const pool = require('../app/models/db');

describe('Rental Controller', () => {
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
    it('should return all rentals', async () => {
      const mockRentals = [
        { 
          id: 1, 
          hangszerNev: 'Akusztikus zongora', 
          diakNev: 'Kiss Péter',
          kolcsKezd: '2025-04-01',
          kolcsVeg: '2025-05-01',
          megjegyzes: null,
          statusz: 'aktiv'
        },
        { 
          id: 2, 
          hangszerNev: 'Akusztikus gitár', 
          diakNev: 'Nagy Anna',
          kolcsKezd: '2025-04-05',
          kolcsVeg: '2025-05-05',
          megjegyzes: 'Teszt',
          statusz: 'aktiv'
        }
      ];

      pool.query.mockResolvedValue([mockRentals]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockRentals);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return rental by id', async () => {
      req.params.id = '1';
      const mockRental = [{ 
        id: 1, 
        hangszerId: 1,
        diakId: 1,
        kolcsKezd: '2025-04-01',
        kolcsVeg: '2025-05-01',
        megjegyzes: null,
        statusz: 'aktiv'
      }];

      pool.query.mockResolvedValue([mockRental]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockRental[0]);
    });

    it('should return 404 if rental not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('create', () => {
    it('should create a new rental successfully', async () => {
      req.body = {
        hangszerId: 1,
        diakId: 1,
        kolcsVeg: '2025-06-01',
        megjegyzes: 'Teszt kölcsönzés',
        statusz: 'aktiv'
      };

      pool.query.mockResolvedValue([{ insertId: 5 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 5, message: 'Kölcsönzés létrehozva' });
    });

    it('should create rental without optional fields', async () => {
      req.body = {
        hangszerId: 1,
        diakId: 1,
        kolcsVeg: '2025-06-01'
      };

      pool.query.mockResolvedValue([{ insertId: 6 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 6, message: 'Kölcsönzés létrehozva' });
    });
  });

  describe('update', () => {
    it('should update a rental successfully', async () => {
      req.params.id = '1';
      req.body = {
        hangszerId: 1,
        diakId: 1,
        kolcsVeg: '2025-06-15',
        megjegyzes: 'Módosított',
        statusz: 'lezart'
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Kölcsönzés frissítve' });
    });

    it('should return 404 if rental not found', async () => {
      req.params.id = '999';
      req.body = {
        hangszerId: 1,
        diakId: 1,
        kolcsVeg: '2025-06-15'
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('delete', () => {
    it('should delete a rental successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteRental(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Kölcsönzés törölve' });
    });

    it('should return 404 if rental not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteRental(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});