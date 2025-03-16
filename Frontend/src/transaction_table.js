function loadTransactions() {
    fetch('/transactions')
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
                <td>⋮</td>`;
            tbody.body.appendChild(tr);
        });
    })
    .catch(error => console.error('Error while loading transactions:', error));
}
document.addEventListener('DOMContentLoaded', loadTransactions);