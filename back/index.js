const express = require('express')
const app = express()

require('dotenv').config(
    {
        path: '../.env'
    }
)

const cors = require('cors')
const PORT = process.env.PORT
const hostname = process.env.DB_HOST

const conn = require('./db/conn')
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const compraController = require('./controller/compras.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/usuario', usuarioController.listar)
app.post('/usuario', usuarioController.cadastrar)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)
app.get('/usuario/id/:id', usuarioController.findbyid)
app.get('/usuario/nome/:nome', usuarioController.findByName)

app.get('/produto', produtoController.listar)
app.post('/produto', produtoController.cadastrar)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)
app.get('/produto/id/:id', produtoController.findbyid)


app.get('/compra', compraController.listar)
app.post('/compra', compraController.cadastrar)
app.put('/compra/:id', compraController.atualizar)
app.delete('/compra/:id', compraController.apagar)
app.get('/compra/id/:id', compraController.findbyid)


app.get('/', (req,res)=>{
    res.status(200).json({message: "rodando!"})
})

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em: http://${hostname}:${PORT}`)
    })
})

.catch((err)=>{
    console.error('Não foi possível se conectar com o banco de dados: ', err)
})