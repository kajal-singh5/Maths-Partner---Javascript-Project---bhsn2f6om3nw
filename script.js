// Getting elements
const sol = document.getElementById('sol-section');
const solHeading = document.getElementById('prob-head');
const solBox = document.getElementById('prob-sol');

sol.style.display = 'none';

// Function to fetch the data and display it
async function findSol() {
    const probCat = document.getElementById('cat').value;
    const probInput = document.getElementById('prob').value;
    const probInputAdjusted = modify(probInput, probCat);

    fetch(`https://newton.vercel.app/api/v2/${probCat}/${encodeURIComponent(probInputAdjusted)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then (data => {
            sol.style.display = 'block';
            solHeading.innerHTML = `${probCat}: ${probInput}`;
            solBox.innerHTML = `Solution: ${data.result}`;
            store(data.operation, data.expression, data.result);
        })
        .catch (error => {
            console.log('Error', error);
        });
}

// Function to modify user input according to Category
function modify(input, cat) {
    let val = input;
    switch(cat) {
        case 'cos':;
        case 'sin':;
        case 'tan':;
        case 'arccos':;
        case 'arcsin':;
        case 'arctan':
            val = parseInt(input) * (Math.PI / 180);
            break;
        case 'log':
            val = `2|${input}`;
            break;
    }
    return val;
}


// Function to clear solution
function clearSol() {
    sol.style.display = 'none';
    solHeading.innerHTML = '';
    solBox.innerHTML = '';
}

// Function to save data in local storage
function store(prob, cat, res) {
    localStorage.setItem(`${prob}-${cat}`, JSON.stringify({prob, cat, res}));
}
