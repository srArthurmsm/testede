const { DataTypes } = require('sequelize')
const db = require('../db/conn')
  
const Produto = db.define('produto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discountPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'produtos',
    timestamps: false
});

module.exports = Produto