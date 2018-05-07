//import TaxData from "./tax-data.js";

const CurrencyService = window.CurrencyService;

class TaxCalculation {
    constructor() {
        this.taxesList = [];

        this.setHandlerAddTask();

        let taxesItemsElement = document.querySelector('.taxes__items');
        this.focusOutHandler = this.focusOutHandler.bind(this);
        taxesItemsElement.addEventListener('focusout', this.focusOutHandler);

        this.formatInputIncome = this.formatInputIncome.bind(this);
        taxesItemsElement.addEventListener("input", this.formatInputIncome);

        this.clickRemoveHandler = this.clickRemoveHandler.bind(this);
        taxesItemsElement.addEventListener("click", this.clickRemoveHandler);

        this.addTaxHtml();

        let buttonCalculate = document.querySelector('.button--calculate');
        this.buttonCalculateHandler = this.buttonCalculateHandler.bind(this);
        buttonCalculate.addEventListener('click', this.buttonCalculateHandler);
    }


    buttonCalculateHandler() {
        let requestCounter = 0;
        let taxAmount = 0;

        for (let i = 0, taxesListLength = this.taxesList.length; i < taxesListLength; i++) {
            CurrencyService.getCurrency(this.taxesList[i].currency, this.taxesList[i].date)
                .then((response) => {
                    requestCounter++;

                    const reply = JSON.parse(response);
                    const allSum = (this.taxesList[i].income * reply.Cur_OfficialRate / reply.Cur_Scale).toFixed(2);
                    const tax = (allSum / 100 * this.taxesList[i].percent);

                    taxAmount = taxAmount + tax;

                    if (requestCounter === taxesListLength) {
                        let totalElement = document.querySelector('.calculate__total');
                        totalElement.textContent = taxAmount.toFixed(2);
                    }
                });
        }

        // Promise.all(promises).then((responses) => {
        //     responses.forEach((response) => {
        //         let reply = JSON.parse(response);
        //         let allSum = (this.income * reply.Cur_OfficialRate / reply.Cur_Scale).toFixed(2);
        //         let tax = (allSum / 100 * this.percent).toFixed(2);
        //
        //         taxAmount = taxAmount + tax;
        //     })
        // });

    }


    clickRemoveHandler(event) {
        const currentElement = event.target;

        if (currentElement.classList.contains("tax__btn-remove")) {
            const id = +currentElement.parentNode.id;
            this.removeTax(id);
            this.removeTaxElement(currentElement.parentNode);
        }
    }

    removeTax(id) {
        let index = null;

        for (let i = 0; i < this.taxesList.length; i++) {
            if (this.taxesList[i].id === id) {
                index = i;
                break;
            }
        }

        if (index) {
            this.taxesList.splice(index, 1);
        }
    }

    removeTaxElement(element) {

        element.parentNode.removeChild(element);
    }


    formatInputIncome(event) {

        const currentElement = event.target;

        if (currentElement.classList.contains("tax__income")) {
            currentElement.value = currentElement.value.replace(/[^\d,.]*/g, '')
                .replace(/([,.])[,.]+/g, '$1')
                .replace(/^[^\d]*(\d+([.,]\d{0,2})?).*$/g, '$1');
        }
    }


    focusOutHandler(element) {
        const currentElement = event.target;
        const taxElement = currentElement.parentNode.parentNode;

        let id = +taxElement.id;

        let tax = this.filterTaxes(id);

        if (tax) {
            if (currentElement.classList.contains("tax__date")) {
                tax.date = currentElement.value;
            } else if (currentElement.classList.contains("tax__income")) {
                tax.income = +currentElement.value;
            } else if (currentElement.classList.contains("tax__currency")) {
                tax.currency = currentElement.value;
                //console.log(tax.currency);
            }
        }
    }

    filterTaxes(id) {
        let tax = null;

        for (let i = 0; i < this.taxesList.length; i++) {
            if (this.taxesList[i].id === id) {
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
        let tax = new TaxData();
        this.taxesList.push(tax);

        const taxElement = this.createTaxElement(tax.id);

        const taxesItemsElement = document.querySelector('.taxes__items');
        taxesItemsElement.appendChild(taxElement);

        let taxDataElement = taxElement.querySelector('.tax__date');
        taxDataElement.focus();

        this.setScrollBottom();
    }


    createTaxElement(id) {
        const dateElement = this.createDateElement();
        const incomeElement = this.createIncomeElement();
        const currencyElement = this.createCurrencyElement();
        const btnRemoveElement = this.createBtnRemoveElement();

        const taxDataElement = document.createElement('div');
        taxDataElement.classList.add('tax__data');

        taxDataElement.appendChild(dateElement);
        taxDataElement.appendChild(incomeElement);
        taxDataElement.appendChild(currencyElement);
        taxDataElement.appendChild(btnRemoveElement);

        const taxElement = document.createElement('div');
        taxElement.classList.add('tax');

        taxElement.appendChild(taxDataElement);
        taxElement.appendChild(btnRemoveElement);

        taxElement.id = id;

        return taxElement;
    }

    createDateElement() {
        const dateElement = document.createElement('input');
        dateElement.classList.add('tax__item', 'tax__date');
        dateElement.type = "date";
        dateElement.setAttribute("required", "true");
        dateElement.setAttribute("max", new Date());
        dateElement.valueAsDate = new Date();


        return dateElement;
    }

    createIncomeElement() {
        const incomeElement = document.createElement('input');
        incomeElement.classList.add('tax__item', 'tax__income');
        incomeElement.type = "text";
        incomeElement.setAttribute("required", "true");
        incomeElement.value = "0.00";

        return incomeElement;
    }

    createCurrencyElement() {
        const currencyElement = document.createElement('select');
        currencyElement.classList.add('tax__item', 'tax__currency');
        currencyElement.name = "currency";
        currencyElement.setAttribute("required", "true");

        let optionUSD = document.createElement('option');
        optionUSD.value = "USD";
        optionUSD.innerHTML = "USD";

        let optionEUR = document.createElement('option');
        optionEUR.value = "EUR";
        optionEUR.innerHTML = "EUR";

        let optionRUB = document.createElement('option');
        optionRUB.value = "RUB";
        optionRUB.innerHTML = "RUB";

        // let optionBYN = document.createElement('option');
        // optionBYN.value = "BYN";
        // optionBYN.innerHTML = "BYN";

        currencyElement.appendChild(optionUSD);
        currencyElement.appendChild(optionEUR);
        currencyElement.appendChild(optionRUB);
        // currencyElement.appendChild(optionBYN);

        return currencyElement;
    }

    createBtnRemoveElement() {
        const btnRemoveElement = document.createElement('button');
        btnRemoveElement.classList.add('tax__btn-remove');
        btnRemoveElement.textContent = "X";

        return btnRemoveElement;
    }


    setScrollBottom() {
        const taxesElement = document.querySelector('.taxes');
        taxesElement.scrollTop = taxesElement.scrollHeight;
    }
}

let taxCalculation = new TaxCalculation();