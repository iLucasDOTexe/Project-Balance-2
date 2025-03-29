function updateBalanceBar() {
  const yearButton = document.getElementById('dropdownMenuButtonJahr');
  const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
  const selectedYear = yearButton ? yearButton.innerText.trim() : '';
  // Wert aus data-Attribut, z. B. "Ganzes Jahr" oder "Mai"
  const selectedPeriod = periodButton ? periodButton.getAttribute('data-selected') : '';

  let url = `/balanceBar?year=${selectedYear}`;
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

  console.log("BalanceBar – selectedYear:", selectedYear, "selectedPeriod:", selectedPeriod);
  console.log("Fetching URL:", url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('balance_bar').getContext('2d');
      // Falls bereits ein Chart existiert, zerstören
      if (window.trackedBarChart) {
        window.trackedBarChart.destroy();
      }
      window.trackedBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Einkommen',
              data: data.income,
              backgroundColor: 'rgb(5, 46, 22)',
              stack: 'Stack 1'
            },
            {
              label: 'Ausgaben',
              data: data.expenses,
              backgroundColor: 'rgb(69, 10, 10)',
              stack: 'Stack 2'
            },
            {
              label: 'Sparen',
              data: data.savings,
              backgroundColor: 'rgb(23, 37, 84)',
              stack: 'Stack 2'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: false },
            y: { stacked: true }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                // Entfernt den Titel (x-Achsen-Beschriftung)
                title: function(context) {
                  return '';
                },
                // Baut das Label als "Kategorie: Wert€" zusammen
                label: function(context) {
                  const datasetLabel = context.dataset.label || '';
                  // Bei vertikaler Darstellung befindet sich der Wert in context.parsed.y
                  const value = context.parsed.y;
                  return datasetLabel + ': ' + value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€';
                }
              }
            }
          }
        }
      });
      
    })
    .catch(error => console.error('Error loading monthly data:', error));
}

// Initialer Aufruf
document.addEventListener('DOMContentLoaded', function() {
  updateBalanceBar();
});
