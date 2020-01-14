/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'country',
    freezeTableName: true,
    timestamps: false
  });
};
