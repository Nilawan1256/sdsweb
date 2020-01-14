/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_transfer', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    lov_payment_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    seq: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    notification_date: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    payment_date: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    need_receipt: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    receipt_file: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'order_transfer',
    freezeTableName: true,
    timestamps: false
  });
};
