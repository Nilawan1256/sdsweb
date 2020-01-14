/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_item', {
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
};
