// Für das Jahr-Dropdown
document.querySelectorAll('#dropdownMenuButtonJahr + .dropdown-menu .dropdown-item')
  .forEach(item => {
    item.addEventListener('click', function() {
      const yearButton = document.getElementById('dropdownMenuButtonJahr');
      yearButton.innerText = this.textContent.trim();
      loadTransactions(); // Optional: Tabelle aktualisieren, wenn sich der Wert ändert
    });
  });

// Für das Zeitraum-Dropdown
document.querySelectorAll('#dropdownMenuButtonZeitraum + .dropdown-menu .dropdown-item')
  .forEach(item => {
    item.addEventListener('click', function() {
      const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
      periodButton.innerText = this.textContent.trim();
      loadTransactions(); // Optional: Tabelle aktualisieren, wenn sich der Wert ändert
    });
  });