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
      updateStatisticsHeading()
    });
  });
});
