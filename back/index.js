

require('dotenv').config(
    {
        path: "./.env"
    }
);


const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const compras = require('./model/compras')
const produtos = require('./model/produtos')
const usuario = require('./model/Usuario')


const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

app.use(express.urlencoded({extended:true}))
app.use(express())
app.use(cors())


app.get("/usuario" ,async (req, rel)=>{

})