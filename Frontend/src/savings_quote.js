function loadSavingsQuote() {
    fetch('/savingsQuote')
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