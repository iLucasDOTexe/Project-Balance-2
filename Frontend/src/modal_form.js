const ModalForm = document.forms.ModalForm;
const checkbox = document.getElementById('taxationCheck')
const inputTitle = document.getElementById('inputTitle');
const categories = {
    income: [
        {value: 'Gehalt', text: 'Gehalt'},
        {value: 'Geschenke', text: 'Geschenke'},
        {value: 'Verkäufe', text: 'Verkäufe'},
        {value: 'Steuerrückerstattung', text: 'Steuerrückerstattung'}
    ],
    savings: [
        {value: 'Notgroschen', text: 'Notgroschen'},
        {value: 'Spaßkonto', text: 'Spaßkonto'},
        {value: 'Aktien & ETFs', text: 'Aktien & ETFs'},
        {value: 'Krypto', text: 'Krypto'},
        {value: 'Gold', text: 'Gold'}
    ],
    spendings: [
        {value: 'Mobilität', text: 'Mobilität'},
        {value: 'Heimunterhaltung', text: 'Heimunterhaltung'},
        {value: 'Ausgehen', text: 'Ausgehen'},
        {value: 'Sportaktivitäten', text: 'Sportaktivitäten'},
        {value: 'Wohnen', text: 'Wohnen'},
        {value: 'Versicherungen', text: 'Versicherungen'},
        {value: 'Lebenshaltung', text: 'Lebenshaltung'},
        {value: 'Telekommunikation', text: 'Telekommunikation'},
        {value: 'Medienabos', text: 'Medienabos'},
        {value: 'Philantropie', text: 'Philantropie'},
        {value: 'Finanzkosten', text: 'Finanzkosten'},
        {value: 'Urlaub', text: 'Urlaub'},
        {value: 'Bildung', text: 'Bildung'},
        {value: 'Auswanderung', text: 'Auswanderung'},
        {value: 'Sonstiges', text: 'Sonstiges'}
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const modalForm = document.forms.ModalForm;
    const transactionSelect = modalForm.transactionSelection;
    const categorySelect = modalForm.categorySelection;

    transactionSelect.addEventListener('change', e => {
        let selectedType = e.target.value;
        if (selectedType === 'income') {
            inputTitle.disabled = true;
            inputTitle.value = '';
        } else {
            inputTitle.disabled = false;
        }
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
    const rawValue = parseFloat(document.getElementById('inputAmount').value);
    const transactionCategory = form.categorySelection.value; // Kann bei "income" deaktiviert sein
    //const taxation = document.getElementById('taxationCheck').checked ? 1 : 0;
    const normalizedValue = rawValue.replace(',', '.');
    const transactionValue = parseFloat(normalizedValue);
  
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
      form.reset();
      const modalEl = document.getElementById('modal-add');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
      } else {
        new bootstrap.Modal(modalEl).hide();
      }
      window.location.reload();
    })
    .catch(error => {
      console.error('Fehler:', error);
    });
  }