import TaxData from "./tax-data"
import CurrencyService from "./currency-service"
import "../css/style.css"



const Currencies = [
  {text: "RUB", textCode: "RUB", scale: 100},
  {text: "USD", textCode: "USD", scale: 1},
  {text: "EUR", textCode: "EUR", scale: 1}
];


const currencyService = new CurrencyService();
const TaxRate = 13;

class TaxCalculation {
  constructor() {
    const taxesElement = document.querySelector('.taxes');
    taxesElement.classList.remove('taxes--hidden');

    const loaderElement = document.querySelector('.loader-background');
    loaderElement.classList.add('loader-background--hidden');

    this.taxesList = [];

    this.setEventListeners();
    this.setDisabledSaveButton(true);
    this.addTaxHtml();
  }

  setEventListeners() {

    const addTaxElement = document.querySelector('.taxes__table-add');
    this.addTaxHtml = this.addTaxHtml.bind(this);
    addTaxElement.addEventListener('click', this.addTaxHtml);

    const taxesItemsElement = document.querySelector('.taxes__table-body');
    this.focusOutHandler = this.focusOutHandler.bind(this);
    this.formatInputIncome = this.formatInputIncome.bind(this);
    this.clickRemoveHandler = this.clickRemoveHandler.bind(this);
    taxesItemsElement.addEventListener('blur', this.focusOutHandler, true);
    taxesItemsElement.addEventListener("input", this.formatInputIncome);
    taxesItemsElement.addEventListener("click", this.clickRemoveHandler);

    const taxesForm = document.querySelector('.taxes');
    this.submitHandler = this.submitHandler.bind(this);
    taxesForm.addEventListener('submit', this.submitHandler);


    this.clickSaveHandler = this.clickSaveHandler.bind(this);
    const saveButtonElement = document.querySelector('.taxes__functional-buttons-save');
    saveButtonElement.addEventListener('click', this.clickSaveHandler);
  }


  clickSaveHandler(event) {
    let titleData = document.querySelector('.taxes__table-header-date').textContent;
    let titleIncome = document.querySelector('.taxes__table-header-income').textContent;
    let titleCurrency = document.querySelector('.taxes__table-header-currency').textContent;
    let titleCourse = document.querySelector('.taxes__table-header-course').textContent;
    let titleSum = document.querySelector('.taxes__table-header-sum').textContent;
    let titleTax = document.querySelector('.taxes__table-header-tax').textContent;

    titleData = titleData.split(',').join(' ');
    titleIncome = titleIncome.split(',').join(' ');
    titleCurrency = titleCurrency.split(',').join(' ');
    titleCourse = titleCourse.split(',').join(' ');
    titleSum = titleSum.split(',').join(' ');
    titleTax = titleTax.split(',').join(' ');

    const data = [
      [titleData, titleIncome, titleCurrency, titleCourse, titleSum, titleTax],
    ];

    let taxesListLength = this.taxesList.length;

    for (let i = 0; i < taxesListLength; i++) {
      const id = this.taxesList[i].id;
      const taxElement = document.querySelector(`#tax_${id}`);

      const dateValue = taxElement.querySelector('.taxes__table-body-row-date').value;
      const incomeValue = taxElement.querySelector('.taxes__table-body-row-income').value;
      const currencyValue = taxElement.querySelector('.taxes__table-body-row-currency').value;
      const courseValue = taxElement.querySelector('.taxes__table-body-row-course').textContent;
      const sumValue = taxElement.querySelector('.taxes__table-body-row-sum').textContent;
      const taxValue = taxElement.querySelector('.taxes__table-body-row-tax').textContent;

      data.push([dateValue, incomeValue, currencyValue, courseValue, sumValue, taxValue]);
    }

    data.push(['', '', '', '', '', '']);

    let totalSum = document.querySelector('.taxes__functional-result-sum').textContent;
    totalSum = totalSum.split(' ')[0];
    data.push(['', '', '', '', '', totalSum]);


    this.downloadCsv(data);
  }

