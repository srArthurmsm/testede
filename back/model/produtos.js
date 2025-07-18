const { DataTypes } = require('sequelize')
const db = require('../db/conn')
  
const Produto = db.define('Produto', {
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
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    percentualDesconto: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
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