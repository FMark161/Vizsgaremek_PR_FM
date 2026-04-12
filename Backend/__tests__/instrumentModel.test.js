jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const instrumentModel = require('../app/models/instrumentModel');
const pool = require('../app/models/db');

describe('Instrument Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all instruments with status', async () => {
      const mockInstruments = [
        { id: 1, name: 'Akusztikus zongora', category: 'Billentyűs', rentalPrice: 28500, teacher: 'Kovács Anna', teacherId: 1, isAvailable: 1 },
        { id: 2, name: 'Digitális zongora', category: 'Billentyűs', rentalPrice: 22500, teacher: 'Kovács Anna', teacherId: 1, isAvailable: 0 }
      ];

      const mockActiveRentals = [{ hangszerId: 2 }];

      pool.query
        .mockResolvedValueOnce([mockActiveRentals])
        .mockResolvedValueOnce([mockInstruments]);

      const result = await instrumentModel.getAll();

      expect(result).toHaveLength(2);
      expect(result[0].status).toBe('available');
      expect(result[1].status).toBe('rented');
    });
  });

  describe('getById', () => {
    it('should return instrument by id', async () => {
      const mockInstrument = [{ id: 1, name: 'Akusztikus zongora', category: 'Billentyűs', rentalPrice: 28500, teacher: 'Kovács Anna', teacherId: 1 }];
      const mockActiveRental = [];

      pool.query
        .mockResolvedValueOnce([mockInstrument])
        .mockResolvedValueOnce([mockActiveRental]);

      const result = await instrumentModel.getById(1);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBe('Akusztikus zongora');
    });

    it('should return null if instrument not found', async () => {
      pool.query.mockResolvedValueOnce([[]]);

      const result = await instrumentModel.getById(999);

      expect(result).toBeNull();
    });
  });

  describe('createRental', () => {
    it('should create a rental and update stock', async () => {
      pool.query
        .mockResolvedValueOnce([{ insertId: 10 }])
        .mockResolvedValueOnce([{ affectedRows: 1 }]);

      const result = await instrumentModel.createRental(1, 1, '3', 'Teszt');

      expect(result).toBe(10);
    });
  });
});