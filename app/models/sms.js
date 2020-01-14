/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sms', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sender: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    send_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lov_sends_sms_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lov_sms_response_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    }
  }, {
    tableName: 'sms',
    freezeTableName: true,
    timestamps: false
  });
};
