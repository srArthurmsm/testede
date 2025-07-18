let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    const price = Number(document.getElementById('price').value);
    const discountPercentage = Number(document.getElementById('discountPercentage').value);
    const finalPrice = price * (discountPercentage / 100)
    const valores = {
        quant: Number(document.getElementById('quant').value),
        date: document.getElementById('date').value,
        price: price,
        discountPercentage: discountPercentage,
        finalPrice: finalPrice,
        paymentWay: document.getElementById('paymentWay').value,
        status: document.getElementById('status').value
    };
    res.innerHTML = '';

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
        return resp.json();
    })
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
  fetch('http://localhost:3000/compra') 
    .then(resp => {
      if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
      return resp.json();
    })
    .then(produtos => {
      tabelaProdutos.innerHTML = '';

      produtos.forEach(produto => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${produto.id}</td>
          <td>${produto.quant}</td>
          <td>${new Date(produto.date).toLocaleDateString()}</td>
          <td>${produto.price.toFixed(2)}</td>
          <td>${produto.discountPercentage.toFixed(2)}</td>
          <td>${produto.finalPrice.toFixed(2)}</td>
          <td>${produto.paymentWay}</td>
          <td>${produto.status}</td>
        `;
        tabelaProdutos.appendChild(linha);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar produtos:', err);
      tabelaProdutos.innerHTML = `<tr><td colspan="8">Erro ao carregar produtos.</td></tr>`;
    });
});

const res2 = document.getElementById('res2');
const atualizarBtn = document.getElementById('atualizar');

atualizarBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;

    const price = Number(document.getElementById('price').value);
    const discountPercentage = Number(document.getElementById('discountPercentage').value);
    const finalPrice = price * (discountPercentage / 100)
    const valores = {
        quant: Number(document.getElementById('quant').value),
        date: document.getElementById('date').value,
        price: price,
        discountPercentage: discountPercentage,
        finalPrice: finalPrice,
        paymentWay: document.getElementById('paymentWay').value,
        status: document.getElementById('status').value
    };

    fetch(`http://localhost:3000/compra/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(valores)
    })
    .then(resp => {
      if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
      return resp.json();
    })
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
    .then(resp => {
      if (resp.status === 404) throw new Error('Produto não encontrado');
      if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
      return resp.json();
    })
    .then(() => {
      res3.innerHTML = `<p style="color:green;">Produto apagado com sucesso!</p>`;
      if (listarBtn) listarBtn.click();
    })
    .catch(err => {
      console.error('Erro ao apagar produto:', err);
      res3.innerHTML = `<p style="color:red;">Erro ao apagar produto.</p>`;
    });
});