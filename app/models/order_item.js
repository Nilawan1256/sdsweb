/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var order = sequelize.define('order_item', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    qty: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    }
  }, {
    tableName: 'order_item',
    freezeTableName: true,
    timestamps: false
  });

  order.associate = function (models) {
    order.belongsTo(models.product, {
      as: 'fk_order_item_product_id',
      foreignKey: 'product_id'
    });
  };

  return order;
};
