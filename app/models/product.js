/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      product_group_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "product_group",
          key: "id"
        }
      }
    },
    {
      tableName: "product",
      freezeTableName: true,
      timestamps: false
    }
  );

  product.associate = function(models) {
    product.belongsTo(models.stock, {
      as: "fk_stock_product_id",
      foreignKey: "id",
      constraints: false
    });
    product.belongsTo(models.stock_fulfill, {
      as: "fk_stock_fulfill_product_id",
      foreignKey: "id",
      constraints: false
    });
    product.belongsTo(models.order_item, {
      as: "fk_order_item_product_id",
      foreignKey: "id",
      constraints: false
    });
    product.belongsTo(models.product_group, {
      as: "fk_product_product_group_id",
      foreignKey: "product_group_id"
    });
  };

  return product;
};
