let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const valores = {
        quant: Number(document.getElementById('quant').value),
        date: document.getElementById('date').value,
        usuarioId: document.getElementById('usuario').value,
        produtoId: document.getElementById('produto').value,
        paymentWay: document.getElementById('paymentWay').value,
        status: document.getElementById('status').value
    };
    res.innerHTML = '';

    fetch('http://localhost:3000/compra', {
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
const tabelaProdutos = document.getElementById('usuario-form2');

listarBtn.addEventListener('click', () => {
  fetch('http://localhost:3000/compra') 
    .then(resp => resp.json())
    .then(produtos => {
      tabelaProdutos.innerHTML = `<tr>
            <th>ID</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Preço</th>
            <th>Desconto (%)</th>
            <th>Preço Final</th>
            <th>Forma de Pagamento</th>
            <th>Status</th>
          </tr>`

      produtos.forEach(compra => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
          <td>${compra.id}</td>
          <td>${compra.quant}</td>
          <td>${new Date(compra.date).toLocaleDateString()}</td>
          <td>${compra.price}</td>
          <td>${compra.discountPercentage}</td>
          <td>${compra.finalPrice}</td>
          <td>${compra.paymentWay}</td>
          <td>${compra.status}</td>
        `;
        tabelaProdutos.appendChild(linha);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar produtos:', err);
  
    });
});

const res2 = document.getElementById('res2');
const atualizarBtn = document.getElementById('atualizar');

atualizarBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;

    const price = Number(document.getElementById('price2').value);
    const discountPercentage = Number(document.getElementById('discountPercentage2').value);
    const finalPrice = price * (discountPercentage / 100)
    const valores = {
        quant: Number(document.getElementById('quant2').value),
        date: document.getElementById('date2').value,
        price: price,
        discountPercentage: discountPercentage,
        finalPrice: finalPrice,
        paymentWay: document.getElementById('paymentWay2').value,
        status: document.getElementById('status2').value
    };

    fetch(`http://localhost:3000/compra/${id}`, {
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
    fetch(`http://localhost:3000/compra/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => {
      res3.innerHTML = `<p style="color:green;">Produto apagado com sucesso!</p>`
      if (listarBtn) listarBtn.click()
    })
    .catch(err => {
      console.error('Erro ao apagar produto:', err)
      res3.innerHTML = `<p style="color:red;">Erro ao apagar produto.</p>`
    })
})

let achar = document.getElementById('achar')

const tabelaUsuarios2 = document.getElementById('usuarios-table3');
achar.addEventListener('click', (e) => {
    e.preventDefault();
  
    const id = document.getElementById('ID3').value
  
    fetch(`http://localhost:3000/compra/id/${id}`)
      .then(resp => resp.json())
      .then(compra => {
        tabelaUsuarios2.innerHTML = '';
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${compra.id}</td>
          <td>${compra.quant}</td>
          <td>${new Date(compra.date).toLocaleDateString()}</td>
          <td>${compra.price.toFixed(2)}</td>
          <td>${compra.discountPercentage.toFixed(2)}</td>
          <td>${compra.finalPrice.toFixed(2)}</td>
          <td>${compra.paymentWay}</td>
          <td>${compra.status}</td>
        `
        tabelaUsuarios2.appendChild(linha);
      })
      .catch(err => {
        console.error('Erro', err);
      })
})


function atualizarQuan(){
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
}