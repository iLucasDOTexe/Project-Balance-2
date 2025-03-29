function updateSpendingsDoughnut() {
    const yearButton = document.getElementById('dropdownMenuButtonJahr');
    const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
    const selectedYear = yearButton ? yearButton.innerText.trim() : '';
    // Hier lesen wir den aktuell ausgewählten Zeitraum aus dem data-Attribut aus
    const selectedPeriod = periodButton ? periodButton.getAttribute('data-selected') : '';
  
    let url = `/spendingsDoughnut?year=${selectedYear}`;
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
          'rgb(69, 10, 10)',
          'rgb(127, 29, 29)',
          'rgb(153, 27, 27)',
          'rgb(185, 28, 28)',
          'rgb(220, 38, 38)',
          'rgb(239, 68, 68)',
          'rgb(251, 113, 133)',
          'rgb(76, 5, 25)',
          'rgb(136, 19, 55)',
          'rgb(159, 18, 57)',
          'rgb(190, 18, 60)',
          'rgb(225, 29, 72)',
          'rgb(244, 63, 94)',
          'rgb(251, 113, 133)',
          'rgb(80, 7, 36)'
        ];
  
        // Zerstöre vorhandene Chart-Instanz, falls vorhanden
        if (window.spendingsChart) {
          window.spendingsChart.destroy();
        }
        
        const ctx = document.getElementById('spendings_doughnut').getContext('2d');
        window.spendingsChart = new Chart(ctx, {
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
        
        // Aktualisiere die Legende
        const legendContainer = document.getElementById('spendings_doughnut_legend');
        const dataValues = window.spendingsChart.data.datasets[0].data;
        const total = dataValues.reduce((acc, val) => acc + val, 0);
        
        const legendItems = window.spendingsChart.data.labels.map((label, index) => {
          const bgColor = window.spendingsChart.data.datasets[0].backgroundColor[index];
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
      .catch(error => console.error('Error loading spendings data:', error));
  }
  
  // Initialen Aufruf sicherstellen
  document.addEventListener('DOMContentLoaded', function() {
    updateSpendingsDoughnut();
  });
  