
class TaxCalculation {
    constructor() {

        this.setHandlerAddTask();

    }

    setHandlerAddTask() {
        this.addTax = document.querySelector(".tax__button--ok");

        this.addTaxHtml = this.addTaxHtml.bind(this);
        this.addTax.addEventListener('click', this.addTaxHtml);

    }

    addTaxHtml() {
        const taxElement = this.createTaxElement();

        const taxesItemsElement = document.querySelector('.taxes__items');
        taxesItemsElement.appendChild(taxElement);

        this.addTax.removeEventListener('click', this.addTaxHtml);
        this.addTax.parentNode.removeChild(this.addTax);
        this.setHandlerAddTask();



    }

    createTaxElement() {
        const dateElement = this.createDateElement();
        const incomeElement = this.createIncomeElement();
        const currencyElement = this.createCurrencyElement();

        const taxDataElement = document.createElement('div');
        taxDataElement.classList.add('tax__data');

        taxDataElement.appendChild(dateElement);
        taxDataElement.appendChild(incomeElement);
        taxDataElement.appendChild(currencyElement);

        const buttonElement = document.createElement('button');
        buttonElement.classList.add('tax__button--ok');
        buttonElement.innerHTML = "Добавить";

        const taxElement = document.createElement('div');
        taxElement.classList.add('tax');

        taxElement.appendChild(taxDataElement);
        taxElement.appendChild(buttonElement);

        return taxElement;
    }

    createDateElement() {
        const dateElement = document.createElement('input');
        dateElement.classList.add('tax__item', 'tax__date');
        dateElement.type = "date";


        return dateElement;
    }

    createIncomeElement() {
        const incomeElement = document.createElement('input');
        incomeElement.classList.add('tax__item', 'tax__income');
        incomeElement.type = "number";
        incomeElement.placeholder = "20000,00";

        return incomeElement;
    }

    createCurrencyElement() {
        const currencyElement = document.createElement('select');
        currencyElement.classList.add('tax__item', 'tax__currency');
        currencyElement.name = "currency";

        let optionUSD = document.createElement('option');
        optionUSD.value = "usd";
        optionUSD.innerHTML = "USD";

        let optionEUR = document.createElement('option');
        optionEUR.value = "eur";
        optionEUR.innerHTML = "EUR";

        let optionRUB = document.createElement('option');
        optionRUB.value = "rub";
        optionRUB.innerHTML = "RUB";

        let optionBYN = document.createElement('option');
        optionBYN.value = "byn";
        optionBYN.innerHTML = "BYN";

        currencyElement.appendChild(optionUSD);
        currencyElement.appendChild(optionEUR);
        currencyElement.appendChild(optionRUB);
        currencyElement.appendChild(optionBYN);

        return currencyElement;
    }
}

let taxCalculation = new TaxCalculation();