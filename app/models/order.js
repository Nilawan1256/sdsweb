/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    donor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'donor',
        key: 'id'
      }
    },
    lov_service_point_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    order_name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    product_group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'product_group',
        key: 'id'
      }
    },
    receipt_file: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    payment_period: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    lov_payment_status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    create_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    create_date: {
      type: DataTypes.DATE,
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
    tableName: 'order',
    freezeTableName: true,
    timestamps: false
  });
};
