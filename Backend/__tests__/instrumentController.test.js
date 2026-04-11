// Mock-ok a fájl tetején
jest.mock('../app/models/instrumentModel', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  createRental: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));
jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, createRental, create, update, delete: deleteInstrument } = require('../app/controllers/instrumentController');
const instrumentModel = require('../app/models/instrumentModel');
const pool = require('../app/models/db');

describe('Instrument Controller', () => {
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
    it('should return all instruments', async () => {
      const mockInstruments = [
        { id: 1, name: 'Akusztikus zongora', category: 'Billentyűs', rentalPrice: '28500 Ft/hó', status: 'available' },
        { id: 2, name: 'Digitális zongora', category: 'Billentyűs', rentalPrice: '22500 Ft/hó', status: 'available' }
      ];

      instrumentModel.getAll.mockResolvedValue(mockInstruments);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockInstruments);
    });

    it('should handle database error', async () => {
      instrumentModel.getAll.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return instrument by id', async () => {
      req.params.id = '1';
      const mockInstrument = { id: 1, name: 'Akusztikus zongora', category: 'Billentyűs', rentalPrice: '28500 Ft/hó', status: 'available' };

      instrumentModel.getById.mockResolvedValue(mockInstrument);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockInstrument);
    });

    it('should return 404 if instrument not found', async () => {
      req.params.id = '999';
      instrumentModel.getById.mockResolvedValue(null);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Instrument not found' });
    });
  });

  describe('createRental', () => {
    it('should create a rental successfully', async () => {
      req.params.id = '1';
      req.body = {
        diakId: 1,
        duration: '3',
        megjegyzes: 'Teszt kölcsönzés'
      };

      instrumentModel.createRental.mockResolvedValue(5);

      await createRental(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Kölcsönzés sikeresen létrehozva',
        rentalId: 5
      });
    });

    it('should return 400 if diakId is missing', async () => {
      req.params.id = '1';
      req.body = { duration: '3' };

      await createRental(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Diák ID és időtartam megadása kötelező' });
    });

    it('should return 400 if duration is missing', async () => {
      req.params.id = '1';
      req.body = { diakId: 1 };

      await createRental(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Diák ID és időtartam megadása kötelező' });
    });
  });

  describe('create', () => {
    it('should create a new instrument successfully', async () => {
      req.body = {
        name: 'Új hangszer',
        category: 'Billentyűs',
        rentalPrice: '30000 Ft/hó',
        teacher: 'Kovács Anna',
        status: 'available'
      };

      // Mock sorrend:
      // 1. Kategória keresés - nincs ilyen
      pool.query.mockResolvedValueOnce([[]]);
      // 2. Új kategória létrehozása
      pool.query.mockResolvedValueOnce([{ insertId: 10 }]);
      // 3. Leltár beszúrás
      pool.query.mockResolvedValueOnce([{ insertId: 5 }]);
      // 4. Hangszer beszúrás
      pool.query.mockResolvedValueOnce([{ insertId: 3 }]);
      // 5. Tanár keresés
      pool.query.mockResolvedValueOnce([[{ id: 1 }]]);
      // 6. Tanár kapcsolat beszúrás
      pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Hangszer létrehozva' })
      );
    });

    it('should create instrument without teacher', async () => {
      req.body = {
        name: 'Új hangszer',
        category: 'Billentyűs',
        rentalPrice: '30000 Ft/hó',
        status: 'available'
      };

      pool.query
        .mockResolvedValueOnce([[]]) // kategória keresés
        .mockResolvedValueOnce([{ insertId: 10 }]) // új kategória
        .mockResolvedValueOnce([{ insertId: 5 }]) // leltár
        .mockResolvedValueOnce([{ insertId: 3 }]); // hangszer

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('update', () => {
    it('should update an instrument successfully', async () => {
      req.params.id = '1';
      req.body = {
        name: 'Módosított hangszer',
        category: 'Gitár',
        rentalPrice: '35000 Ft/hó',
        teacher: 'Nagy Péter',
        status: 'rented'
      };

      pool.query
        .mockResolvedValueOnce([[{ leltarId: 5 }]]) // hangszer létezik
        .mockResolvedValueOnce([[]]) // nincs ilyen kategória
        .mockResolvedValueOnce([{ insertId: 11 }]) // új kategória
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // leltár frissítés
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // hangszer frissítés
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // régi tanár kapcsolat törlés
        .mockResolvedValueOnce([[{ id: 2 }]]) // tanár keresés
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // új tanár kapcsolat

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Hangszer frissítve' });
    });

    it('should update instrument without teacher change', async () => {
      req.params.id = '1';
      req.body = {
        name: 'Módosított hangszer',
        category: 'Gitár',
        rentalPrice: '35000 Ft/hó',
        status: 'available'
      };

      pool.query
        .mockResolvedValueOnce([[{ leltarId: 5 }]]) // hangszer létezik
        .mockResolvedValueOnce([[]]) // nincs ilyen kategória
        .mockResolvedValueOnce([{ insertId: 11 }]) // új kategória
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // leltár frissítés
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // hangszer frissítés
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // régi tanár kapcsolat törlés (teacher nélkül)

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Hangszer frissítve' });
    });

    it('should return 404 if instrument not found', async () => {
      req.params.id = '999';
      req.body = {
        name: 'Nem létező',
        category: 'Gitár',
        rentalPrice: '35000 Ft/hó'
      };

      pool.query.mockResolvedValueOnce([[]]); // hangszer nem található

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Hangszer nem található' });
    });
  });

  describe('delete', () => {
    it('should delete an instrument successfully', async () => {
      req.params.id = '1';

      pool.query
        .mockResolvedValueOnce([[{ leltarId: 5 }]]) // hangszer létezik
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // tanar_mit_tud törlés
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // kolcsonzesek törlés
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // hangszer törlés
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // leltár törlés

      await deleteInstrument(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Hangszer törölve' });
    });

    it('should return 404 if instrument not found', async () => {
      req.params.id = '999';

      pool.query.mockResolvedValueOnce([[]]); // hangszer nem található

      await deleteInstrument(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Hangszer nem található' });
    });
  });
});