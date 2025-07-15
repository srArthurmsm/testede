

require('dotenv').config(
    {
        path: "./.env"
    }
);


const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const compras = require('./model/Compras')
const produtos = require('./model/Produtos')
const usuario = require('./model/Usuario')


const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

app.use(express.urlencoded({extended:true}))
app.use(express())
app.use(cors())



app.get('/', (req,res)=>{
    res.status(200).json({message: "Aplicação rodando!"})
})

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Não foi possível conectar com o banco de dados!',err)
})