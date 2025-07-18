
require('dotenv').config(
    {
        path: "../.env"
    }
);

console.log("Variáveis de ambiente carregadas:");

const { Sequelize} = require('sequelize')

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;



const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'mysql'
});

sequelize.authenticate()
.then(() => {
    console.log('Conexão com banco de dados realizada com sucesso!');
})
.catch((err) => {
    console.log(dbUser, dbPass, dbName, dbHost)
    console.error('Não foi possível conectar com o banco de dados!' , err);
});

module.exports = sequelize