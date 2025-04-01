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
          plugins: {
            tooltip: {
              enabled: false,  // Standard-Tooltip ausschalten
              external: myCustomTooltip  // Eigene Funktion
            }
          }
        }        
      });      
    })
    .catch(error => console.error('Error loading monthly data:', error));
}

function myCustomTooltip(context) {
  // Tooltip-Konfiguration
  const { chart, tooltip } = context;
  
  // Falls kein Tooltip aktiv ist oder man nicht über einem Dataset schwebt:
  if (!tooltip || !tooltip.opacity || !tooltip.dataPoints?.length) {
    // Tooltipp ausblenden
    hideMyTooltipDiv();
    return;
  }
  
  // Wir holen uns den Datensatz, über dem wir gerade schweben
  const dataIndex = tooltip.dataPoints[0].dataIndex;
  const datasetIndex = tooltip.dataPoints[0].datasetIndex;
  const dataset = chart.data.datasets[datasetIndex];
  
  // Gesamtwert des Datensatzes berechnen
  const total = dataset.data.reduce((acc, val) => acc + Number(val), 0);
  const labelText = `${dataset.label}: ${total.toLocaleString('de-DE', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  })}€`;

  // Nun ein eigenes DIV befüllen/positionieren
  showMyTooltipDiv(tooltip, labelText);
}


// Initialer Aufruf
document.addEventListener('DOMContentLoaded', function() {
  updateBalanceBar();
});
