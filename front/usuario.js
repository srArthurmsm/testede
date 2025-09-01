
let cardLote = document.getElementById('cardLote')

cardLote.addEventListener('click', (e)=>{
  e.preventDefault()
  valores = []
  fetch('https://dummyjson.com/users')
  .then(resp => resp.json())
  .then(dadosDummy => {
      console.log(dadosDummy.users)
      dadosDummy.users.forEach(dad => {
        const val = {
          firstName: dad.firstName,
          lastName: dad.lastName,
          age: dad.age,
          email: dad.email,
          phone: dad.phone,
          address: dad.address.address,
          city: dad.address.city,
          state: dad.address.state,
          birthDate: dad.birthDate
        }
          valores.push(val)
      })
      console.log(valores)
      console.log('-------------')

      fetch(`http://localhost:3000/usuario/lote`,{
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



let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const valores = {
        firstName: document.getElementById('nome').value,
        lastName: document.getElementById('sobrenome').value,
        age: Number(document.getElementById('idade').value),
        email: document.getElementById('email').value,
        phone: Number(document.getElementById('telefone').value),
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
    .then(resp => resp.json())
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
    .then(resp => resp.json())
    .then(usuarios => {

      tabelaUsuarios.innerHTML = '';

      usuarios.forEach(usuario => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.firstName} ${usuario.lastName}</td>
          <td>${usuario.age}</td>
          <td>${usuario.email}</td>
          <td>${usuario.phone}</td>
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

const res2 = document.getElementById('res2');
const atualizarBtn = document.getElementById('atualizar');

atualizarBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const id = document.getElementById('ID').value;

  const valores = {
    firstName: document.getElementById('nome2').value,
    lastName: document.getElementById('sobrenome2').value,
    age: Number(document.getElementById('idade2').value),
    email: document.getElementById('email2').value,
    phone: Number(document.getElementById('telefone2').value),
    address: document.getElementById('endereco2').value,
    city: document.getElementById('cidade2').value,
    state: document.getElementById('estado2').value,
    birthDate: document.getElementById('nascimento2').value
  };

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(valores)
  })
    .then(resp => resp.json())
    .then(dados => {
      res.innerHTML = `<p style="color:green;">Usuário atualizado</p>`;
    })
    .catch(err => {
      console.error('Erro', err);
      res2.innerHTML = `<p style="color:red;">Erro ao atualizar o usuário.</p>`;
    });
});

const res3 = document.getElementById('res3');
const apagarBtn = document.getElementById('apagar');

apagarBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    const id = document.getElementById('ID2').value
  
    fetch(`http://localhost:3000/usuario/${id}`, {
      method: 'DELETE'
    })
      .then(resp => resp.json())
      .then(() => {
        res3.innerHTML = `<p style="color:green;">Usuário apagado</p>`;
      })
      .catch(err => {
        console.error('Erro', err);
        res3.innerHTML = `<p style="color:red;">Erro`;
      });
  });

let achar = document.getElementById('achar')

const tabelaUsuarios2 = document.getElementById('usuarios-table2');
achar.addEventListener('click', (e) => {
    e.preventDefault();
  
    const id = document.getElementById('ID3').value
  
    fetch(`http://localhost:3000/usuario/id/${id}`)
      .then(resp => resp.json())
      .then(usuario => {
        tabelaUsuarios2.innerHTML = '';
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.firstName} ${usuario.lastName}</td>
          <td>${usuario.age}</td>
          <td>${usuario.email}</td>
          <td>${usuario.phone}</td>
          <td>${usuario.address}</td>
          <td>${usuario.city}</td>
          <td>${usuario.state}</td>
          <td>${usuario.birthDate}</td>
        `;
        tabelaUsuarios2.appendChild(linha);
      })
      .catch(err => {
        console.error('Erro', err);
      });
  });

  let achar2 = document.getElementById('achar2')

  const tabelaUsuarios3 = document.getElementById('usuarios-table3');
  achar2.addEventListener('click', (e) => {
      e.preventDefault();
    
      const nome = document.getElementById('nome3').value
    
      fetch(`http://localhost:3000/usuario/nome/${nome}`)
        .then(resp => resp.json())
        .then(usuario => {
          tabelaUsuarios3.innerHTML = '';
          const linha = document.createElement('tr');
          linha.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.firstName} ${usuario.lastName}</td>
            <td>${usuario.age}</td>
            <td>${usuario.email}</td>
            <td>${usuario.phone}</td>
            <td>${usuario.address}</td>
            <td>${usuario.city}</td>
            <td>${usuario.state}</td>
            <td>${usuario.birthDate}</td>
          `;
          tabelaUsuarios3.appendChild(linha);
        })
        .catch(err => {
          console.error('Erro', err);
        });
    });