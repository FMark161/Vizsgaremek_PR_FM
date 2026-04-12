jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true)
}));

const authModel = require('../app/models/authModel');
const pool = require('../app/models/db');
const bcrypt = require('bcrypt');

describe('Auth Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      const mockUser = [{ id: 1, fnev: 'testuser', email: 'test@test.com', jelszo: 'hashed' }];

      pool.query.mockResolvedValue([mockUser]);

      const result = await authModel.findByEmail('test@test.com');

      expect(result).toEqual(mockUser[0]);
    });
  });

  describe('findByUsername', () => {
    it('should return user by username', async () => {
      const mockUser = [{ id: 1, fnev: 'testuser', email: 'test@test.com', jelszo: 'hashed' }];

      pool.query.mockResolvedValue([mockUser]);

      const result = await authModel.findByUsername('testuser');

      expect(result).toEqual(mockUser[0]);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = { fnev: 'newuser', jelszo: 'password123', jogosultsag: 'diak', email: 'new@test.com' };

      pool.query.mockResolvedValue([{ insertId: 5 }]);

      const result = await authModel.create(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(result).toBe(5);
    });
  });

  describe('verifyPassword', () => {
    it('should verify password correctly', async () => {
      const result = await authModel.verifyPassword('password123', 'hashed-password');

      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
      expect(result).toBe(true);
    });
  });
});