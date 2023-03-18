const fromDropDown = document.getElementById("from");
const toDropDown = document.getElementById("to");
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency.code;
    option.text = currency.name;
    fromDropDown.add(option)
});

currencies.forEach(currency => {
    const option = document.createElement("option");
    option.value = currency.code;
    option.text = currency.name;
    toDropDown.add(option)
});

fromDropDown.value = "USD";
toDropDown.value = "TRY";

const convertCurrency = () => {
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;
    if (amount.length != 0) {
        //You must add your api key 
        fetch(`https://v6.exchangerate-api.com/v6/{"your api key"}/latest/${fromCurrency}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                //const sonuc=data.conversion_rates.toCurrency
                // console.log(data.conversion_rates[`${fromCurrency}`], "currency : ", fromCurrency)
                const fromExchangeRate = data.conversion_rates[fromCurrency];
                const toExchangeRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(4)} ${toCurrency}`;
            })

    } else {
        alert("Please fill in the amount")
    }

};

document.querySelector("#convertBtn").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);