const shortHash = require('short-hash');
const dbOperations = require('../../src/utils/dbOperations');
const { createShortUrl, redirectUrl } = require('../../src/handler/shortUrlHandler');

describe('create short url function', () => {
  it('should obtain success code of 200 and response with short url when the short url is successfully generated', async () => {
    const mockRequest = {
      payload: {
        longUrl: 'https://www.github.com/shubhamzanwar',
      },
    };
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    const mockResponse = `http://localhost:8080/${shortHash(mockRequest.payload.longUrl)}`;

    const mockWriteDB = jest.spyOn(dbOperations, 'writeDB');
    const mockWriteDBResponse = {
      urlShortener: {
        dataValues: {
          id: 9,
          longUrl: 'https://www.github.com/shubhamzanwar',
          shortUrl: 'http://localhost:8080/1856f451',

        },
      },
    };
    mockWriteDB.mockResolvedValue(mockWriteDBResponse);
    await createShortUrl(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(mockResponse);
    expect(mockCode).toHaveBeenCalledWith(200);

    mockWriteDB.mockRestore();
  });
  it('should obtain error code code of 500 when short url could not be generated', async () => {
    const mockRequest = {
      payload: {
        longUrl: 'https://www.github.com/shubhamzanwar',
      },
    };
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    const mockResponse = `http://localhost:8080/${shortHash(mockRequest.payload.longUrl)}`;

    const mockWriteDB = jest.spyOn(dbOperations, 'writeDB');
    mockWriteDB.mockRejectedValue();
    await createShortUrl(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(mockResponse);
    expect(mockCode).toHaveBeenCalledWith(200);

    mockWriteDB.mockRestore();
  });
});
