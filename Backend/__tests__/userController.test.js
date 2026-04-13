jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true)
}));

const { getAll, getById, create, update, delete: deleteUser } = require('../app/controllers/userController');
const pool = require('../app/models/db');
const bcrypt = require('bcrypt');

describe('User Controller', () => {
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
    it('should return all users (without passwords)', async () => {
      const mockUsers = [
        { 
          id: 1, 
          fnev: 'kovacs.anna', 
          email: 'kovacs.anna@harmonia.hu',
          jogosultsag: 'tanar',
          created_at: '2025-01-01'
        },
        { 
          id: 2, 
          fnev: 'nagy.peter', 
          email: 'nagy.peter@harmonia.hu',
          jogosultsag: 'diak',
          created_at: '2025-01-02'
        },
        { 
          id: 3, 
          fnev: 'info', 
          email: 'info@harmonia.hu',
          jogosultsag: 'admin',
          created_at: '2025-01-01'
        }
      ];

      pool.query.mockResolvedValue([mockUsers]);

      await getAll(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle database error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      await getAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      req.params.id = '1';
      const mockUser = [{ 
        id: 1, 
        fnev: 'kovacs.anna', 
        email: 'kovacs.anna@harmonia.hu',
        jogosultsag: 'tanar',
        created_at: '2025-01-01'
      }];

      pool.query.mockResolvedValue([mockUser]);

      await getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(mockUser[0]);
    });

    it('should return 404 if user not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([[]]);

      await getById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      req.body = {
        fnev: 'ujfelhasznalo',
        jelszo: 'password123',
        email: 'uj@user.hu',
        jogosultsag: 'diak'
      };

      pool.query.mockResolvedValue([{ insertId: 10 }]);

      await create(req, res, next);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 10,
        message: 'Felhasználó létrehozva'
      });
    });

    it('should create user with default jogosultsag', async () => {
      req.body = {
        fnev: 'ujfelhasznalo2',
        jelszo: 'password123',
        email: 'uj2@user.hu'
      };

      pool.query.mockResolvedValue([{ insertId: 11 }]);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('update', () => {
    it('should update a user successfully (without password change)', async () => {
      req.params.id = '1';
      req.body = {
        fnev: 'modositott',
        email: 'modositott@user.hu',
        jogosultsag: 'tanar'
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Felhasználó frissítve' });
    });

    it('should update a user with password change', async () => {
      req.params.id = '1';
      req.body = {
        fnev: 'modositott',
        jelszo: 'newpassword123',
        email: 'modositott@user.hu',
        jogosultsag: 'tanar'
      };

      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await update(req, res, next);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(res.json).toHaveBeenCalledWith({ message: 'Felhasználó frissítve' });
    });

    it('should return 404 if user not found', async () => {
      req.params.id = '999';
      req.body = {
        fnev: 'nemletezo',
        email: 'nonexistent@user.hu'
      };

      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await update(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });

  describe('delete', () => {
    it('should delete a user successfully', async () => {
      req.params.id = '1';
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      await deleteUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ message: 'Felhasználó törölve' });
    });

    it('should return 404 if user not found', async () => {
      req.params.id = '999';
      pool.query.mockResolvedValue([{ affectedRows: 0 }]);

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not found' });
    });
  });
});