document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('spendings_doughnut').getContext('2d');
  const myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Gehalt', 'Dividenden', 'Geschenke', 'Rückerstattung'],
      datasets: [{
        label: 'Statistik',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false  // Standardlegende ausblenden
        }
      }
    }
  });

  // Den Container für die benutzerdefinierte Legende holen
  const legendContainer = document.getElementById('spendings_doughnut_legend');
  // Datenwerte aus dem ersten Datensatz
  const dataValues = myDoughnutChart.data.datasets[0].data;
  // Gesamtsumme berechnen
  const total = dataValues.reduce((acc, val) => acc + val, 0);

  // Für jedes Label einen Listeneintrag erstellen
  const legendItems = myDoughnutChart.data.labels.map((label, index) => {
    const bgColor = myDoughnutChart.data.datasets[0].backgroundColor[index];
    const value = dataValues[index];
    return `
      <li class="d-flex align-items-center mb-2">
        <span style="display:inline-block;width:20px;height:20px;background-color:${bgColor};margin-right:10px;"></span>
        <span class="me-auto">${label}</span>
        <span>${value.toLocaleString()}</span>
      </li>
    `;
  });

  // Gesamte Liste inklusive einer Total-Zeile zusammenbauen
  legendContainer.innerHTML = `
    <ul class="list-unstyled m-0">
      ${legendItems.join('')}
      <hr class="my-2" />
      <li class="d-flex fw-bold">
        <span class="me-auto">Total</span>
        <span>${total.toLocaleString()}</span>
      </li>
    </ul>
  `;
});
