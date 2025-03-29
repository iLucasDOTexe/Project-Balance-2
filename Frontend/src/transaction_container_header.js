function updateTransactionsHeading() {
    const yearButton = document.getElementById('dropdownMenuButtonJahr');
    const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
    const selectedYear = yearButton ? yearButton.innerText.trim() : '';
    // Den ausgewählten Zeitraum aus dem data-Attribut abrufen:
    const selectedPeriod = periodButton ? periodButton.getAttribute('data-selected') : '';
    const heading = document.getElementById('transactionsContainerHeader');
    heading.textContent = `Transaktionen - ${selectedYear} [${selectedPeriod}]`;
  }
  