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
        attributes: ['order_id', 'item_id', 'quantity', 'createdAt'],
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
      /* TODO
      Categorize and send
      */
      reply(filteredArr);
    });
    // });
    // }

    // reply(value);
  });
//   });
};

const handler1 = (request, reply) => {
  // const a = [
  //   {
  //     item_id: 10,
  //     quantity: 1,
  //   },
  //   {
  //     item_id: 20,
  //     quantity: 3,
  //   },
  // ];
  // console.log('handler1:::::::::');
  // console.log(request.payload.items);

  /* TODO
  Use better approach to this
  */
  const payload = JSON.parse(request.payload.items);
  const promiseArr = [];
  for (let i = 0; i < payload.length; i += 1) {
    const prom = new Promise(response => Models.inventory.findAll({
      where: {
        item_id: payload[i].item_id,
      },
    }).then((value) => {
      response(value);
    }));
    promiseArr.push(prom);
  }
  Promise.all(promiseArr).then((values) => {
    const promiseArr2 = [];
    const promiseArr3 = [];
    let flag = 1;
    let i;
    for (i = 0; i < values.length; i += 1) {
      // console.log(values[i][0].dataValues);
      if (values[i][0].dataValues.availableqty < payload[i].quantity) {
        flag = 0;
        for (let j = 0; j < i; j += 1) {
          const prom1 = new Promise(resolve => Models.inventory.update(
            {
              availableqty: values[j][0].dataValues.availableqty,
            },
            {
              where: {
                item_id: payload[j].item_id,
              },
            },
          ).then(() => {
            resolve('back');
          }));
          promiseArr3.push(prom1);
        }
        reply(`Sorry! We don't have quantity ${payload[i].quantity} of ${values[i][0].dataValues.title}`);
        break;
      } else {
        const prom = new Promise(resolve => Models.inventory.update(
          {
            availableqty: values[i][0].dataValues.availableqty - payload[i].quantity,
          },
          {
            where: {
              item_id: payload[i].item_id,
            },
          },
        ).then(() => {
          resolve('true');
        }));
        promiseArr2.push(prom);
      }
    }
    console.log('flag:::::::::: ', flag);
    if (flag === 1) {
      Promise.all(promiseArr2).then(() => {
        Models.orders.count().then((count) => {
          Models.orders.create({
            order_id: count + 1,
          }).then(() => {
            const payloadMapped = payload.map(item => ({
              order_id: count + 1,
              item_id: item.item_id,
              quantity: item.quantity,
            }));
            Models.itemsordered.bulkCreate(payloadMapped).then(() => {
              reply('Order Placed').code(201);
            });
          });
        });
        // reply('dcv');
        // reply(values);
      });
    } else {
      Promise.all(promiseArr3).then(() => {
        console.log('Rolled Back::::::');
      });
    }
  });

  // console.log(payload);
  // const payload = JSON.parse(request.payload);
  // reply(payload);
  // Models.inventory.findAll({
  //   where: {
  //     item_id: request.payload.item_id,
  //   },
  // }).then((item) => {
  //   if (item[0].dataValues.availableqty < request.payload.quantity) {
  //     reply(`Sorry! We don't have quantity ${request.payload.quantity}
  // of ${item[0].dataValues.title}`);
  //   } else {
  //     Models.orders.count().then((count) => {

  //     })
  //   }
  // });
};

module.exports = [
  {
    path: '/orders',
    method: 'GET',
    handler,
  },
  {
    path: '/orders',
    method: 'POST',
    handler: handler1,
  },
];

