function loadTransactions() {
    // Werte aus den Dropdown-Buttons auslesen
    const yearButton = document.getElementById('dropdownMenuButtonJahr');
    const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
    const selectedYear = yearButton ? yearButton.innerText.trim() : '';
    const selectedPeriod = periodButton ? periodButton.innerText.trim() : '';
  
    // Falls "Ganzes Jahr" ausgewählt wurde, wird kein Monat gefiltert
    let url = `/transactionTable?year=${selectedYear}`;
    if (selectedPeriod !== 'Ganzes Jahr') {
      // Umwandlung des deutschen Monatsnamens in eine zweistellige Monatszahl
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
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';
        data.transactions.forEach((tx, index) => {
          const valueFormatted = Number(tx.value).toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${tx.date}</td>
            <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">${tx.name}</td>
            <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">${tx.category}</td>
            <td>${valueFormatted}€</td>
            <td>
              <div class="dropdown">
                <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton_${index}" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton_${index}">
                  <li><a class="dropdown-item" href="#">Bearbeiten</a></li>
                  <li><a class="dropdown-item" href="#" onclick="deleteTransaction(${tx.id}, '${tx.transactionType}')">Löschen</a></li>
                </ul>
              </div>
            </td>`;
          tbody.appendChild(tr);
        });
      })
      .catch(error => console.error('Error while loading transactions:', error));
  }
  
  document.addEventListener('DOMContentLoaded', loadTransactions);
  