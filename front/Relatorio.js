const listarBtn = document.getElementById('listar');
const tabelaProdutos = document.getElementById('produtos-table')

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
            if (produto.estoque < 10){
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
            }
        });
    })
    .catch(err => {
        console.error('Erro ao carregar produtos:', err);
        tabelaProdutos.innerHTML = `<tr><td colspan="9">Erro ao carregar produtos.</td></tr>`;
    });
});

const listarBtn2 = document.getElementById('listar2');
const tabelaProdutos2 = document.getElementById('usuario-form2');

listarBtn2.addEventListener('click', () => {
  fetch('http://localhost:3000/compra/list') 
    .then(resp => resp.json())
    .then(produtos => {
      tabelaProdutos2.innerHTML = '';

      produtos.forEach(compra => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
          <td>${compra.id}</td>
          <td>${compra.usuario}</td>
          <td>${compra.produto}</td>
          <td>${compra.quant}</td>
          <td>${new Date(compra.date).toLocaleDateString()}</td>
          <td>${compra.finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          <td>${compra.paymentWay}</td>
          <td>${compra.status}</td>
        `;
        tabelaProdutos2.appendChild(linha);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar produtos:', err);
  
    });
});
