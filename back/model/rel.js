const Usuario = require('./Usuario')
const Produto = require('./produto')
const Compras = require('./Compras')

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