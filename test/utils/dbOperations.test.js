const urlShortenerSequelize = require('../../models/index');
const dbOperations = require('../../src/utils/dbOperations');

describe('the writeDB function', () => {
  it('should write data to db on success', async () => {
    const urlMapping = {
      longUrl: 'https://www.github.com/shubhamzanwar',
      shortUrl: '1856f451',
      expiresat: '1580444129764',
    };
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlshortener, 'create');
    mockQuery.mockResolvedValue();
    await dbOperations.writeDB(urlMapping);
    expect(mockQuery).toHaveBeenCalledWith(urlMapping);
    mockQuery.mockRestore();
  });
  it('should return error message on failing to write data to db ', async () => {
    try {
      const urlMapping = {
        longUrl: 'https://www.github.com/shubhamzanwar',
        shortUrl: '1856f451',
        expiresat: '1580444129764',
      };
      const mockQuery = jest.spyOn(urlShortenerSequelize.urlshortener, 'create');
      mockQuery.mockRejectedValue(new Error('unable to insert data to db'));
      await dbOperations.writeDB(urlMapping);
    } catch (error) {
      expect(error.message).toBe('unable to insert data to db');
    }
  });
});


describe('the getLongURL function', () => {
  it('should return the long url corresponding to the given short url', async () => {
    const mockResponseLongUrl = [{ longUrl: 'https://github.com/VarshaCL', expiresat: '1580444129764' }];
    const mockShortUrl = '1856f451';
    const mockWhereQuery = {
      raw: true,
      attributes: ['longUrl', 'expiresat'],
      where: {
        shortUrl: mockShortUrl,
      },
    };
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlshortener, 'findAll');
    mockQuery.mockResolvedValue(mockResponseLongUrl);
    const result = await dbOperations.getLongUrl(mockShortUrl);
    expect(mockQuery).toHaveBeenCalledWith(mockWhereQuery);
    expect(result).toBe(mockResponseLongUrl);
  });

  it('should give an error message when db query fails', async () => {
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlshortener, 'findAll');
    const mockShortUrl = '1856f451';
    const mockWhereQuery = {
      raw: true,
      attributes: ['longUrl', 'expiresat'],
      where: {
        shortUrl: mockShortUrl,
      },
    };
    try {
      mockQuery.mockRejectedValue(new Error('unable to retreive url from the db'));
      await dbOperations.getLongUrl(mockShortUrl);
    } catch (error) {
      expect(mockQuery).toHaveBeenCalledWith(mockWhereQuery);
      expect(error.message).toBe('unable to retreive url from the db');
      // expect(async () => { await dbOperations.getLongUrl(mockShortUrl); }).toThrow();
      // // Error(new Error('unable to retreive url from the db'));

      // expect(result).toBe('unable to retreive url from the db');
    }
  });
});
