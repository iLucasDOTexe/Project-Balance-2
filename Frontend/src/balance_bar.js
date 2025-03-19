document.addEventListener('DOMContentLoaded', function() {
  // Hole zuerst die Daten vom neuen API-Endpunkt
  fetch('/balanceBar')
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('balance_bar').getContext('2d');
      const trackedBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels, // z. B. ['Jan', 'Feb', ... , 'Dez']
          datasets: [
            {
              label: 'Income',
              data: data.income, // Aggregierte Werte für Income pro Monat
              backgroundColor: 'rgb(5, 46, 22)', 
              stack: 'Stack 1'
            },
            {
              label: 'Expenses',
              data: data.expenses, // Aggregierte Werte für Expenses pro Monat
              backgroundColor: 'rgb(69, 10, 10)',
              stack: 'Stack 2'
            },
            {
              label: 'Savings',
              data: data.savings, // Aggregierte Werte für Savings pro Monat
              backgroundColor: 'rgb(23, 37, 84)',
              stack: 'Stack 2'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: false
            },
            y: {
              stacked: true
            }
          },
          plugins: {
            legend: {
              display: false,
            }
          }
        }
      });
    })
    .catch(error => console.error('Error loading monthly data:', error));
});