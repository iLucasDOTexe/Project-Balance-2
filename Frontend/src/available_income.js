function loadAvailableIncome() {
    const yearButton = document.getElementById('dropdownMenuButtonJahr');
    const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
    const selectedYear = yearButton ? yearButton.innerText.trim() : '';
    // Wert aus data-Attribut, z.B. "Ganzes Jahr" oder "Mai"
    const selectedPeriod = periodButton ? periodButton.getAttribute('data-selected') : '';
  
    let url = `/availableIncome?year=${selectedYear}`;
    if (selectedPeriod !== 'Ganzes Jahr') {
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
  
    console.log("AvailableIncome – selectedYear:", selectedYear, "selectedPeriod:", selectedPeriod);
    console.log("Fetching URL:", url);
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Available income:", data);
        const absoluteFormatted = Number(data.absolute).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€';
        const relativeFormatted = '(' + Number(data.relative).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%)';
        document.getElementById('absoluteIncome').textContent = absoluteFormatted;
        document.getElementById('relativeIncome').textContent = relativeFormatted;
      })
      .catch(error => console.error("Error loading available income:", error));
  }
  
  document.addEventListener('DOMContentLoaded', loadAvailableIncome);
  