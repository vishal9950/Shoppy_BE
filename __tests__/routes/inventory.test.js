const Server = require('../../src/server');
const Models = require('../../models');

jest.setTimeout(10000);
describe('Test GET /inventory: ', () => {
  beforeEach((done) => {
    Models.inventory.destroy({ truncate: true }).then(() => { done(); });
  });
  test('Should return statusCode 201 if DB empty: ', (done) => {
    Server.inject('/inventory', (response) => {
      expect(response.statusCode).toBe(201);
      done();
    });
  });

  test('Should return statusCode 200 if DB is not empty: ', (done) => {
    Models.inventory.create({
      item_id: 1,
      category: 'Fruits',
      brand: 'Fresho',
      title: 'Banana',
      availableqty: 3,
      cost: 10,
      description: '1 kg',
      imageurl: 'http://someurl',
    }).then(() => {
      Server.inject('/inventory', (response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  test('Should return the inventory items if DB is not empty: ', (done) => {
    Models.inventory.create({
      item_id: 1,
      category: 'Fruits',
      brand: 'Fresho',
      title: 'Banana',
      availableqty: 3,
      cost: 10,
      description: '1 kg',
      imageurl: 'http://someurl',
    }).then(() => {
      const testArr = [{
        item_id: 1,
        category: 'Fruits',
        brand: 'Fresho',
        title: 'Banana',
        availableqty: 3,
        cost: 10,
        description: '1 kg',
        imageurl: 'http://someurl',
      }];
      Server.inject('/inventory', (response) => {
        expect(JSON.parse(response.payload)).toEqual(testArr);
        done();
      });
    });
  });
});

