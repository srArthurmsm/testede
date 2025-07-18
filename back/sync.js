const conn = require('./db/conn')

const { Usuario, Produto, Compra } = require('./model/rel')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('Tabelas criadas')
    }
    catch(err){
        console.error('Não foi possível criar as tabelas',err)
    }
    finally{
        await conn.close()
        console.log('Fechado')
    }
}

syncDataBase()