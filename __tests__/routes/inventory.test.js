const Server = require('../../src/server');
const Models = require('../../models');

jest.setTimeout(10000);
describe('Test GET /inventory: ', () => {
  beforeAll((done) => {
    Models.inventory.destroy({ truncate: true }).then(() => { done(); });
  });
  test('Should return statusCode 201 if DB empty: ', (done) => {
    Server.inject('/inventory', (response) => {
      expect(response.statusCode).toBe(201);
      done();
    });
  });
});

