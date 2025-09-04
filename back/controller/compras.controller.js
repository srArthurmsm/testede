const Produto = require('../model/produtos')
const Compras = require('../model/compras')
const Usuario = require('../model/Usuario')

const cadastrar = async (req, res) => {
  try {
    const { usuarioId, produtoId, quant, date, paymentWay, status } = req.body;
    const produto = await Produto.findByPk(produtoId);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado!' })
    }
    const price = produto.price;
    const discountPercentage = produto.discountPercentage
    const finalPrice = (price - (price * discountPercentage / 100)).toFixed(2)
    const compra = await Compras.create({
      usuarioId,
      produtoId,
      quant,
      date,
      paymentWay,
      status,
      price,
      discountPercentage,
      finalPrice
    })
    await produto.update({ estoque: produto.estoque - quant })
    res.status(201).json(compra);
  } catch (err) {
    console.error('AHHHHHHHHHHHHHHHHH', err);
    res.status(500).json({ message: 'AHHHHHHHHHHHHHHHHHHHH' });
  }
};
const listar = async (req,res)=>{
    try{
        const dados = await Compras.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao listar os dados!',err)
        res.status(500).json({message: 'Erro ao listar os dados!'})
    }
}

const apagar = async (req,res)=>{
    const id = req.params.id
    try{
        const dados = await Compras.findByPk(id)
        if(dados){
            await Compras.destroy({where: { id: id}})
            res.status(200).json({message: 'Dados excluídos com sucesso!'})
        }else{
            res.status(404).json({message: 'Compras não encontrado!'})
        }    
    }catch(err){
        console.error('Erro ao apagar os dados!',err)
        res.status(500).json({message: 'Erro ao apagar os dados!'})
    }
}


const atualizar = async (req,res)=>{
    const id = req.params.id
    const valores = req.body
    try{
        let dados = await Compras.findByPk(id)
        if(dados){
            await Compras.update(valores, {where: { id: id}})
            dados = await Compras.findByPk(id)
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Compras não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}


const findbyid = async (req,res)=>{
    const id = req.params.id
    try{
        let dados = await Compras.findByPk(id)
        if(dados){
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Compras não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const listarCompleto = async (req, res) => {
    try {
      const compras = await Compras.findAll();
  
      const dados = [];
      for (const compra of compras) {
        const produto = await Produto.findByPk(compra.produtoId);
        const usuario = await Usuario.findByPk(compra.usuarioId);
  
        dados.push({
          id: compra.id,
          usuario: usuario ? `${usuario.firstName} ${usuario.lastName}` : "Não encontrado",
          produto: produto ? produto.titulo : "Não encontrado",
          quant: compra.quant,             
          date: compra.date,                 
          finalPrice: compra.finalPrice,
          paymentWay: compra.paymentWay,
          status: compra.status,
        });
      }
  
      res.status(200).json(dados);
    } catch (err) {
      console.error("Erro ao listar os dados!", err);
      res.status(500).json({ message: "Erro ao listar os dados!" });
    }
};
  

module.exports = { cadastrar, listar, apagar, atualizar, findbyid, listarCompleto}
