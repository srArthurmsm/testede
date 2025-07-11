const conn = require('./db/conn')

const { Produto, Compras } = require('./model/rel')

async function syncDataBase() {
  try {
    await conn.sync({ force: true })
    console.log('foi')
  } catch (err) {
    console.error('erro', err)
  } 
}

syncDataBase()