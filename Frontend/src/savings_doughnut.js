function updateSavingsDoughnut() {
  const yearButton = document.getElementById('dropdownMenuButtonJahr');
  const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
  const selectedYear = yearButton ? yearButton.innerText.trim() : '';
  // Hier wird der aktuell ausgewählte Zeitraum aus dem data-Attribut gelesen
  const selectedPeriod = periodButton ? periodButton.getAttribute('data-selected') : '';

  let url = `/savingsDoughnut?year=${selectedYear}`;
  if (selectedPeriod !== 'Ganzes Jahr') {
    const months = {
      'Januar': '01',
      'Februar': '02',
      'März': '03',
      'April': '04',
      'Mai': '05',
      'Juni': '06',
      'Juli': '07',
      'August': '08',
      'September': '09',
      'Oktober': '10',
      'November': '11',
      'Dezember': '12'
    };
    const monthNum = months[selectedPeriod];
    url += `&month=${monthNum}`;
  }

  console.log("selectedYear:", selectedYear, "selectedPeriod:", selectedPeriod);
  console.log("Fetching URL:", url);

  fetch(url)
    .then(response => response.json())
    .then(result => {
      const backgroundColors = [
        'rgb(23, 37, 84)',
        'rgb(30, 64, 175)',
        'rgb(37, 99, 235)',
        'rgb(96, 165, 250)',
        'rgb(191, 219, 254)',
      ];

      // Bestehende Chart-Instanz zerstören, falls vorhanden
      if (window.savingsChart) {
        window.savingsChart.destroy();
      }
      
      const ctx = document.getElementById('savings_doughnut').getContext('2d');
      window.savingsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: result.labels,
          datasets: [{
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
            }, 
            
          }
        }
      });
      
      // Legende aktualisieren
      const legendContainer = document.getElementById('savings_doughnut_legend');
      const dataValues = window.savingsChart.data.datasets[0].data;
      const total = dataValues.reduce((acc, val) => acc + val, 0);
      const legendItems = window.savingsChart.data.labels.map((label, index) => {
        const bgColor = window.savingsChart.data.datasets[0].backgroundColor[index];
        const value = dataValues[index];
        return `
          <li class="d-flex align-items-center mb-2">
            <span style="display:inline-block;width:20px;height:20px;background-color:${bgColor};margin-right:10px;"></span>
            <span class="me-auto">${label}</span>
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
}

// Initialer Aufruf
document.addEventListener('DOMContentLoaded', function() {
  updateSavingsDoughnut();
});
