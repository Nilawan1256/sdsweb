/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var stock_fulfill = sequelize.define('stock_fulfill', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    qty_instock: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    qty_receive: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    receive_plan_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    receive_actual_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'stock_fulfill',
    freezeTableName: true,
    timestamps: false
  });

  stock_fulfill.associate = function (models) {
    stock_fulfill.belongsTo(models.product, {
      as: 'fk_stock_fulfill_product_id',
      foreignKey: 'product_id'
    });
  };
  
  return stock_fulfill;

};
