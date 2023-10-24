// Getting elements
const historyTable = document.getElementById('tbody');

// Function to display history using local storage
function show() {
    const len = localStorage.length;
    
    if (len !== 0) {
        historyTable.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const elem = JSON.parse(localStorage.getItem(key));
            const row = document.createElement('tr');
            row.innerHTML = 
            `<td>${elem.prob}</td>
            <td>${elem.cat}</td>
            <td>${elem.res}</td>
            <td><button class="delete">Delete</button></td>`
            historyTable.appendChild(row);
        }
    }
}

show();

// Deleting a row and removing entry from local storage
historyTable.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');

        if (row) {
            const cat = row.children[0].innerHTML;
            const prob = row.children[1].innerHTML;
            const rowId = `${cat}-${prob}`;
            console.log(rowId);
            localStorage.removeItem(rowId);
            row.remove();
        }
    }
})