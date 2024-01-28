document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'e8acad33ff9b95e95a78c4c9';
    const baseCurrencySelect = document.getElementById('base-currency');
    const targetCurrencySelect = document.getElementById('target-currency');

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
    .then(response => response.json())
    .then(data => {
        const currencies = data.supported_codes;
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency[0];
            option.textContent = `${currency[1]} (${currency[0]})`;
            baseCurrencySelect.appendChild(option.cloneNode(true));
            targetCurrencySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching currencies:', error));
});

document.getElementById('converter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const baseCurrency = document.getElementById('base-currency').value;
    const targetCurrency = document.getElementById('target-currency').value;
    const apiKey = 'e8acad33ff9b95e95a78c4c9';

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}/${amount}`)
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById('result');
        result.textContent = `${amount} ${baseCurrency} = ${data.conversion_result} ${targetCurrency}`;
    })
    .catch(error => console.error('Error converting currency:', error));
});