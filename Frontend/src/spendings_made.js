function loadSpendingsMade() {
    fetch('/spendingsMade')
        .then(response => response.json())
        .then(data => {
            console.log("Spendings made:", data);
            const absoluteFormatted = Number(data.absolute).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€';
            const relativeFormatted = '(' + Number(data.relative).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%)';
            document.getElementById('absoluteSpendings').textContent = absoluteFormatted;
            document.getElementById('relativeSpendings').textContent = relativeFormatted;
        })
        .catch(error => console.error("Error loading spendings made:", error));
}
document.addEventListener('DOMContentLoaded', loadSpendingsMade);
  