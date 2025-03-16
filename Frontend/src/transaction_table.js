function loadTransactions() {
    fetch('/transactionTable')
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';
        data.transactions.forEach(tx => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${tx.date}</td>
                <td>${tx.name}</td>
                <td>${tx.category}</td>
                <td>${tx.value > 0 ? '+' : ''}${tx.value}€</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton_${index}" data-bs-toggle="dropdown" aria-expanded="false">
                            ⋮
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton_${index}">
                            <li><a class="dropdown-item" href="#">Bearbeiten</a></li>
                            <li><a class="dropdown-item" href="#">Löschen</a></li>
                        </ul>
                    </div>
                </td>`;
            tbody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error while loading transactions:', error));
}
document.addEventListener('DOMContentLoaded', loadTransactions);