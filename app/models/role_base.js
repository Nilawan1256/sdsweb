/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role_base', {
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
    delete_flag: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    }
  }, {
    tableName: 'role_base',
    freezeTableName: true,
    timestamps: false
  });
};
