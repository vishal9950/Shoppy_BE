

module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define('inventory', {
    item_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    title: DataTypes.STRING,
    availableqty: DataTypes.INTEGER,
    cost: DataTypes.FLOAT,
    description: DataTypes.STRING,
    imageurl: DataTypes.STRING,
  }, {});
  inventory.associate = function (models) {
    // associations can be defined here
  };
  return inventory;
};
