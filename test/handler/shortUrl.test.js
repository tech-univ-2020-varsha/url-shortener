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

    const mockWriteDB = jest.spyOn(dbOperations, 'writeDB');
    const mockshortUrl = 'http://localhost:8080/1856f451';


    mockWriteDB.mockResolvedValue(mockshortUrl);
    await createShortUrl(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(mockshortUrl);
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

    const mockWriteDB = jest.spyOn(dbOperations, 'writeDB');
    mockWriteDB.mockRejectedValue(new Error('Unable to generate short url'));
    await createShortUrl(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Unable to generate short url');
    expect(mockCode).toHaveBeenCalledWith(500);
    mockWriteDB.mockRestore();
  });
});

describe('the redirect url function', () => {
  it('should obtain status code of 302 and be able to redirect to corresponding long url ', async () => {
    const mockRequest = {
      params: {
        urlhash: 'bf3870c1',
      },
    };
    const mockCode = jest.fn();
    const mockRedirect = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
      redirect: mockRedirect,
    };

    const mockGetLongUrl = jest.spyOn(dbOperations, 'getLongUrl');
    const mockLongUrl = 'https://github.com/VarshaCL';

    mockGetLongUrl.mockResolvedValue(mockLongUrl);
    await redirectUrl(mockRequest, mockH);
    expect(mockH.redirect).toHaveBeenCalledWith(mockLongUrl);
    mockGetLongUrl.mockRestore();
    mockRedirect.mockRestore();
    mockCode.mockRestore();
  });

  it('should obtain error code code of 500 when redirecting fails', async () => {
    const mockRequest = {
      params: {
        urlhash: 'bf3870c1',
      },
    };
    const mockCode = jest.fn();
    const mockRedirect = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
      redirect: mockRedirect,
    };

    const mockGetLongUrl = jest.spyOn(dbOperations, 'getLongUrl');
    const mockLongUrl = 'https://github.com/VarshaCL';

    mockGetLongUrl.mockRejectedValue(() => mockLongUrl);
    await redirectUrl(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Error in redirecting');
    expect(mockCode).toHaveBeenCalledWith(500);
    mockGetLongUrl.mockRestore();
    mockRedirect.mockRestore();
    mockCode.mockRestore();
  });
});
