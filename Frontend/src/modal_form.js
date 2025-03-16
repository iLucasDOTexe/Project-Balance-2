const ModalForm = document.forms.ModalForm;
const checkbox = document.getElementById('taxationCheck')
const categories = {
    income: [
        {value: 'salary', text: 'Gehalt'},
        {value: 'presents', text: 'Geschenke'},
        {value: 'sells', text: 'Verkäufe'},
        {value: 'tax-return', text: 'Steuerrückerstattung'}
    ],
    savings: [
        {value: 'emergency-fund', text: 'Notgroschen'},
        {value: 'fun-fund', text: 'Spaßkonto'},
        {value: 'stock-market', text: 'Aktien & ETFs'},
        {value: 'crypto', text: 'Krypto'},
        {value: 'gold', text: 'Gold'}
    ],
    spendings: [
        {value: 'mobility', text: 'Mobilität'},
        {value: 'home-entertainment', text: 'Heimunterhaltung'},
        {value: 'going-out', text: 'Ausgehen'},
        {value: 'sport-activities', text: 'Sportaktivitäten'},
        {value: 'real-estate', text: 'Wohnen'},
        {value: 'insurance', text: 'Versicherungen'},
        {value: 'cost-of-living', text: 'Lebenshaltung'},
        {value: 'telecommunication', text: 'Telekommunikation'},
        {value: 'media-subscription', text: 'Medienabos'},
        {value: 'philanthropy', text: 'Philantropie'},
        {value: 'financial-cost', text: 'Finanzkosten'},
        {value: 'vacation', text: 'KUrlaubrypto'},
        {value: 'education', text: 'Bildung'},
        {value: 'emigration', text: 'Auswanderung'},
        {value: 'other', text: 'Sonstiges'}
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const modalForm = document.forms.ModalForm;
    const transactionSelect = modalForm.transactionSelection;
    const categorySelect = modalForm.categorySelection;

    transactionSelect.addEventListener('change', e => {
        let selectedType = e.target.value;
        categorySelect.innerHTML = '';
        if (categories[selectedType] && categories[selectedType].length > 0) {
            categories[selectedType].forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.value;
                option.textContent = cat.text;
                categorySelect.appendChild(option);
            });
            categorySelect.disabled = false;
        } else {
            categorySelect.disabled = true;
        }
    });
    const event = new Event('change');
    transactionSelect.dispatchEvent(event);
});

checkbox.addEventListener('change', e => {
    if (e.currentTarget.checked) {
        checkbox.value = 1
    }
    else {
        checkbox.value = 0
    }
});

function sendFormData(event) {
    event.preventDefault(); // Standard-Formularübermittlung unterbinden
  
    const form = document.getElementById('ModalForm');
    const transactionType = form.transactionSelection.value; // "income" oder "spendings" (ggf. auch "savings")
    const transactionName = document.getElementById('inputTitle').value;
    const transactionDate = document.getElementById('inputDate').value;
    const transactionValue = parseFloat(document.getElementById('inputAmount').value);
    const transactionCategory = form.categorySelection.value; // Kann bei "income" deaktiviert sein
    //const taxation = document.getElementById('taxationCheck').checked ? 1 : 0;
  
    // Daten-Objekt zusammenstellen
    const data = {
      transactionType,
      transactionName,
      transactionDate,
      transactionValue,
      transactionCategory,
      //taxation
    };
  
    // Senden der Daten an den API-Endpunkt /transaction
    fetch('/newTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Erfolgreich:', result);
      // Hier können Sie z. B. das Formular zurücksetzen oder eine Erfolgsmeldung anzeigen.
    })
    .catch(error => {
      console.error('Fehler:', error);
    });
  }