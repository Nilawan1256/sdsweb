/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
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
        model: 'product_group',
        key: 'id'
      }
    }
  }, {
    tableName: 'product',
    freezeTableName: true,
    timestamps: false
  });
};
