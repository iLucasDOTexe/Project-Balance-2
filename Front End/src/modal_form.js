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
    event.preventDefault();
    const parts = ModalForm.inputDate.value.split('.');
    const formData = {
        transactionType: ModalForm.transactionSelection.value,
        name: ModalForm.inputTitle.value,
        category: ModalForm.categorySelection.value,
        date: `${parts[2]}-${parts[1]}-${parts[0]}`,
        value: ModalForm.inputAmount.value.replace(',', '.'),
        taxational_relevant: checkbox.value
    };
    const jsonData = JSON.stringify(formData);

    fetch('http://localhost:4444/v1/newTransaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}