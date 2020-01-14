/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lov', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    text: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    group: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    delete_flag: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    }
  }, {
    tableName: 'lov',
    freezeTableName: true,
    timestamps: false
  });
};
