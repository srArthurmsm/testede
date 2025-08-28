let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cardLote.addEventListener('click', (e)=>{
    e.preventDefault()
    valores = []
    fetch('https://dummyjson.com/products')
    .then(resp => resp.json())
    .then(dadosDummy => {
        console.log(dadosDummy.products)
        dadosDummy.products.forEach(dad => {
          const val = {
            titulo: dad.title,
            descricao: dad.description,
            categoria: dad.category,
            price: dad.price,
            discountPercentage: dad.discountPercentage,
            estoque: dad.stock,
            marca: dad.brand,
            imagem: dad.thumbnail
          }
            valores.push(val)
  
          
        })
        console.log(valores)
        console.log('-------------')
  
        fetch(`http://localhost:3000/produto/lote`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(valores)
        })
        .then(resp => resp.json())
        .then(dados => {
          console.log('dados gravados', dados)
        })
        .catch((err)=>{
            console.error('Erro ao gravar os dados', err)
        })
    })
    .catch((err)=>{
        console.error('Não foi possível carrgar os dados',err)
    })
  
  })

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const valores = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        price: parseFloat(document.getElementById('preco').value),
        discountPercentage: parseFloat(document.getElementById('percentualDesconto').value),
        estoque: parseInt(document.getElementById('estoque').value),
        marca: document.getElementById('marca').value,
        imagem: document.getElementById('imagem').value
    };

    res.innerHTML = '';

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados => {
        res.innerHTML = `<p style="color:green;">Produto cadastrado com sucesso! ID: ${dados.id}</p>`;
    })
    .catch(err => {
        console.error('Erro ao cadastrar o produto!', err);
        res.innerHTML = `<p style="color:red;">Erro ao cadastrar o produto.</p>`;
    });
});

const listarBtn = document.getElementById('listar');
const tabelaProdutos = document.querySelector('#produtos-table tbody');

listarBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/produto') 
    .then(resp => resp.json())
    .then(produtos => {
        tabelaProdutos.innerHTML = '';
        
        produtos.forEach(produto => {
            var preco = produto.price
            var desconto = produto.discountPercentage
            var final = (preco - (preco * (desconto / 100))).toFixed(2)
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.titulo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.categoria}</td>
                <td>${produto.price}</td>
                <td>${produto.discountPercentage} %</td>
                <td>${final}</td>
                <td>${produto.estoque}</td>
                <td>${produto.marca}</td>
                <td><img src="${produto.imagem}" width="100" /></td>
            `;
            tabelaProdutos.appendChild(linha);
        });
    })
    .catch(err => {
        console.error('Erro ao carregar produtos:', err);
        tabelaProdutos.innerHTML = `<tr><td colspan="9">Erro ao carregar produtos.</td></tr>`;
    });
});

const res2 = document.getElementById('res2');
const atualizarBtn = document.getElementById('atualizar');

atualizarBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;

    const valores = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('price').value),
        percentualDesconto: parseFloat(document.getElementById('percentualDesconto').value),
        estoque: parseInt(document.getElementById('estoque').value),
        marca: document.getElementById('marca').value,
        imagem: document.getElementById('imagem').value
    };

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados => {
        res2.innerHTML = `<p style="color:green;">Produto atualizado com sucesso!</p>`;
        if (listarBtn) listarBtn.click();
    })
    .catch(err => {
        console.error('Erro ao atualizar o produto:', err);
        res2.innerHTML = `<p style="color:red;">Erro ao atualizar o produto.</p>`;
    });
});

const res3 = document.getElementById('res3');
const apagarBtn = document.getElementById('apagar');

apagarBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const id = document.getElementById('id3').value;

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => {
        res3.innerHTML = `<p style="color:green;">Produto apagado com sucesso!</p>`;
        if (listarBtn) listarBtn.click();
    })
    .catch(err => {
        console.error('Erro ao apagar produto:', err);
        res3.innerHTML = `<p style="color:red;">Erro ao apagar produto.</p>`;
    });
});

let achar = document.getElementById('achar')

const tabelaUsuarios2 = document.getElementById('usuarios-table2');
achar.addEventListener('click', (e) => {
    e.preventDefault();
  
    const id = document.getElementById('ID4').value
  
    fetch(`http://localhost:3000/produto/id/${id}`)
      .then(resp => resp.json())
      .then(produto => {
        var preco = produto.price
        var desconto = produto.discountPercentage
        var final = (preco - (preco * (desconto / 100))).toFixed(2)
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.titulo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.categoria}</td>
            <td>${produto.price}</td>
            <td>${produto.discountPercentage} %</td>
            <td>${final}</td>
            <td>${produto.estoque}</td>
            <td>${produto.marca}</td>
            <td><img src="${produto.imagem}" width="100" /></td>
        `;
        tabelaUsuarios2.appendChild(linha);
      })
      .catch(err => {
        console.error('Erro', err);
      });
  });
