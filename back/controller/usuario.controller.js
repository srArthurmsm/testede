const Usuario = require('../model/Usuario')

const cadastrar = async (req,res)=>{
    const valores = req.body
    try{
        const dados = await Usuario.create(valores)
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao cadastrar os dados!',err)
        res.status(500).json({message: 'Erro ao cadastrar os dados!'})
    }
}

const listar = async (req,res)=>{
    try{
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao listar os dados!',err)
        res.status(500).json({message: 'Erro ao listar os dados!'})
    }
}


const apagar = async (req,res)=>{
    const id = req.params.id
    try{
        const dados = await Usuario.findByPk(id)
        if(dados){
            await Usuario.destroy({where: { id: id}})
            res.status(204).json({message: 'Dados excluídos com sucesso!'})
        }else{
            res.status(404).json({message: 'Usuario não encontrado!'})
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
        let dados = await Usuario.findByPk(id)
        if(dados){
            await Usuario.update(valores, {where: { id: id}})
            dados = await Usuario.findByPk(id)
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Usuario não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const findbyid = async (req,res)=>{
    const id = req.params.id
    const valores = req.body
    try{
        let dados = await Usuario.findByPk(id)
        if(dados){
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Usuario não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const findByName = async (req, res) => {
    const nome = req.params.nome;
    try {
        const dados = await Usuario.findOne({where: {firstName: nome }});
        if (dados) {
            res.status(200).json(dados);
        } else {
            res.status(404).json({ message: 'Usuario não encontrado!' });
        }
    } catch (err) {
        console.error('Erro ao buscar o Usuario por nome!', err);
        res.status(500).json({ message: 'Erro ao buscar o Usuario!' });
    }
}

module.exports = { cadastrar, listar, apagar, atualizar, findbyid, findByName}
