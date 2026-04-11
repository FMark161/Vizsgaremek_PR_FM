jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, update, delete: deleteEvent } = require('../app/controllers/eventController');
const pool = require('../app/models/db');

describe('Event Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all events', async () => {
      const mockEvents = [{ id: 1, cim: 'Event 1' }];
      pool.query.mockResolvedValue([mockEvents]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockEvents);
    });
  });

  describe('getById', () => {
    it('should return event by id', async () => {
      req.params.id = '1';
      const mockEvent = [{ id: 1, cim: 'Event 1' }];
      pool.query.mockResolvedValue([mockEvent]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockEvent[0]);
    });

    it('should return 404 if event not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});