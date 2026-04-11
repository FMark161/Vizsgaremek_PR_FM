// Mock-ok a fájl tetején
jest.mock('../app/models/instrumentModel', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  createRental: jest.fn()
}));

const { getAll, getById, createRental } = require('../app/controllers/instrumentController');
const instrumentModel = require('../app/models/instrumentModel');

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
        { id: 2, name: 'Digitális zongora', category: 'Billentyűs', rentalPrice: '22500 Ft/hó', status: 'available' },
        { id: 3, name: 'Akusztikus gitár', category: 'Gitár', rentalPrice: '12500 Ft/hó', status: 'available' }
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
      req.body = {
        duration: '3'
      };

      await createRental(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Diák ID és időtartam megadása kötelező' });
    });

    it('should return 400 if duration is missing', async () => {
      req.params.id = '1';
      req.body = {
        diakId: 1
      };

      await createRental(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Diák ID és időtartam megadása kötelező' });
    });
  });
});