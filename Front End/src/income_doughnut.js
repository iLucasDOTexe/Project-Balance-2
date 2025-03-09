document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('income_doughnut').getContext('2d');
  const myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Gehalt', 'Dividenden', 'Geschenke', 'Rückerstattung', 'Verkäufe', 'Sonstige'],
      datasets: [{
        label: 'Statistik',
        data: [31224.91, 13884.15, 20880.00, 37749.48, 25885.00, 11500.00],
        backgroundColor: [
          'rgb(5, 46, 22)',
          'rgb(20, 83, 45)',
          'rgb(22, 101, 52)',
          'rgb(21, 128, 61)',
          'rgb(22, 163, 74)',
          'rgb(34, 197, 94)'
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

  // Eigene Legende erstellen
  const legendContainer = document.getElementById('income_doughnut_legend');

// Daten aus dem ersten Datensatz holen
const dataValues = myDoughnutChart.data.datasets[0].data;

// Summe der Werte berechnen
const total = dataValues.reduce((acc, val) => acc + val, 0);

// Für jedes Label einen Listeneintrag erzeugen (mit Farbkästchen, Label und Wert)
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