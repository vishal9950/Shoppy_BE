const Server = require('../../src/server');

describe('Test server for GET /ping: ', () => {
  test('Should return statusCode 200: ', (done) => {
    Server.inject('/ping', (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
