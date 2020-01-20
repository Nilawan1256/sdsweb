/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var stock = sequelize.define('stock', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    qty: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'stock',
    freezeTableName: true,
    timestamps: false
  });

  stock.associate = function (models) {
    stock.belongsTo(models.product, {
      as: 'fk_stock_product_id',
      foreignKey: 'product_id'
    });
  };
  
  return stock;

};
