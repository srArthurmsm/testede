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
