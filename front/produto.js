let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const valores = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        percentualDesconto: parseFloat(document.getElementById('percentualDesconto').value),
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
    fetch('http://localhost:3000/produto') 
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
                <td>${produto.titulo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.categoria}</td>
                <td>${produto.preco.toFixed(2)}</td>
                <td>${produto.percentualDesconto.toFixed(2)}</td>
                <td>${produto.estoque}</td>
                <td>${produto.marca}</td>
                <td><img src="${produto.imagem}" width="50" /></td>
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
        preco: parseFloat(document.getElementById('preco').value),
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

    fetch(`http://localhost:3000/produto/${id}`, {
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