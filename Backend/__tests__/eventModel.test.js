jest.mock('../app/models/db', () => ({
  query: jest.fn()
}));

const eventModel = require('../app/models/eventModel');
const pool = require('../app/models/db');

describe('Event Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all events', async () => {
      const mockEvents = [
        { id: 1, cim: 'Nyílt nap', datum: '2025-04-12', kiemelt: 1 },
        { id: 2, cim: 'Tavaszi hangverseny', datum: '2025-04-26', kiemelt: 1 }
      ];

      pool.query.mockResolvedValue([mockEvents]);

      const result = await eventModel.getAll();

      expect(result).toEqual(mockEvents);
    });
  });

  describe('getFeatured', () => {
    it('should return featured events', async () => {
      const mockEvents = [
        { id: 1, cim: 'Nyílt nap', datum: '2025-04-12', kiemelt: 1 }
      ];

      pool.query.mockResolvedValue([mockEvents]);

      const result = await eventModel.getFeatured();

      expect(result).toEqual(mockEvents);
    });
  });

  describe('getUpcoming', () => {
    it('should return upcoming events', async () => {
      const mockEvents = [
        { id: 1, cim: 'Nyílt nap', datum: '2025-04-12', kiemelt: 1 }
      ];

      pool.query.mockResolvedValue([mockEvents]);

      const result = await eventModel.getUpcoming(4);

      expect(result).toEqual(mockEvents);
    });
  });

  describe('getById', () => {
    it('should return event by id', async () => {
      const mockEvent = [{ id: 1, cim: 'Nyílt nap', datum: '2025-04-12' }];

      pool.query.mockResolvedValue([mockEvent]);

      const result = await eventModel.getById(1);

      expect(result).toEqual(mockEvent[0]);
    });

    it('should return undefined if event not found', async () => {
      pool.query.mockResolvedValue([[]]);

      const result = await eventModel.getById(999);

      expect(result).toBeUndefined();
    });
  });
});