const balance = document.querySelector('#balance')
const money_plus = document.querySelector('#money-plus')
const money_minus = document.querySelector('#money-minus')
const list = document.querySelector('#list')
const form = document.querySelector('#form')
const text = document.querySelector('#text')
const amount = document.querySelector('#amount')


// const dummyTransactions = [
//     { id: 1, text: 'flower', amount: -20 },
//     { id: 2, text: 'book', amount: -30 },
//     { id: 3, text: 'salary', amount: 300 },
//     { id: 4, text: 'laptop', amount: 150 }
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))


let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



//add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction)

        addTransactionDOM(transaction)

        updateValues();


        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// generate random id
function generateID() {
    return Math.floor(Math.random() * 100000000)
}

// add transactions to dom list
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id
        })">x</button>
    `

    list.appendChild(item);

}

// update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// fucntion remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}


// update localstorage transaction'
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}


//init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();



form.addEventListener('submit', addTransaction)