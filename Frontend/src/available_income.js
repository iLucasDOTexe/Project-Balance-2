function loadAvailableIncome() {
    fetch('/availableIncome')
        .then(response => response.json())
        .then(data => {
            console.log("Verfügbare Einnahmen:", data);
            const absoluteFormatted = Number(data.absolute).toFixed(2) + '€';
            const relativeFormatted = '(' + Number(data.relative).toFixed(2) + '%)';
            document.getElementById('absoluteIncome').textContent = absoluteFormatted;
            document.getElementById('relativeIncome').textContent = relativeFormatted;
        })
        .catch(error => console.error("Error loading available income:", error));
}
document.addEventListener('DOMContentLoaded', loadAvailableIncome);
  