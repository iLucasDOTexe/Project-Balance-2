document.addEventListener('DOMContentLoaded', function() {
    // Jahr-Dropdown: Alle <a>-Elemente auswählen, die zum Jahr-Dropdown gehören
    const yearButton = document.getElementById('dropdownMenuButtonJahr');
    const yearDropdownItems = document.querySelectorAll('.dropdown-menu[aria-labelledby="dropdownMenuButtonJahr"] .dropdown-item');
    yearDropdownItems.forEach(item => {
      item.addEventListener('click', function(e) {
        console.log("Jahr ausgewählt:", this.textContent.trim());
        yearButton.innerText = this.textContent.trim();
        loadTransactions(); // Tabelle aktualisieren
      });
    });
  
    // Zeitraum-Dropdown: Alle <a>-Elemente auswählen, die zum Zeitraum-Dropdown gehören
    const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
    const periodDropdownItems = document.querySelectorAll('.dropdown-menu[aria-labelledby="dropdownMenuButtonZeitraum"] .dropdown-item');
    periodDropdownItems.forEach(item => {
      item.addEventListener('click', function(e) {
        console.log("Zeitraum ausgewählt:", this.textContent.trim());
        periodButton.innerText = this.textContent.trim();
        loadTransactions(); // Tabelle aktualisieren
      });
    });
  });
  