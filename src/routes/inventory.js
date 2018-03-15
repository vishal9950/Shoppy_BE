const rp = require('request-promise');
const Models = require('../../models');

const handler = (request, reply) => {
  Models.inventory.count().then((value) => {
    if (value === 0) {
      rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/inventory').then((inventory) => {
        const inventoryJSON = JSON.parse(inventory).inventory;
        console.log(inventoryJSON);
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
        Models.inventory.bulkCreate(inventoryMapped).then((stored) => {
          if (stored !== null) {
            console.log('From API');
            reply(inventoryMapped).code(201);
          }
        });
      });
    } else {
      Models.inventory.findAll({
        attributes: ['item_id', 'category', 'brand', 'title', 'availableqty', 'cost', 'description', 'imageurl'],
      }).then((items) => {
        console.log('From DB');
        reply(items).code(200);
      });
    }
  });
};

module.exports = {
  path: '/inventory',
  method: 'GET',
  handler,
};

