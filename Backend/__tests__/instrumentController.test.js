jest.mock('../app/models/instrumentModel', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  createRental: jest.fn()
}));

const { getAll, getById } = require('../app/controllers/instrumentController');
const instrumentModel = require('../app/models/instrumentModel');

describe('Instrument Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all instruments', async () => {
      const mockInstruments = [{ id: 1, name: 'Zongora' }];
      instrumentModel.getAll.mockResolvedValue(mockInstruments);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockInstruments);
    });
  });

  describe('getById', () => {
    it('should return instrument by id', async () => {
      req.params.id = '1';
      const mockInstrument = { id: 1, name: 'Zongora' };
      instrumentModel.getById.mockResolvedValue(mockInstrument);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockInstrument);
    });

    it('should return 404 if instrument not found', async () => {
      req.params.id = '999';
      instrumentModel.getById.mockResolvedValue(null);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});