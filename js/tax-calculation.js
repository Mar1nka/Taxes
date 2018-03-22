
class TaxCalculation {
    constructor() {

        this.id = 0;
        this.taxesList = [];

        this.setHandlerAddTask();

        let taxesItemsElement = document.querySelector('.taxes__items');
        this.focusOutHandler = this.focusOutHandler.bind(this);
        taxesItemsElement.addEventListener('focusout', this.focusOutHandler);

        this.addTaxHtml();


        let buttonCalculate = document.querySelector('.button--calculate');
        this.buttonCalculateHandler = this.buttonCalculateHandler.bind(this);
        buttonCalculate.addEventListener('click', this.buttonCalculateHandler);


        var inputIncomeElement = document.querySelector('.tax__income');
        this.formatInputIncome = this.formatInputIncome.bind(this);
        inputIncomeElement.addEventListener("input", this.formatInputIncome);

    }

    formatInputIncome(event) {
        let value = event.target.value;

        let reg = /^\d+([\.,]{0,1})\d{0,2}$/;
        let isCorrect = reg.test(value);

        if(isCorrect) {
            event.target.value = value;
        } else {
            // for(let symbol of value) {
            //     if(reg.test(symbol)) {
            //
            //     }
            // }

            event.target.value = value.substring(0, value.length - 1);
        }
    }

    buttonCalculateHandler() {
        let sum = 0;

        for(let i = 0; i < this.taxesList.length; i++) {
            if(this.taxesList[i].income) {
                sum += +this.taxesList[i].income;
            }
        }

        let totalElement = document.querySelector('.calculate__total');
        totalElement.textContent = sum;

    }
    
    createTax(id) {
        let tax = {};
        tax.id = id;
        tax.date = undefined;
        tax.income = undefined;
        tax.currency = undefined;
        
        return tax;
    }
    
    

    focusOutHandler(element) {
        const currentElement = event.target;
        const taxElement = currentElement.parentNode.parentNode;

        let id = taxElement.id;

        let tax = this.filterTaxes(id);

        if(tax) {

            if (currentElement.classList.contains("tax__date")) {
                tax.date = currentElement.value;
            } else if (currentElement.classList.contains("tax__income")) {
                tax.income = currentElement.value;
            } else if (currentElement.classList.contains("tax__currency")) {
                tax.currency = currentElement.value;
            }
        }
    }

    filterTaxes(id) {
        let tax = null;

        for(let i = 0; i < this.taxesList.length; i++) {
            if(this.taxesList[i].id === id) {
                tax = this.taxesList[i];
                break;
            }
        }

        return tax;
    }

    setHandlerAddTask() {
        this.addTax = document.querySelector('.button--add');

        this.addTaxHtml = this.addTaxHtml.bind(this);
        this.addTax.addEventListener('click', this.addTaxHtml);

    }

    addTaxHtml() {
        const taxElement = this.createTaxElement();

        const taxesItemsElement = document.querySelector('.taxes__items');
        taxesItemsElement.appendChild(taxElement);

        this.setScrollBottom();


        let tax = this.createTax(taxElement.id);
        this.taxesList.push(tax);
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

        const taxElement = document.createElement('div');
        taxElement.classList.add('tax');

        taxElement.appendChild(taxDataElement);

        this.id ++;
        taxElement.id = this.id;

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
        incomeElement.type = "text";

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


    setScrollBottom() {
        const taxesElement = document.querySelector('.taxes');
        taxesElement.scrollTop = taxesElement.scrollHeight;
    }
}

let taxCalculation = new TaxCalculation();