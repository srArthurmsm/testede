const maxItems = 10;

document.getElementById('gerarGraficos').addEventListener('click', async () => {
  const startId = Number(document.getElementById('startId').value);
  const endId = Number(document.getElementById('endId').value);

  if (isNaN(startId) || isNaN(endId) || startId > endId) {
    alert('IDs inválidos');
    return;
  }

  // Limita a no máximo 10 itens
  const maxRange = Math.min(endId - startId + 1, maxItems);

  // Fetch produtos
  const productPromises = [];
  for (let i = startId; i <= endId && productPromises.length < maxItems; i++) {
    productPromises.push(fetch(`https://dummyjson.com/products/${i}`).then(res => res.json()));
  }
  const products = await Promise.all(productPromises);

  const productLabels = products.map(p => p.title);
  const productStock = products.map(p => p.stock);

  // Fetch usuários
  const userPromises = [];
  for (let i = startId; i <= endId && userPromises.length < maxItems; i++) {
    userPromises.push(fetch(`https://dummyjson.com/users/${i}`).then(res => res.json()));
  }
  const users = await Promise.all(userPromises);

  const userLabels = users.map(u => `${u.firstName} ${u.lastName}`);
  const userAges = users.map(u => u.age);

  // Criar os gráficos
  renderChart('productChart', 'Produtos x Estoque', productLabels, productStock, 'Estoque');
  renderChart('userChart', 'Usuários x Idade', userLabels, userAges, 'Idade');
});

function renderChart(canvasId, title, labels, data, label) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  
  // Destroi gráfico anterior se existir
  if (window[canvasId + 'Instance']) {
    window[canvasId + 'Instance'].destroy();
  }

  window[canvasId + 'Instance'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}