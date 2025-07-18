let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const valores = {
        firstName: document.getElementById('nome').value,
        lastName: document.getElementById('sobrenome').value,
        age: Number(document.getElementById('idade').value),
        email: document.getElementById('email').value,
        telefone: Number(document.getElementById('telefone').value),
        address: document.getElementById('endereco').value,
        city: document.getElementById('cidade').value,
        state: document.getElementById('estado').value,
        birthDate: document.getElementById('nascimento').value
    };

    res.innerHTML = '';

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
        return resp.json();
    })
    .then(dados => {
        res.innerHTML = `<p style="color:green;">Usuário cadastrado com sucesso! Nome: ${dados.firstName}</p>`;
    })
    .catch(err => {
        console.error('Erro ao cadastrar o usuário!', err);
        res.innerHTML = `<p style="color:red;">Erro ao cadastrar o usuário.</p>`;
    });
});

const listarBtn = document.getElementById('listar');
const tabelaUsuarios = document.querySelector('#usuarios-table tbody');

listarBtn.addEventListener('click', () => {
  fetch('http://localhost:3000/usuario') 
    .then(resp => {
      if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
      return resp.json();
    })
    .then(usuarios => {
      tabelaUsuarios.innerHTML = ''; // Limpa a tabela antes de preencher

      usuarios.forEach(usuario => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.firstName} ${usuario.lastName}</td>
          <td>${usuario.age}</td>
          <td>${usuario.email}</td>
          <td>${usuario.telefone}</td>
          <td>${usuario.address}</td>
          <td>${usuario.city}</td>
          <td>${usuario.state}</td>
          <td>${usuario.birthDate}</td>
        `;
        tabelaUsuarios.appendChild(linha);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar usuários:', err);
      tabelaUsuarios.innerHTML = `<tr><td colspan="9">Erro ao carregar usuários.</td></tr>`;
    });
});