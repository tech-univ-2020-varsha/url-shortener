let { server } = require('../../server');
const dbOperations = require('../../src/utils/dbOperations');


const init = async () => {
  await server.initialize();
  return server;
};

describe('createShortUrl route ', () => {
  beforeEach(async () => {
    server = await init();
  });
  afterEach(async () => {
    await server.stop();
  });

  it('should obtain 200 success code when shortUrl is successfully generated', async () => {
    const mockWriteDB = jest.spyOn(dbOperations, 'writeDB');

    mockWriteDB.mockResolvedValue();
    const postNotesObj = {
      method: 'POST',
      url: '/createShortUrl',
      payload: {
        longUrl: 'https://www.github.com/shubhamzanwar',
      },
    };
    const response = await server.inject(postNotesObj);

    expect(response.statusCode).toBe(200);

    mockWriteDB.mockRestore();
  });

  it('should obtain 500 status code when shortUrl cannot be generated', async () => {
    const mockWriteDB = jest.spyOn(dbOperations, 'writeDB');

    mockWriteDB.mockRejectedValue(new Error('Unable to generate short url'));
    const postNotesObj = {
      method: 'POST',
      url: '/createShortUrl',
      payload: {
        longUrl: 'https://www.github.com/shubhamzanwar',
      },
    };
    const response = await server.inject(postNotesObj);

    expect(response.statusCode).toBe(500);

    mockWriteDB.mockRestore();
  });
});

describe('redirect url route ', () => {
  beforeEach(async () => {
    server = await init();
  });
  afterEach(async () => {
    await server.stop();
  });

  it('should obtain status code of 302 on successful redirection', async () => {
    const mockGetLongUrl = jest.spyOn(dbOperations, 'getLongUrl');
    const mockLongUrl = [{ longUrl: 'https://github.com/VarshaCL', expiresat: '1580444129764' }];

    const redirectUrlObj = {
      method: 'GET',
      url: '/bf3870c1',

    };

    mockGetLongUrl.mockResolvedValue(mockLongUrl);
    const response = await server.inject(redirectUrlObj);

    expect(response.statusCode).toBe(302);

    mockGetLongUrl.mockRestore();
  });

  it('should obtain status code of 500 on failing to redirect', async () => {
    const mockGetLongUrl = jest.spyOn(dbOperations, 'getLongUrl');
    const redirectUrlObj = {
      method: 'GET',
      url: '/bf3870c1',

    };

    mockGetLongUrl.mockRejectedValue(new Error('Error in redirecting'));
    const response = await server.inject(redirectUrlObj);

    expect(response.statusCode).toBe(500);

    mockGetLongUrl.mockRestore();
  });
  it('should obtain status code of 410 short url expires', async () => {
    const mockGetLongUrl = jest.spyOn(dbOperations, 'getLongUrl');
    const redirectUrlObj = {
      method: 'GET',
      url: '/bf3870c1',

    };

    const mockLongUrl = [{ longUrl: 'https://github.com/VarshaCL', expiresat: '1580444129764' }];
    Date.now = jest.fn(() => '1580444129769');
    mockGetLongUrl.mockResolvedValue(mockLongUrl);
    const response = await server.inject(redirectUrlObj);

    expect(response.statusCode).toBe(410);

    mockGetLongUrl.mockRestore();
  });
});
