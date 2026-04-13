jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, update, delete: deleteStock } = require('../app/controllers/stockController');
const pool = require('../app/models/db');

describe('Stock Controller', () => {
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
    it('should return all stock items', async () => {
      const mockStock = [
        { id: 1, ar: 2990, elerhetoseg: 1 },
        { id: 2, ar: 3990, elerhetoseg: 1 },
        { id: 3, ar: 4490, elerhetoseg: 0 },
        { id: 4, ar: 5990, elerhetoseg: 1 }
      ];

      pool.query.mockResolvedValue([mockStock]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockStock);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return stock item by id', async () => {
      req.params.id = '1';
      const mockStock = [{ id: 1, ar: 2990, elerhetoseg: 1 }];

      pool.query.mockResolvedValue([mockStock]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockStock[0]);
    });

    it('should return 404 if stock item not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('create', () => {
    it('should create a new stock item successfully', async () => {
      req.body = {
        ar: 15000,
        elerhetoseg: 1
      };

      pool.query.mockResolvedValue([{ insertId: 10 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 10,
        message: 'Leltár elem létrehozva'
      });
    });

    it('should create stock item with default elerhetoseg', async () => {
      req.body = {
        ar: 20000
      };

      pool.query.mockResolvedValue([{ insertId: 11 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('update', () => {
    it('should update a stock item successfully', async () => {
      req.params.id = '1';
      req.body = {
        ar: 25000,
        elerhetoseg: 0
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Leltár elem frissítve' });
    });

    it('should return 404 if stock item not found', async () => {
      req.params.id = '999';
      req.body = {
        ar: 25000,
        elerhetoseg: 1
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('delete', () => {
    it('should delete a stock item successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteStock(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Leltár elem törölve' });
    });

    it('should return 404 if stock item not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteStock(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});