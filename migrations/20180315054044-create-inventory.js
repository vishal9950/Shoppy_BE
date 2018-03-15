

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('inventories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    item_id: {
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.STRING,
    },
    brand: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    availableqty: {
      type: Sequelize.INTEGER,
    },
    cost: {
      type: Sequelize.FLOAT,
    },
    description: {
      type: Sequelize.STRING,
    },
    imageurl: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('inventories'),
};
