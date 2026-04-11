// Mock-ok a fájl tetején
jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, update, delete: deleteEvent } = require('../app/controllers/eventController');
const pool = require('../app/models/db');

describe('Event Controller', () => {
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
    it('should return all events', async () => {
      const mockEvents = [
        { id: 1, cim: 'Nyílt nap', datum: '2025-04-12', idopont: '14:00 - 18:00', helyszin: 'Budapest', kategoria: 'nyiltnap', kiemelt: 1 },
        { id: 2, cim: 'Tavaszi hangverseny', datum: '2025-04-26', idopont: '18:00 - 20:00', helyszin: 'Budapest', kategoria: 'koncert', kiemelt: 1 }
      ];

      pool.query.mockResolvedValue([mockEvents]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockEvents);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return event by id', async () => {
      req.params.id = '1';
      const mockEvent = [{ id: 1, cim: 'Nyílt nap', datum: '2025-04-12', idopont: '14:00 - 18:00', helyszin: 'Budapest', kategoria: 'nyiltnap', kiemelt: 1 }];

      pool.query.mockResolvedValue([mockEvent]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockEvent[0]);
    });

    it('should return 404 if event not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found' });
    });
  });

  describe('create', () => {
    it('should create a new event successfully', async () => {
      req.body = {
        cim: 'Új esemény',
        datum: '2025-12-31',
        idopont: '20:00',
        helyszin: 'Debrecen',
        leiras: 'Rövid leírás',
        hosszuleiras: 'Hosszú leírás',
        kategoria: 'koncert',
        kiemelt: 0
      };

      pool.query.mockResolvedValue([{ insertId: 5 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 5, message: 'Esemény létrehozva' });
    });
  });

  describe('update', () => {
    it('should update an event successfully', async () => {
      req.params.id = '1';
      req.body = {
        cim: 'Módosított esemény',
        datum: '2025-12-31',
        idopont: '20:00',
        helyszin: 'Debrecen',
        leiras: 'Rövid leírás',
        hosszuleiras: 'Hosszú leírás',
        kategoria: 'koncert',
        kiemelt: 0
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Esemény frissítve' });
    });

    it('should return 404 if event not found', async () => {
      req.params.id = '999';
      req.body = {
        cim: 'Nem létező'
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found' });
    });
  });

  describe('delete', () => {
    it('should delete an event successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteEvent(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Esemény törölve' });
    });

    it('should return 404 if event not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteEvent(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Event not found' });
    });
  });
});