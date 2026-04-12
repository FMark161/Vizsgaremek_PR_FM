jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const applicationModel = require('../app/models/applicationModel');
const pool = require('../app/models/db');

describe('Application Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all applications', async () => {
      const mockApps = [
        { id: 1, nev: 'Teszt Elek', email: 'teszt@email.hu', statusz: 'new' }
      ];

      pool.query.mockResolvedValue([mockApps]);

      const result = await applicationModel.getAll();

      expect(result).toEqual(mockApps);
    });
  });

  describe('getById', () => {
    it('should return application by id', async () => {
      const mockApp = [{ id: 1, nev: 'Teszt Elek', email: 'teszt@email.hu' }];

      pool.query.mockResolvedValue([mockApp]);

      const result = await applicationModel.getById(1);

      expect(result).toEqual(mockApp[0]);
    });
  });

  describe('create', () => {
    it('should create a new application', async () => {
      const appData = { name: 'Új jelentkező', email: 'uj@test.hu', phone: '06123456789' };

      pool.query.mockResolvedValue([{ insertId: 5 }]);

      const result = await applicationModel.create(appData);

      expect(result).toBe(5);
    });
  });

  describe('updateStatus', () => {
    it('should update application status', async () => {
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await applicationModel.updateStatus(1, 'accepted');

      expect(result).toBe(true);
    });
  });

  describe('delete', () => {
    it('should delete application', async () => {
      pool.query.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await applicationModel.delete(1);

      expect(result).toBe(true);
    });
  });
});