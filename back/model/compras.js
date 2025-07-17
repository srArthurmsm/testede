const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Compras = db.define('compras',{
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
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
    finalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    paymentWay: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(40),
        allowNull: false
    }
},{
    tableName: 'compras', 
    timestamps: false
})

module.exports = Compras