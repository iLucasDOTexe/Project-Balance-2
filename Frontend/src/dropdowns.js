document.addEventListener('DOMContentLoaded', function() {
    // Jahr-Dropdown
    const yearButton = document.getElementById('dropdownMenuButtonJahr');
    const yearDropdown = yearButton.parentElement.querySelector('.dropdown-menu');
    if (yearDropdown) {
      yearDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item')) {
          console.log("Jahr ausgewählt:", e.target.textContent.trim());
          yearButton.innerText = e.target.textContent.trim();
          loadTransactions();
        }
      });
    }
    
    // Zeitraum-Dropdown
    const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
    const periodDropdown = periodButton.parentElement.querySelector('.dropdown-menu');
    if (periodDropdown) {
      periodDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item')) {
          console.log("Zeitraum ausgewählt:", e.target.textContent.trim());
          periodButton.innerText = e.target.textContent.trim();
          loadTransactions();
        }
      });
    }
  });
  