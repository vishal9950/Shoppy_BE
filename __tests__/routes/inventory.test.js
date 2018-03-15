const Server = require('../../src/server');
const Models = require('../../models');
const rp = require('request-promise');

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

  test('Should return the inventory items if DB is not empty: ', (done) => {
    Models.inventory.count().then((value) => {
      expect(value).toBe(0);
      rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/inventory').then((inventory) => {
        const inventoryJSON = JSON.parse(inventory).inventory;
        const inventoryMapped = inventoryJSON.map(item => ({
          item_id: item.id,
          category: item.category,
          brand: item.brand,
          title: item.title,
          availableqty: item.availableQuantity,
          cost: item.cost,
          description: item.description,
          imageurl: item.imageUrl,
        }));
        Server.inject('/inventory', (response) => {
          expect(JSON.parse(response.payload)).toEqual(inventoryMapped);
          Models.inventory.count().then((count) => {
            expect(count).toBe(inventoryMapped.length);
          }).then(() => { done(); });
        });
      });
    });
  });
});

