const Server = require('../../src/server');
const Models = require('../../models');

describe('Test server for GET /orders: ', () => {
  beforeAll((done) => {
    Models.orders.create({
      order_id: 12,
    }).then(() => {
      Models.itemsordered.bulkCreate([
        {
          order_id: 12,
          item_id: 10,
          quantity: 2,
        },
        {
          order_id: 12,
          item_id: 11,
          quantity: 1,
        },
        {
          order_id: 12,
          item_id: 20,
          quantity: 3,
        },
      ]);
    }).then(() => { done(); });
  });
  afterAll((done) => {
    Models.orders.destroy({ truncate: true }).then(() => {
      Models.itemsordered.destroy({ truncate: true }).then(() => { done(); });
    });
  });

  test('Should return the statusCode 200 for a valid order_id: ', (done) => {
    Server.inject('/orders', (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Should return the orders for a valid order_id: ', (done) => {
    const testArr = [
      {
        order_id: 12,
        item_id: 10,
        quantity: 2,
      },
      {
        order_id: 12,
        item_id: 11,
        quantity: 1,
      },
      {
        order_id: 12,
        item_id: 20,
        quantity: 3,
      },
    ];
    Server.inject('/orders', (response) => {
      expect(JSON.parse(response.payload)).toEqual(testArr);
      done();
    });
  });
});
