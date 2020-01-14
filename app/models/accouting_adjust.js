/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounting_adjust', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    lov_servicepoint_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    qty: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cash: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    wait_transfer: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    adjust: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    update_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'accounting_adjust',
    freezeTableName: true,
    timestamps: false
  });
};
