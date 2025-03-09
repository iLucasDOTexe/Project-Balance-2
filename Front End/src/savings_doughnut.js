document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('savings_doughnut').getContext('2d');
  const myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Notgroschen', 'Spaßkonto', 'Aktien & ETFs', 'Krypto', 'Gold'],
      datasets: [{
        label: 'Statistik',
        data: [18800.00, 19888.88, 31245.87, 50000.85, 50000.48],
        backgroundColor: [
          'rgb(23, 37, 84)',
          'rgb(30, 64, 175)',
          'rgb(37, 99, 235)',
          'rgb(96, 165, 250)',
          'rgb(191, 219, 254)',
        ],
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
  const legendContainer = document.getElementById('savings_doughnut_legend');
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
      <!-- Farbkasten -->
      <span
        style="display:inline-block;width:20px;height:20px;background-color:${bgColor};margin-right:10px;">
      </span>
      <!-- Label links -->
      <span class="me-auto">${label}</span>
      <!-- Wert rechts -->
      <span>${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </li>`;
});

// Liste zusammenbauen und Gesamtsumme anhängen
legendContainer.innerHTML = `
  <ul class="list-unstyled m-0">
    ${legendItems.join('')}
    <hr class="my-2" />
    <li class="d-flex fw-bold">
      <span class="me-auto">Total</span>
      <span>${total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </li>
  </ul>
`;
});
