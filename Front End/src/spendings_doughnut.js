document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('spendings_doughnut').getContext('2d');
  const myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Mobili.', 'Heimunt.', 'Ausgehen', 'Freizeit', 'Wohnen', 'Versich.', 'Lebensh.', 'Telekom.', 'Mediena.', 'Philant.', 'Finanzk.', 'Urlaub', 'Bildung', 'Auswand.', 'Sonstig.'],
      datasets: [{
        label: 'Statistik',
        data: [12000.00, 11190.00, 11350.54, 11575.46, 70100.00, 11100.50, 81111.11, 11115.000, 61111.11, 11119.11, 22222.44, 11111.88, 14563.27, 21111.11, 11114.89],
        backgroundColor: [
          'rgb(69, 10, 10)',
          'rgb(127, 29, 29)',
          'rgb(153, 27, 27)',
          'rgb(185, 28, 28)',
          'rgb(220, 38, 38)',
          'rgb(239, 68, 68)',
          'rgb(248, 113, 113)',
          'rgb(76, 5, 25)',
          'rgb(136, 19, 55)',
          'rgb(159, 18, 57)',
          'rgb(190, 18, 60)',
          'rgb(225, 29, 72)',
          'rgb(244, 63, 94)',
          'rgb(251, 113, 133)',
          'rgb(80, 7, 36)'
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
