document.addEventListener('DOMContentLoaded', function() {
  // Jahr-Dropdown
  const yearButton = document.getElementById('dropdownMenuButtonJahr');
  const yearDropdownItems = document.querySelectorAll('.dropdown-menu[aria-labelledby="dropdownMenuButtonJahr"] .dropdown-item');
  yearDropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedValue = this.textContent.trim();
      console.log("Jahr ausgewählt:", selectedValue);
      yearButton.innerText = selectedValue;
      yearButton.setAttribute('data-selected', selectedValue);
      loadTransactions();          // Tabelle aktualisieren
      updateIncomeDoughnut();        // Income-Doughnut aktualisieren
      updateSpendingsDoughnut();     // Spendings-Doughnut aktualisieren
      updateSavingsDoughnut();       // Savings-Doughnut aktualisieren
      updateBalanceBar();
    });
  });

  // Zeitraum-Dropdown
  const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
  const periodDropdownItems = document.querySelectorAll('.dropdown-menu[aria-labelledby="dropdownMenuButtonZeitraum"] .dropdown-item');
  periodDropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedValue = this.textContent.trim();
      console.log("Zeitraum ausgewählt:", selectedValue);
      periodButton.innerText = selectedValue;
      periodButton.setAttribute('data-selected', selectedValue);
      loadTransactions();          // Tabelle aktualisieren
      updateIncomeDoughnut();        // Income-Doughnut aktualisieren
      updateSpendingsDoughnut();     // Spendings-Doughnut aktualisieren
      updateSavingsDoughnut();       // Savings-Doughnut aktualisieren
      updateBalanceBar();
    });
  });
});
