const urlShortenerSequelize = require('../../models/index');
const dbOperations = require('../../src/utils/dbOperations');

describe('the writeDB function', () => {
  it('should write data to db on success', async () => {
    const urlMappng = {
      longUrl: 'https://www.github.com/shubhamzanwar',
      shortUrl: 'http://localhost:8080/1856f451',
    };
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlShortener, 'create');
    mockQuery.mockResolvedValue();
    await dbOperations.writeDB(urlMappng);
    expect(mockQuery).toHaveBeenCalledWith(urlMappng);
  });
  it('should return error message on failing to write data to db ', async () => {
    const urlMappng = {
      longUrl: 'https://www.github.com/shubhamzanwar',
      shortUrl: 'http://localhost:8080/1856f451',
    };
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlShortener, 'create');
    mockQuery.mockRejectedValue(new Error('unable to insert data to db'));
    const result = await dbOperations.writeDB(urlMappng);
    expect(result).toBe('unable to insert data to db');
  });
});