  downloadCsv(data) {
    let csv = '';
    data.forEach((row) => {
      csv += row.join(',');
      csv += "\n";
    });

    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'taxes.csv';
    hiddenElement.click();
  }


  setDisabledSaveButton(isDisabled) {
    const saveButtonElement = document.querySelector('.taxes__functional-buttons-save');

    if(isDisabled) {
      saveButtonElement.setAttribute("disabled", "disabled");
      saveButtonElement.classList.add('taxes__functional-buttons-save--disabled');
    } else {
      saveButtonElement.removeAttribute("disabled");
      saveButtonElement.classList.remove('taxes__functional-buttons-save--disabled');
    }
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
      currencyService.getCurrency(this.taxesList[i].currency, this.taxesList[i].date)
        .then((response) => {
          requestCounter++;

          const reply = JSON.parse(response);
          const sum = +(this.taxesList[i].income * reply.Cur_OfficialRate / reply.Cur_Scale).toFixed(2);
          allSum = allSum + sum;

          const id = this.taxesList[i].id;
          const taxElement = document.querySelector(`#tax_${id}`);

          const courseElement = taxElement.querySelector('.taxes__table-body-row-cell-course');
          courseElement.textContent = `${reply.Cur_OfficialRate} / ${reply.Cur_Scale}`;

          const sumElement = taxElement.querySelector('.taxes__table-body-row-cell-sum');
          sumElement.textContent = sum.toFixed(2);

          const taxItemElement = taxElement.querySelector('.taxes__table-body-row-cell-tax');
          const tax = sum / 100 * TaxRate;
          taxItemElement.textContent = tax.toFixed(2);

          if (requestCounter === taxesListLength) {
            const taxAmount = (allSum / 100 * TaxRate).toFixed(2);
            this.setTotalTax(taxAmount);

            this.setDisabledSaveButton(false);
          }
        }).catch(function(e) {
      });
    }
  }

  setTotalTax(value) {
    const functionalResultElement = document.querySelector('.taxes__functional-result');
    functionalResultElement.classList.add('taxes__functional-result--hidden');
    const totalElement = document.querySelector('.taxes__functional-result-sum');

    let newValue = '';

    if(value) {
      newValue = `${value} BYN`;
      functionalResultElement.classList.remove('taxes__functional-result--hidden');
    }

    totalElement.textContent = newValue
  }


  clickRemoveHandler(event) {
    const currentElement = event.target;

    if (currentElement.classList.contains("taxes__table-body-row-remove")) {
      const id = +currentElement.parentNode.id.split('tax_')[1];
      this.removeTax(id);
      this.removeTaxElement(currentElement.parentNode);

      this.setTotalTax(null);
      this.setDisabledSaveButton(true);

      if(!this.taxesList.length) {
        this.addTaxHtml();
      }
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

    if (!isNaN(index)) {
      this.taxesList.splice(index, 1);
    }
  }

  removeTaxElement(element) {
    element.parentNode.removeChild(element);
  }


  formatInputIncome(event) {
    const currentElement = event.target;

    if (currentElement.classList.contains("taxes__table-body-row-cell-income")) {
      currentElement.value = currentElement.value.replace(/[^\d,.]*/g, '')
        .replace(/([,.])[,.]+/g, '$1')
        .replace(/^[^\d]*(\d+([.,]\d{0,2})?).*$/g, '$1');
    }
  }


  focusOutHandler(event) {
    const currentElement = event.target;
    const relatedTarget = event.relatedTarget;

    this.refreshData(currentElement,relatedTarget);
  }

  refreshData(currentElement, relatedTarget ) {
    const taxElement = currentElement.closest('.taxes__table-body-row');
    let id = +taxElement.id.split('tax_')[1];
    let tax = this.filterTaxes(id);
    let isChangeData = false;

    const cellElement = currentElement.closest('.cell');

    if (tax) {
      if (currentElement.classList.contains("taxes__table-body-row-cell-date")) {
        isChangeData = this.isChangeData(tax.date, currentElement.value);
        tax.date = currentElement.value;

        // const e = new KeyboardEvent("keydown");
        // e.key = 27;
        // document.dispatchEvent(e);
      } else if (currentElement.classList.contains("taxes__table-body-row-cell-income")) {
        isChangeData = this.isChangeData(tax.income, currentElement.value);
        // const value = parseInt(currentElement.value);
        const newValue = +currentElement.value;
        currentElement.value = newValue;
        tax.income = newValue;
      } else if (currentElement.classList.contains("taxes__table-body-row-cell-currency")) {
        isChangeData = this.isChangeData(tax.currency, currentElement.value);
        tax.currency = currentElement.value;
      }
    }

    if(isChangeData) {
      this.setTotalTax(null);
      this.setDisabledSaveButton(true);
      this.clearFields(taxElement);
    }
  }

  clearFields(tableRowElement) {
    const courseElement = tableRowElement.querySelector('.taxes__table-body-row-cell-course');
    courseElement.textContent = '0.00 / 0';

    const sumElement = tableRowElement.querySelector('.taxes__table-body-row-cell-sum');
    sumElement.textContent = '0.00';

    const taxItemElement = tableRowElement.querySelector('.taxes__table-body-row-cell-tax');
    taxItemElement.textContent = '0.00';
  }



  isChangeData(prevValue, currentValue) {
    let isChangeData = false;

    if(prevValue !== currentValue) {
      isChangeData = true;
    }

    return isChangeData;
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



  addTaxHtml() {
    let date = this.getHyphenDateFromDate(new Date());

    if(this.taxesList.length) {
      date = this.taxesList[this.taxesList.length - 1].date;
    }

    let tax = new TaxData(date, 0, Currencies[0].textCode);
    this.taxesList.push(tax);

    const taxElement  = this.createTaxElement(tax.id, tax.date);

    const taxesItemsElement = document.querySelector('.taxes__table-body');
    taxesItemsElement.prepend(taxElement);

    const dateElement = taxElement.querySelector('.taxes__table-body-row-cell-date');
    setTimeout(() => { this.setFocus(dateElement)}, 0);

    this.setTotalTax(null);
    this.setDisabledSaveButton(true);
  }

  setFocus(element) {
    element.focus();
  }


  createTaxElement(id, date) {
    const dateElement = this.createDateElement(date);
    const incomeElement = this.createIncomeElement();
    const currencyElement = this.createCurrencyElement();
    const courseElement = this.createCourseElement();
    const sumElement = this.createSumElement();
    const taxItemElement = this.createTaxItemElement();
    const btnRemoveElement = this.createBtnRemoveElement();

    const taxElement = document.createElement('div');
    taxElement.classList.add('taxes__table-body-row');

    taxElement.appendChild(dateElement);
    taxElement.appendChild(incomeElement);
    taxElement.appendChild(currencyElement);
    taxElement.appendChild(courseElement);
    taxElement.appendChild(sumElement);
    taxElement.appendChild(taxItemElement);
    taxElement.appendChild(btnRemoveElement);


    taxElement.id = `tax_${id}`;

    return taxElement;
  }


  getDDMMYYYYFromDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return {day, month, year};
  }

  getHyphenDateFromDate(date) {
    const ddmmyyyy = this.getDDMMYYYYFromDate(date);
    const hyphenDate = this.getHyphenDateFromDDMMYYYY(ddmmyyyy);

    return hyphenDate;
  }

  getHyphenDateFromDDMMYYYY(date) {
    let {day, month, year} = date;

    if(day < 10) {
      day = `0${day}`;
    }

    if(month < 10) {
      month = `0${month}`;
    }

    const newDate = `${year}-${month}-${day}`;

    return newDate;
  }




  createDateElement(date) {

    const dateElement = document.createElement('input');
    dateElement.classList.add('taxes__table-body-row-cell-field', 'taxes__table-body-row-cell-date');
    dateElement.type = "date";
    dateElement.name = "date";
    dateElement.autocomplete="off";
    dateElement.setAttribute("required", "true");

    dateElement.value = date;
    dateElement.min = "2016-01-01";
    dateElement.max = this.getHyphenDateFromDate(new Date());


    const cellElement = document.createElement('div');
    cellElement.classList.add('taxes__table-body-row-cell', 'taxes__table-body-row-date');
    cellElement.appendChild(dateElement);

    return cellElement;
  }

  createIncomeElement() {
    const incomeElement = document.createElement('input');
    incomeElement.classList.add('taxes__table-body-row-cell-field', 'taxes__table-body-row-cell-income',
      'taxes__table-body-row-cell-field--money');
    incomeElement.type = "text";
    incomeElement.setAttribute("required", "true");
    incomeElement.value = "0.00";
    incomeElement.autocomplete="off";

    const cellElement = document.createElement('div');
    cellElement.classList.add('taxes__table-body-row-cell', 'taxes__table-body-row-income');
    cellElement.appendChild(incomeElement);

    return cellElement;
  }



  createCurrencyElement() {
    const currencyElement = document.createElement('select');
    currencyElement.classList.add('taxes__table-body-row-cell-field', 'taxes__table-body-row-cell-currency');
    currencyElement.name = "currency";
    currencyElement.setAttribute("required", "true");

    for (let i = 0; i < Currencies.length; i++) {
      let option = this.createOptionCurrency(Currencies[i].text, Currencies[i].textCode);
      currencyElement.appendChild(option);
    }

    const cellElement = document.createElement('div');
    cellElement.classList.add('taxes__table-body-row-cell', 'taxes__table-body-row-currency');
    cellElement.appendChild(currencyElement);

    return cellElement;
  }

  createOptionCurrency(text, textCode) {
    let option = document.createElement('option');
    option.value = textCode;
    option.innerHTML = text;

    return option;
  }

  createCourseElement() {
    const courseElement = document.createElement('span');
    courseElement.classList.add('taxes__table-body-row-cell-field', 'taxes__table-body-row-cell-course',
      'taxes__table-body-row-cell-field--money', 'taxes__table-body-row-cell-field--only-read');
    courseElement.textContent = "0.00 / 0";
    courseElement.tabIndex = -1;

    const cellElement = document.createElement('div');
    cellElement.classList.add('taxes__table-body-row-cell', 'taxes__table-body-row-course');
    cellElement.appendChild(courseElement);

    return cellElement;
  }

  createSumElement() {
    const sumElement = document.createElement('span');
    sumElement.classList.add('taxes__table-body-row-cell-field', 'taxes__table-body-row-cell-sum',
      'taxes__table-body-row-cell-field--money', 'taxes__table-body-row-cell-field--only-read');
    sumElement.textContent = "0.00";
    sumElement.tabIndex = -1;

    const cellElement = document.createElement('div');
    cellElement.classList.add('taxes__table-body-row-cell', 'taxes__table-body-row-sum');
    cellElement.appendChild(sumElement);

    return cellElement;
  }

  createTaxItemElement() {
    const taxElement = document.createElement('span');
    taxElement.classList.add('taxes__table-body-row-cell-field', 'taxes__table-body-row-cell-tax',
      'taxes__table-body-row-cell-field--money', 'taxes__table-body-row-cell-field--only-read');
    taxElement.textContent = "0.00";
    taxElement.tabIndex = -1;

    const cellElement = document.createElement('div');
    cellElement.classList.add('taxes__table-body-row-cell', 'taxes__table-body-row-tax');
    cellElement.appendChild(taxElement);

    return cellElement;
  }

  createBtnRemoveElement() {
    const btnRemoveElement = document.createElement('button');
    btnRemoveElement.classList.add('taxes__table-body-row-field-remove');
    btnRemoveElement.type="button";

    const cellElement = document.createElement('div');
    cellElement.classList.add('taxes__table-body-row-cell', 'taxes__table-body-row-remove');
    cellElement.appendChild(btnRemoveElement);


    return cellElement;
  }
}

let taxCalculation = new TaxCalculation();