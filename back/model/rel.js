const Usuario = require('./usuario')
const Produto = require('./produto')
const Compras = require('./compras')

Usuario.hasMany(Compras, {
    foreignKey: 'usuarioId',
    as: 'compras',
    onDelete: 'CASCADE'
})
Compras.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
})
  
Produto.hasMany(Compras, {
    foreignKey: 'produtoId',
    as: 'compras',
    onDelete: 'CASCADE'
})
  Compras.belongsTo(Produto, {
    foreignKey: 'produtoId',
    as: 'produto'
})