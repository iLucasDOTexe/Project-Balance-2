function loadTaxationTransactions() {
  console.log("loadTaxationTransactions triggered");
  // Lese den gewählten Jahrwert aus dem Dropdown aus:
  const yearButton = document.getElementById('dropdownMenuButtonJahr');
  const selectedYear = yearButton ? yearButton.innerText.trim() : '';

  // Monat wird hier ignoriert:
  const url = `/taxationTransactions?year=${selectedYear}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';
      data.transactions.forEach((tx) => {
        const valueFormatted = Number(tx.value).toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${tx.date}</td>
          <td style="width: 200px;">
            <div style="display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tx.name}</div>
          </td>
          <td style="width: 200px;">
            <div style="display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tx.category}</div>
          </td>
          <td>${valueFormatted}€</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => console.error('Error while loading taxation transactions:', error));
}

// Lade die Transaktionen beim Laden der Seite:
document.addEventListener('DOMContentLoaded', loadTaxationTransactions);
