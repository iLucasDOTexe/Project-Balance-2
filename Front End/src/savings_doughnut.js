document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('savings_doughnut').getContext('2d');
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
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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

  // Eigene Legende erstellen
  const legendContainer = document.getElementById('savings_doughnut_legend');
  const legendItems = myDoughnutChart.data.labels.map((label, index) => {
    const bgColor = myDoughnutChart.data.datasets[0].backgroundColor[index];
    return `<li class="d-flex align-items-center mb-2">
              <span style="display:inline-block;width:20px;height:20px;background-color:${bgColor};margin-right:10px;"></span>
              ${label}
            </li>`;
  });
  legendContainer.innerHTML = `<ul class="list-unstyled">${legendItems.join('')}</ul>`;
});