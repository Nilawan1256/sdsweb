/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role_base_privilege', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_base_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'role_base',
        key: 'id'
      }
    },
    role_privilege_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'role_privilege',
        key: 'id'
      }
    }
  }, {
    tableName: 'role_base_privilege',
    freezeTableName: true,
    timestamps: false
  });
};
