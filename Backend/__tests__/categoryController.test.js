jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const { getAll, getById, create, update, delete: deleteCategory } = require('../app/controllers/categoryController');
const pool = require('../app/models/db');

describe('Category Controller', () => {
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
    it('should return all categories', async () => {
      const mockCategories = [
        { id: 1, katNev: 'Gitár' },
        { id: 2, katNev: 'Hegedű' },
        { id: 3, katNev: 'Zongora' },
        { id: 4, katNev: 'Dob' }
      ];

      pool.query.mockResolvedValue([mockCategories]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return category by id', async () => {
      req.params.id = '1';
      const mockCategory = [{ id: 1, katNev: 'Gitár' }];

      pool.query.mockResolvedValue([mockCategory]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockCategory[0]);
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('create', () => {
    it('should create a new category successfully', async () => {
      req.body = {
        katNev: 'Fuvola'
      };

      pool.query.mockResolvedValue([{ insertId: 5 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 5,
        message: 'Kategória létrehozva'
      });
    });
  });

  describe('update', () => {
    it('should update a category successfully', async () => {
      req.params.id = '1';
      req.body = {
        katNev: 'Akusztikus gitár'
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Kategória frissítve' });
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '999';
      req.body = {
        katNev: 'Nem létező'
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('delete', () => {
    it('should delete a category successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteCategory(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Kategória törölve' });
    });

    it('should return 404 if category not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteCategory(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});