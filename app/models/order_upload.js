/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_upload', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lov_service_point_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    lov_order_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    lov_donor_verify_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    lov_order_verify_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    fileurl: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    lov_lock_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
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
    tableName: 'order_upload',
    freezeTableName: true,
    timestamps: false
  });
};
