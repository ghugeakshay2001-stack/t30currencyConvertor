let fromCurrency = document.getElementById("fromCurrency")
let amount = document.getElementById("amount")
let toCurrency = document.getElementById("toCurrency")
let btn = document.getElementById("btn")
let convertedAmount = document.getElementById("convertedAmount")

async function fetchCurrencies(){

    let response = await fetch("https://api.frankfurter.dev/v1/currencies")
    let dataObject = await response.json()
    console.log(dataObject);
    let countryEntries = Object.entries(dataObject)
    console.log(countryEntries);

    for(let countryEntry of countryEntries)
    {
        fromCurrency.innerHTML+=
        `<option value = "${countryEntry[0]}">
        ${countryEntry[0]} - ${countryEntry[1]}</option>`

        toCurrency.innerHTML+=
        `<option value="${countryEntry[0]}">
        ${countryEntry[0]} - ${countryEntry[1]}</option>`
    }   
}

fetchCurrencies()

// currency conversion

btn.addEventListener("click", ()=>{
    console.log(amount.value);
    console.log(fromCurrency.value);
    console.log(toCurrency.value);  
    convert(fromCurrency.value,toCurrency.value,amount.value)  
})

async function convert(from, to, amount) {
    let response =  await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
    let data = await response.json()

    const FinalAmount = (amount * data.rates[to]).toFixed(2);
    console.log(FinalAmount);
    
    convertedAmount.value = FinalAmount
}