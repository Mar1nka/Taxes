//import TaxData from "./tax-data.js";


const Currencies = [
  {text: "USD", textCode: "USD"},
  {text: "EUR", textCode: "EUR"},
  {text: "RUB", textCode: "RUB"}
];


let optionRUB = document.createElement('option');
optionRUB.value = "RUB";
optionRUB.innerHTML = "RUB";

let optionUSD = document.createElement('option');
optionUSD.value = "USD";
optionUSD.innerHTML = "USD";

const CurrencyService = window.CurrencyService;
const TaxRate = 13;

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

    // let buttonCalculate = document.querySelector('.button--calculate');
    // this.buttonCalculateHandler = this.buttonCalculateHandler.bind(this);
    // buttonCalculate.addEventListener('click', this.buttonCalculateHandler);

    const taxesForm = document.querySelector('.taxes');
    this.submitHandler = this.submitHandler.bind(this);
    taxesForm.addEventListener('submit', this.submitHandler);
  }

  submitHandler(event) {
    event.preventDefault();
    this.calculateTaxes();
  }


  calculateTaxes() {
    let requestCounter = 0;
    let allSum = 0;
    let taxesListLength = this.taxesList.length;

    for (let i = 0; i < taxesListLength; i++) {
      CurrencyService.getCurrency(this.taxesList[i].currency, this.taxesList[i].date)
        .then((response) => {
          requestCounter++;

          const reply = JSON.parse(response);
          const sum = +(this.taxesList[i].income * reply.Cur_OfficialRate / reply.Cur_Scale).toFixed(2);
          allSum = allSum + sum;

          if (requestCounter === taxesListLength) {
            const taxAmount = (allSum / 100 * TaxRate);
            let totalElement = document.querySelector('.calculate__total');
            totalElement.textContent = taxAmount.toFixed(2);
          }
        });
    }
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

    // let taxDataElement = taxElement.querySelector('.tax__date');
    // taxDataElement.focus();

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

    const date  = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();


    const picker = datepicker(dateElement,
      {
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
          'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        startDay: 1,
        dateSelected: new Date(year, month, day),
        overlayPlaceholder: 'Введите год...',
        overlayButton: "Перейти",
        formatter: (input, date, instance) => {
          const value = date.toLocaleDateString();
          input.value = value;
        },
        maxDate: new Date(year, month, day),
        minDate: new Date(year - 2, 0, 1)
      });

    taxElement.id = id;

    return taxElement;
  }

  createDateElement() {

    const dateElement = document.createElement('input');
    dateElement.classList.add('tax__item', 'tax__date');
    dateElement.type = "text";
    dateElement.name = "date";

    dateElement.setAttribute("required", "true");
    //dateElement.setAttribute("max", new Date());
    //dateElement.valueAsDate = new Date();



    // dateElement.value = formattedDate;


    // const dateElement = document.createElement('input');
    // dateElement.classList.add('tax__item', 'tax__date');
    // dateElement.type = "date";
    // dateElement.setAttribute("required", "true");
    // dateElement.setAttribute("max", new Date());
    // dateElement.valueAsDate = new Date();


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

    for (let i = 0; i < Currencies.length; i++) {
      let option = this.createOptionCurrency(Currencies[i].text, Currencies[i].textCode);
      currencyElement.appendChild(option);
    }

    return currencyElement;
  }

  createOptionCurrency(text, textCode) {
    let option = document.createElement('option');
    option.value = textCode;
    option.innerHTML = text;

    return option;
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