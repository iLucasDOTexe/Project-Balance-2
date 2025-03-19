document.addEventListener('DOMContentLoaded', function() {
  // Hole die Daten von unserem API-Endpunkt
  fetch('/incomeData')
    .then(response => response.json())
    .then(result => {
      // Beispiel: Falls du feste Hintergrundfarben für bestimmte Kategorien verwenden möchtest,
      // kannst du hier die Reihenfolge festlegen. Ansonsten werden die Farben in der Reihenfolge des API-Ergebnisses übernommen.
      const backgroundColors = [
        'rgb(5, 46, 22)',
        'rgb(20, 83, 45)',
        'rgb(22, 101, 52)',
        'rgb(21, 128, 61)',
        'rgb(22, 163, 74)',
        'rgb(34, 197, 94)'
      ];
      
      // Erstelle den Doughnut-Chart mit den dynamisch geladenen Daten
      const ctx = document.getElementById('income_doughnut').getContext('2d');
      const myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: result.labels, // Dynamische Labels aus der DB
          datasets: [{
            label: 'Statistik',
            data: result.data,   // Dynamische Daten aus der DB
            backgroundColor: backgroundColors,
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
      const dataValues = myDoughnutChart.data.datasets[0].data;
      const total = dataValues.reduce((acc, val) => acc + val, 0);
      
      const legendItems = myDoughnutChart.data.labels.map((label, index) => {
        const bgColor = myDoughnutChart.data.datasets[0].backgroundColor[index];
        const value = dataValues[index];
        return `
          <li class="d-flex align-items-center mb-2">
            <!-- Farbkasten -->
            <span style="display:inline-block;width:20px;height:20px;background-color:${bgColor};margin-right:10px;"></span>
            <!-- Label links -->
            <span class="me-auto">${label}</span>
            <!-- Wert rechts -->
            <span>${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </li>`;
      });
      
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
      
    })
    .catch(error => console.error('Error loading income data:', error));
});
