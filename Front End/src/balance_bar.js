document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('balance_bar').getContext('2d');
  
    const trackedBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Income',
            data: [7500, 7100, 7200, 7300, 7400, 7600, 7700, 7800, 7850, 7900, 8000, 8100],
            backgroundColor: 'rgba(76, 175, 80, 0.6)', // Grün
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1,
            stack: 'Stack 1' // eigener Stack
          },
          {
            label: 'Expenses',
            data: [3000, 2800, 3200, 3100, 3500, 3800, 3700, 3900, 4000, 4200, 4100, 4050],
            backgroundColor: 'rgba(244, 67, 54, 0.6)', // Rot
            borderColor: 'rgba(244, 67, 54, 1)',
            borderWidth: 1,
            stack: 'Stack 2' // geteilter Stack mit "Savings"
          },
          {
            label: 'Savings',
            data: [4500, 4300, 4000, 4200, 3900, 3800, 4000, 3900, 3850, 3700, 3900, 4050],
            backgroundColor: 'rgba(33, 150, 243, 0.6)', // Blau
            borderColor: 'rgba(33, 150, 243, 1)',
            borderWidth: 1,
            stack: 'Stack 2' // geteilter Stack mit "Expenses"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: false // X-Achse NICHT stapeln
          },
          y: {
            stacked: true  // Y-Achse stapeln => Balken übereinander
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  });
  