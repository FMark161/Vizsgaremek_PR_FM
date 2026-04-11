// Mock-ok a fájl tetején
jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, markAsRead, delete: deleteMessage } = require('../app/controllers/messageController');
const pool = require('../app/models/db');

describe('Message Controller', () => {
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
    it('should return all messages', async () => {
      const mockMessages = [
        { 
          id: 1, 
          nev: 'Teszt Elek', 
          email: 'teszt@email.hu', 
          telefon: '06301234567',
          targy: 'Kérdés',
          uzenet: 'Szeretnék érdeklődni...',
          statusz: 'uj',
          letrehozas: '2025-04-01'
        },
        { 
          id: 2, 
          nev: 'Minta Anna', 
          email: 'minta@email.hu', 
          telefon: '06301234568',
          targy: 'Jelentkezés',
          uzenet: 'Jelentkeznék a gitár tanfolyamra',
          statusz: 'olvasott',
          letrehozas: '2025-04-02'
        }
      ];

      pool.query.mockResolvedValue([mockMessages]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockMessages);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return message by id', async () => {
      req.params.id = '1';
      const mockMessage = [{ 
        id: 1, 
        nev: 'Teszt Elek', 
        email: 'teszt@email.hu', 
        telefon: '06301234567',
        targy: 'Kérdés',
        uzenet: 'Szeretnék érdeklődni...',
        statusz: 'uj',
        letrehozas: '2025-04-01'
      }];

      pool.query.mockResolvedValue([mockMessage]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockMessage[0]);
    });

    it('should return 404 if message not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Üzenet nem található' });
    });
  });

  describe('create', () => {
    it('should create a new message successfully', async () => {
      req.body = {
        nev: 'Új Üzenet Küldő',
        email: 'uj@email.hu',
        telefon: '06301234569',
        targy: 'Érdeklődés',
        uzenet: 'Szeretnék többet megtudni a zeneiskoláról.'
      };

      pool.query.mockResolvedValue([{ insertId: 5 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 5,
        message: 'Üzenet sikeresen elküldve'
      });
    });

    it('should create message without optional fields', async () => {
      req.body = {
        nev: 'Teszt User',
        email: 'teszt@email.hu',
        uzenet: 'Csak egy üzenet'
      };

      pool.query.mockResolvedValue([{ insertId: 6 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should return 400 if name is missing', async () => {
      req.body = {
        email: 'teszt@email.hu',
        uzenet: 'Üzenet'
      };

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Név, email és üzenet megadása kötelező' });
    });

    it('should return 400 if email is missing', async () => {
      req.body = {
        nev: 'Teszt User',
        uzenet: 'Üzenet'
      };

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Név, email és üzenet megadása kötelező' });
    });

    it('should return 400 if message is missing', async () => {
      req.body = {
        nev: 'Teszt User',
        email: 'teszt@email.hu'
      };

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Név, email és üzenet megadása kötelező' });
    });
  });

  describe('markAsRead', () => {
    it('should mark message as read successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await markAsRead(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Üzenet olvasottnak jelölve' });
    });

    it('should return 404 if message not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await markAsRead(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('delete', () => {
    it('should delete a message successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteMessage(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Üzenet törölve' });
    });

    it('should return 404 if message not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteMessage(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});