'use strict';
module.exports = (sequelize, DataTypes) => {
  var itemsordered = sequelize.define('itemsordered', {
    order_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  itemsordered.associate = function(models) {
    // associations can be defined here
  };
  return itemsordered;
};