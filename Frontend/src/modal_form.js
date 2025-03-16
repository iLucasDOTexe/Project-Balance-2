const ModalForm = document.forms.ModalForm;
const checkbox = document.getElementById('taxationCheck')

ModalForm.transactionSelection.addEventListener('change', e => {
    let form = e.target.form;
    form.categorySelection.disabled = (e.target.value == 'income');
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