/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donor', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lov_prefix_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    firstname: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    lov_country_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    zipcode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    occupation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    lov_gender_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lov',
        key: 'id'
      }
    },
    line: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    lov_donor_group_id: {
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
    }
  }, {
    tableName: 'donor',
    freezeTableName: true,
    timestamps: false
  });
};
