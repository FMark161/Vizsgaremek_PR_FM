jest.mock('../app/models/authModel', () => ({
  findByUsername: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  verifyPassword: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-token'),
  verify: jest.fn().mockReturnValue({ id: 1, fnev: 'testuser', jogosultsag: 'admin' })
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true)
}));

const { register, login, verify } = require('../app/controllers/authController');
const authModel = require('../app/models/authModel');

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
    
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      req.body = {
        fnev: 'testuser',
        jelszo: 'password123',
        email: 'test@test.com',
        jogosultsag: 'diak'
      };

      authModel.findByUsername.mockResolvedValue(null);
      authModel.findByEmail.mockResolvedValue(null);
      authModel.create.mockResolvedValue(1);

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return 400 if username already exists', async () => {
      req.body = {
        fnev: 'existinguser',
        jelszo: 'password123',
        email: 'test@test.com'
      };

      authModel.findByUsername.mockResolvedValue({ id: 1, fnev: 'existinguser' });

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Ez a felhasználónév már foglalt' })
      );
    });

    it('should return 400 if email already exists', async () => {
      req.body = {
        fnev: 'testuser',
        jelszo: 'password123',
        email: 'existing@test.com'
      };

      authModel.findByUsername.mockResolvedValue(null);
      authModel.findByEmail.mockResolvedValue({ id: 2, email: 'existing@test.com' });

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 400 if password is too short', async () => {
      req.body = {
        fnev: 'testuser',
        jelszo: '123',
        email: 'test@test.com'
      };

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      req.body = {
        fnev: 'testuser',
        jelszo: 'password123'
      };

      const mockUser = {
        id: 1,
        fnev: 'testuser',
        email: 'test@test.com',
        jogosultsag: 'diak',
        jelszo: 'hashed-password'
      };

      authModel.findByUsername.mockResolvedValue(mockUser);

      await login(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });

    it('should return 401 for invalid username', async () => {
      req.body = {
        fnev: 'nonexistent',
        jelszo: 'password123'
      };

      authModel.findByUsername.mockResolvedValue(null);

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});