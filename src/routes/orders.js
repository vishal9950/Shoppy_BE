const Models = require('../../models');

const handler = (request, reply) => {
//   Models.orders.bulkCreate([
  // {
  //   order_id: 1,
  // },
  // {
  //   order_id: 2,
  // },
  // {
  //   order_id: 3,
  // },
  // {
  //   order_id: 4,
  // },
  // {
  //   order_id: 5,
  // },
  // {
  //   order_id: 6,
  // },
  // {
  //   order_id: 7,
  // },
  // {
  //   order_id: 8,
  // },
  // {
  //   order_id: 9,
  // },
  // {
  //   order_id: 10,
  // },
  // {
  //   order_id: 11,
  // },
  // {
  //   order_id: 12,
  // },
  // {
  //   order_id: 13,
  // },
//   ]).then(() => {
  Models.orders.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']],
    attributes: ['order_id'],
  }).then((value) => {
    // console.log(value);
    // const arr = [];
    // for (let i = 0; i < value.length; i += 1) {
    // Models.itemsordered.bulkCreate([
    //   {
    //     order_id: 10,
    //     item_id: 10,
    //     quantity: 1,
    //   },
    //   {
    //     order_id: 2,
    //     item_id: 10,
    //     quantity: 1,
    //   },
    // ]).then(() => {
    // console.log(value[1].dataValues.order_id);
    const promiseArr = [];
    for (let i = 0; i < value.length; i += 1) {
      // let flag = 1;
      const prom = new Promise(resolve => Models.itemsordered.findAll({
        where: {
          order_id: value[i].dataValues.order_id,
        },
        attributes: ['order_id', 'item_id', 'quantity'],
      }).then((items) => {
        //   if (items.dataValues === null) {
        //     flag = 0;
        //   } else {
        resolve(items);
        //   }
      }));
        // if (flag === 1) {
      promiseArr.push(prom);
      // }
    }
    Promise.all(promiseArr).then((itemsordered) => {
      const filteredArr = [];
      // const filteredArr = itemsordered.map((items) => {
      //   if (items.length !== 0) {
      //     return items;
      //   }
      // });
      for (let i = 0; i < itemsordered.length; i += 1) {
        if (itemsordered[i].length !== 0) {
          filteredArr.push(itemsordered[i]);
        }
      }
      reply(filteredArr[0]);
    });
    // });
    // }

    // reply(value);
  });
//   });
};

module.exports = {
  path: '/orders',
  method: 'GET',
  handler,
};

