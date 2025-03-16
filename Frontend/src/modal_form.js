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