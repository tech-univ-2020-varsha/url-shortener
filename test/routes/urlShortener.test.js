let { server } = require('../../server');
const dbOperations = require('../../src/utils/dbOperations');


const init = async () => {
  await server.initialize();
  return server;
};

describe('the server function', () => {
  beforeEach(async () => {
    server = await init();
  });
  afterEach(async () => {
    await server.stop();
  });

  it('should obtain 200 success code for route "createShortUrl" with POST method when shortUrl is successfully generated', async () => {
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
});
