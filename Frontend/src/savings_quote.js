function loadSavingsQuote() {
    const yearButton = document.getElementById('dropdownMenuButtonJahr');
    const periodButton = document.getElementById('dropdownMenuButtonZeitraum');
    const selectedYear = yearButton ? yearButton.innerText.trim() : '';
    // Hier wird der aktuell ausgewählte Zeitraum aus dem data-Attribut gelesen
    const selectedPeriod = periodButton ? periodButton.getAttribute('data-selected') : '';
  
    let url = `/savingsQuote?year=${selectedYear}`;
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
  
    console.log("SavingsQuote – selectedYear:", selectedYear, "selectedPeriod:", selectedPeriod);
    console.log("Fetching URL:", url);
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Savings quote:", data);
        const absoluteFormatted = Number(data.absolute).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€';
        const relativeFormatted = '(' + Number(data.relative).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%)';
        document.getElementById('absoluteSavings').textContent = absoluteFormatted;
        document.getElementById('relativeSavings').textContent = relativeFormatted;
      })
      .catch(error => console.error("Error loading savings quote:", error));
  }
  
  document.addEventListener('DOMContentLoaded', loadSavingsQuote);
  