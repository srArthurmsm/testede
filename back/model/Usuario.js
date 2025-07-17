const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuarios = db.define('usuarios',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'usuarios', 
    timestamps: false
})

module.exports = Usuarios