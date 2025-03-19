document.addEventListener('DOMContentLoaded', function() {
  fetch('/savingsDoughnut')
    .then(response => response.json())
    .then(result => {
      const backgroundColors = [
        'rgb(23, 37, 84)',
        'rgb(30, 64, 175)',
        'rgb(37, 99, 235)',
        'rgb(96, 165, 250)',
        'rgb(191, 219, 254)',
      ];
      const ctx = document.getElementById('savings_doughnut').getContext('2d');
      const myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: result.labels,
          datasets: [{
            label: 'Statistik',
            data: result.data,
            backgroundColor: backgroundColors,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
      const legendContainer = document.getElementById('savings_doughnut_legend');
      const dataValues = myDoughnutChart.data.datasets[0].data;
      const total = dataValues.reduce((acc, val) => acc + val, 0);
      const legendItems = myDoughnutChart.data.labels.map((label, index) => {
        const bgColor = myDoughnutChart.data.datasets[0].backgroundColor[index];
        const value = dataValues[index];
        return `
          <li class="d-flex align-items-center mb-2">
            <!-- Farbkasten -->
            <span style="display:inline-block;width:20px;height:20px;background-color:${bgColor};margin-right:10px;"></span>
            <!-- Label -->
            <span class="me-auto">${label}</span>
            <!-- Wert -->
            <span>${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </li>
        `;
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
    .catch(error => console.error('Error loading savings data:', error));
});
