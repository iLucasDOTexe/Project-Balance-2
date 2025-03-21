// Beispiel: Alle Dropdown-Items für das Jahr
document.querySelectorAll('.dropdown-menu[aria-labelledby="dropdownMenuButtonJahr"] .dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      const yearButton = document.getElementById('dropdownMenuButtonJahr');
      yearButton.innerText = this.textContent.trim();
      loadTransactions();
      loadAvailableIncome(); // Hier wird auch das verfügbare Einkommen neu geladen
    });
  });
  
  // Beispiel: Alle Dropdown-Items für den Zeitraum
  document.querySelectorAll('.dropdown-menu[aria-labelledby="dropdownMenuButtonZeitraum"] .dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
      periodButton.innerText = this.textContent.trim();
      loadTransactions();
      loadAvailableIncome(); // Auch hier wird das verfügbare Einkommen neu geladen
    });
  });
  