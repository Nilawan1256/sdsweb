/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_rolebase', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    role_base_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'role_base_privilege',
        key: 'id'
      }
    }
  }, {
    tableName: 'user_rolebase',
    freezeTableName: true,
    timestamps: false
  });
};
