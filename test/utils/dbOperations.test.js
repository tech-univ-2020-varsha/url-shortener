const urlShortenerSequelize = require('../../models/index');
const dbOperations = require('../../src/utils/dbOperations');

describe('the writeDB function', () => {
  it('should write data to db on success', async () => {
    const urlMapping = {
      longUrl: 'https://www.github.com/shubhamzanwar',
      shortUrl: '1856f451',
    };
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlshortener, 'create');
    mockQuery.mockResolvedValue();
    await dbOperations.writeDB(urlMapping);
    expect(mockQuery).toHaveBeenCalledWith(urlMapping);
  });
  it('should return error message on failing to write data to db ', async () => {
    const urlMappng = {
      longUrl: 'https://www.github.com/shubhamzanwar',
      shortUrl: '1856f451',
    };
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlshortener, 'create');
    mockQuery.mockRejectedValue(new Error('unable to insert data to db'));
    const result = await dbOperations.writeDB(urlMappng);
    expect(result).toBe('unable to insert data to db');
  });
});


describe('the getLongURL function', () => {
  it('should return the long url corresponding to the given short url', async () => {
    const mockResponseLongUrl = [{ longUrl: 'https://github.com/VarshaCL' }];
    const mockShortUrl = '1856f451';
    const mockWhereQuery = {
      raw: true,
      attributes: ['longUrl'],
      where: {
        shortUrl: mockShortUrl,
      },
    };
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlshortener, 'findAll');
    mockQuery.mockResolvedValue(mockResponseLongUrl);
    const result = await dbOperations.getLongUrl(mockShortUrl);
    expect(mockQuery).toHaveBeenCalledWith(mockWhereQuery);
    expect(result).toBe(mockResponseLongUrl[0].longUrl);
  });

  it('should give an error message when db query fails', async () => {
    const mockShortUrl = '1856f451';
    const mockWhereQuery = {
      raw: true,
      attributes: ['longUrl'],
      where: {
        shortUrl: mockShortUrl,
      },
    };
    const mockQuery = jest.spyOn(urlShortenerSequelize.urlshortener, 'findAll');
    mockQuery.mockRejectedValue(new Error('unable to retreive url from the db'));
    const result = await dbOperations.getLongUrl(mockShortUrl);
    expect(mockQuery).toHaveBeenCalledWith(mockWhereQuery);
    expect(result).toBe('unable to retreive url from the db');
  });
});
