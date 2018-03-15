const ping = require('./ping');
const inventory = require('./inventory');
const orders = require('./orders');

module.exports = [].concat(ping, inventory, orders);
