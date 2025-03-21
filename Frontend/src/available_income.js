function loadAvailableIncome() {
    // Werte aus den Dropdown-Buttons auslesen
    const yearButton = document.getElementById('dropdownMenuButtonJahr');
    const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
    const selectedYear = yearButton ? yearButton.innerText.trim() : '';
    const selectedPeriod = periodButton ? periodButton.innerText.trim() : '';
  
    // Baue die URL mit dem Jahr-Parameter auf
    let url = `/availableIncome?year=${selectedYear}`;
  
    // Falls nicht "Ganzes Jahr" ausgewählt wurde, auch den Monat übergeben
    if (selectedPeriod && selectedPeriod !== 'Ganzes Jahr') {
      // Mapping von deutschen Monatsnamen zu zweistelligen Monatszahlen
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
        console.log("Available income:", data);
        const absoluteFormatted = Number(data.absolute).toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + '€';
        const relativeFormatted = '(' + Number(data.relative).toLocaleString('de-DE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + '%)';
        document.getElementById('absoluteIncome').textContent = absoluteFormatted;
        document.getElementById('relativeIncome').textContent = relativeFormatted;
      })
      .catch(error => console.error("Error loading available income:", error));
  }
  
  document.addEventListener('DOMContentLoaded', loadAvailableIncome);
  