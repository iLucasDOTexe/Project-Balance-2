document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('balance_bar').getContext('2d');
  
    const trackedBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Dez', 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Income',
            data: [141123.54, 141123.54, 141123.54, 141123.54, 141123.54, 141123.54, 141123.54, 141123.54, 141123.54, 141123.54, 141123.54, 141123.54, 141123.54],
            backgroundColor: 'rgb(5, 46, 22)', 
            stack: 'Stack 1'
          },
          {
            label: 'Expenses',
            data: [371896.42, 371896.42, 371896.42, 371896.42, 371896.42, 371896.42, 371896.42, 371896.42, 371896.42, 371896.42, 371896.42, 371896.42, 371896.42],
            backgroundColor: 'rgb(69, 10, 10)',
            stack: 'Stack 2'
          },
          {
            label: 'Savings',
            data: [169936.08, 169936.08, 169936.08, 169936.08, 169936.08, 169936.08, 169936.08, 169936.08, 169936.08, 169936.08, 169936.08, 169936.08, 169936.08],
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
  });
  