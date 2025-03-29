// In income_doughnut.js
function updateIncomeDoughnut() {
  const yearButton = document.getElementById('dropdownMenuButtonJahr');
  const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
  const selectedYear = yearButton ? yearButton.innerText.trim() : '';
  // Hier wird der Wert aus dem data-Attribut ausgelesen:
  const selectedPeriod = periodButton ? periodButton.getAttribute('data-selected') : '';

  let url = `/incomeDoughnut?year=${selectedYear}`;
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
        'rgb(5, 46, 22)',
        'rgb(20, 83, 45)',
        'rgb(22, 101, 52)',
        'rgb(21, 128, 61)',
        'rgb(22, 163, 74)',
        'rgb(34, 197, 94)'
      ];

      // Bestehenden Chart zerstören, falls vorhanden
      if(window.incomeChart) {
        window.incomeChart.destroy();
      }
      
      const ctx = document.getElementById('income_doughnut').getContext('2d');
      window.incomeChart = new Chart(ctx, {
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
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.parsed;
                  return value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€';
                }
              }
            }
          }
        }
      });

      // Aktualisieren der Legende
      const legendContainer = document.getElementById('income_doughnut_legend');
      const dataValues = window.incomeChart.data.datasets[0].data;
      const total = dataValues.reduce((acc, val) => acc + val, 0);

      const legendItems = window.incomeChart.data.labels.map((label, index) => {
        const bgColor = window.incomeChart.data.datasets[0].backgroundColor[index];
        const value = dataValues[index];
        return `
          <li class="d-flex align-items-center mb-2">
            <span style="display:inline-block;width:20px;height:20px;background-color:${bgColor};margin-right:10px;"></span>
            <span class="me-auto" style="display:inline-block; width:100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${label}</span>
            <span>${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
          </li>`;
      });
      

      legendContainer.innerHTML = `
        <ul class="list-unstyled m-0">
          ${legendItems.join('')}
          <hr class="my-2" />
          <li class="d-flex fw-bold">
            <span class="me-auto">Total</span>
            <span>${total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€</span>
          </li>
        </ul>
      `;
    })
    .catch(error => console.error('Error loading income data:', error));
}

// Initialer Aufruf
document.addEventListener('DOMContentLoaded', function() {
  updateIncomeDoughnut();
});
