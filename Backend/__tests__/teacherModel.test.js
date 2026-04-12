jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const teacherModel = require('../app/models/teacherModel');
const pool = require('../app/models/db');

describe('Teacher Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all teachers with instruments', async () => {
      const mockTeachers = [
        { id: 1, name: 'Kovács Anna', phone: '06701234567', email: 'kovacs@harmonia.hu', instruments: 'Zongora,Hárfa' }
      ];

      pool.query.mockResolvedValue([mockTeachers]);

      const result = await teacherModel.getAll();

      expect(result[0].instruments).toEqual(['Zongora', 'Hárfa']);
    });
  });

  describe('getById', () => {
    it('should return teacher by id', async () => {
      const mockTeacher = [{ id: 1, name: 'Kovács Anna', phone: '06701234567', email: 'kovacs@harmonia.hu', instruments: 'Zongora' }];

      pool.query.mockResolvedValue([mockTeacher]);

      const result = await teacherModel.getById(1);

      expect(result.id).toBe(1);
      expect(result.instruments).toEqual(['Zongora']);
    });

    it('should return null if teacher not found', async () => {
      pool.query.mockResolvedValue([[]]);

      const result = await teacherModel.getById(999);

      expect(result).toBeNull();
    });
  });
});