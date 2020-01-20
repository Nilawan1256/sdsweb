/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var product_group = sequelize.define('product_group', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    tableName: 'product_group',
    freezeTableName: true,
    timestamps: false
  });

  product_group.associate = function (models) {
    product_group.belongsTo(models.product, {
      as: 'fk_product_product_group_id',
      foreignKey: 'id',
      constraints: false
    });
    product_group.belongsTo(models.order, {
      as: 'fk_order_product_group_id',
      foreignKey: 'id',
      constraints: false
    });
  };

  return product_group;
};
