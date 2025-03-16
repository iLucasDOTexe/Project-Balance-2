function loadTransactions() {
    fetch('/transactionTable')
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';
        data.transactions.forEach((tx, index) => {
            const valueFormatted = Number(tx.value).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${tx.date}</td>
                <td>${tx.name}</td>
                <td>${tx.category}</td>
                <td>${tx.valueFormatted}€</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton_${index}" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton_${index}">
                            <li><a class="dropdown-item" href="#">Bearbeiten</a></li>
                            <li><a class="dropdown-item" href="#" onclick="deleteTransaction(${tx.id}, '${tx.transactionType}')">Löschen</a></li>
                        </ul>
                    </div>
                </td>`;
            tbody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error while loading transactions:', error));
}
document.addEventListener('DOMContentLoaded', loadTransactions);

function deleteTransaction(id, transactionType) {
    if (!confirm("Möchtest du diesen Eintrag wirklich löschen?")) return;
    fetch('/deleteTransaction', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, transactionType })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Delete successful:", data);
        loadTransactions();
    })
    .catch(error => console.error("Error deleting transaction:", error));
}