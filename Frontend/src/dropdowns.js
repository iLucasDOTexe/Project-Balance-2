document.addEventListener('DOMContentLoaded', function() {
    // Jahr-Dropdown: Event Delegation direkt am <ul>
    const yearDropdown = document.querySelector('#dropdownMenuButtonJahr').nextElementSibling;
    if (yearDropdown) {
      yearDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item')) {
          const yearButton = document.getElementById('dropdownMenuButtonJahr');
          yearButton.innerText = e.target.textContent.trim();
          loadTransactions();
        }
      });
    }
  
    // Zeitraum-Dropdown: Event Delegation direkt am <ul>
    const periodDropdown = document.querySelector('#dropdownMenuButtonZeitraum').nextElementSibling;
    if (periodDropdown) {
      periodDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('dropdown-item')) {
          const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
          periodButton.innerText = e.target.textContent.trim();
          loadTransactions();
        }
      });
    }
  });
  