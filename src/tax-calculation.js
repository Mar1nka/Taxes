import TaxData from "./tax-data"
import CurrencyService from "./currency-service"
import Datepicker from "js-datepicker"
import 'js-datepicker/dist/datepicker.min.css'

import "../css/style.css"


// re: /^\s*(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\s*$/,

const Currencies = [
  {text: "RUB", textCode: "RUB"},
  {text: "USD", textCode: "USD"},
  {text: "EUR", textCode: "EUR"}
];


const currencyService = new CurrencyService();
const TaxRate = 13;

class TaxCalculation {
  constructor() {
    this.taxesList = [];

    this.setEventListeners();
    this.setDisabledSaveButton(true);
    this.addTaxHtml();
  }

  setEventListeners() {
    const addTaxElement = document.querySelector('.button__add');
    this.addTaxHtml = this.addTaxHtml.bind(this);
    addTaxElement.addEventListener('click', this.addTaxHtml);

    const taxesItemsElement = document.querySelector('.taxes__items');
    this.focusOutHandler = this.focusOutHandler.bind(this);
    this.formatInputIncome = this.formatInputIncome.bind(this);
    this.clickRemoveHandler = this.clickRemoveHandler.bind(this);
    taxesItemsElement.addEventListener('focusout', this.focusOutHandler);
    taxesItemsElement.addEventListener("input", this.formatInputIncome);
    taxesItemsElement.addEventListener("click", this.clickRemoveHandler);

    const taxesForm = document.querySelector('.taxes');
    taxesForm.addEventListener('submit', this.submitHandler);

    const buttonCalculateElement = document.querySelector('.button__calculate');
    this.clickCalculateButton = this.clickCalculateButton.bind(this);
    buttonCalculateElement.addEventListener('click', this.clickCalculateButton);

    this.clickSaveHandler = this.clickSaveHandler.bind(this);
    const saveButtonElement = document.querySelector('.button__save');
    saveButtonElement.addEventListener('click', this.clickSaveHandler);
  }


  clickSaveHandler(event) {
    let titleData = document.querySelector('.title__date').innerHTML;
    let titleIncome = document.querySelector('.title__income').innerHTML;
    let titleCurrency = document.querySelector('.title__currency').innerHTML;
    let titleCourse = document.querySelector('.title__course').innerHTML;
    let titleSum = document.querySelector('.title__sum').innerHTML;
    let titleTax = document.querySelector('.title__tax').innerHTML;

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

      const dateValue = taxElement.querySelector('.tax__date').value;
      const incomeValue = taxElement.querySelector('.tax__income').value;
      const currencyValue = taxElement.querySelector('.tax__currency').value;
      const courseValue = taxElement.querySelector('.tax__course').value;
      const sumValue = taxElement.querySelector('.tax__sum').value;
      const taxValue = taxElement.querySelector('.tax__tax').value;

      data.push([dateValue, incomeValue, currencyValue, courseValue, sumValue, taxValue]);
    }

    let totalSum = document.querySelector('.calculate__total').innerHTML;
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
    const saveButtonElement = document.querySelector('.button__save');

    if(isDisabled) {
      saveButtonElement.setAttribute("disabled", "disabled");
      saveButtonElement.classList.add('button__save--disabled');
    } else {
      saveButtonElement.removeAttribute("disabled");
      saveButtonElement.classList.remove('button__save--disabled');
    }
  }

  clickCalculateButton(event) {
    this.calculateTaxes();
  }

  submitHandler(event) {
    event.preventDefault();
  }




  calculateTaxes() {
    let requestCounter = 0;
    let allSum = 0;
    let taxesListLength = this.taxesList.length;

    for (let i = 0; i < taxesListLength; i++) {
      const date = this.getHyphenDateFromDDMMYYYY(this.taxesList[i].date);
      currencyService.getCurrency(this.taxesList[i].currency, date)
        .then((response) => {
          requestCounter++;

          const reply = JSON.parse(response);
          const sum = +(this.taxesList[i].income * reply.Cur_OfficialRate / reply.Cur_Scale).toFixed(2);
          allSum = allSum + sum;

          const id = this.taxesList[i].id;
          const taxElement = document.querySelector(`#tax_${id}`);

          const courseElement = taxElement.querySelector('.tax__course');
          courseElement.value = `${reply.Cur_OfficialRate} / ${reply.Cur_Scale}`;

          const sumElement = taxElement.querySelector('.tax__sum');
          sumElement.value = sum.toFixed(2);

          const taxItemElement = taxElement.querySelector('.tax__tax');
          const tax = sum / 100 * TaxRate;
          taxItemElement.value = tax.toFixed(2);

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
    const functionalResultElement = document.querySelector('.functional__result');
    functionalResultElement.classList.add('functional__result--hidden');
    const totalElement = document.querySelector('.calculate__total');

    let newValue = '';

    if(value) {
      newValue = `${value} BYN`;
      functionalResultElement.classList.remove('functional__result--hidden');
    }

    totalElement.textContent = newValue
  }


  clickRemoveHandler(event) {
    const currentElement = event.target;

    if (currentElement.classList.contains("tax__btn-remove")) {
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

    if (currentElement.classList.contains("tax__income")) {
      currentElement.value = currentElement.value.replace(/[^\d,.]*/g, '')
        .replace(/([,.])[,.]+/g, '$1')
        .replace(/^[^\d]*(\d+([.,]\d{0,2})?).*$/g, '$1');
    } else if(currentElement.classList.contains("tax__date")) {
      currentElement.value = currentElement.value.replace(/[^\d.]*/g, '')
    }
  }


  focusOutHandler(event) {
    const currentElement = event.target;
    this.refreshData(currentElement);
  }

  refreshData(currentElement) {
    const taxElement = currentElement.parentNode.parentNode;

    let id = +taxElement.id.split('tax_')[1];
    let tax = this.filterTaxes(id);

    let isChangeData = false;

    if (tax) {
      if (currentElement.classList.contains("tax__date")) {
        const date = this.getDDMMYYYYFromPointDate(currentElement.value);
        isChangeData = this.isChangeData(tax.date, date);
        tax.date = date;
      } else if (currentElement.classList.contains("tax__income")) {
        isChangeData = this.isChangeData(tax.income, currentElement.value);
        tax.income = +currentElement.value;
      } else if (currentElement.classList.contains("tax__currency")) {
        isChangeData = this.isChangeData(tax.currency, currentElement.value);
        tax.currency = currentElement.value;
      }
    }

    if(isChangeData) {
      this.setTotalTax(null);
      this.setDisabledSaveButton(true);
    }
  }

  isChangeData(prev, current) {
    let isChangeData = false;

    if(prev.day != current.day || prev.month != current.month || prev.year != current.year) {
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
    let date = this.getDDMMYYYYFromDate(new Date());

    if(this.taxesList.length) {
      date = this.taxesList[this.taxesList.length - 1].date;
    }

    let tax = new TaxData(date, 0, Currencies[0].textCode);
    this.taxesList.push(tax);

    const {taxElement, datePicker}  = this.createTaxElement(tax.id, tax.date);
    tax.setDatePicker(datePicker);

    const taxesItemsElement = document.querySelector('.taxes__items');
    taxesItemsElement.prepend(taxElement);

    let taxDateElement = taxElement.querySelector('.tax__date');
    setTimeout(()=>{this.setFocus(taxDateElement)}, 0);

    this.setTotalTax(null);
    this.setDisabledSaveButton(true);
    // this.setScrollBottom();
  }

  setFocus(element) {
    element.focus();
  }


  createTaxElement(id, date) {
    const dateElement = this.createDateElement();
    const incomeElement = this.createIncomeElement();
    const currencyElement = this.createCurrencyElement();

    const courseElement = this.createCourseElement();
    const sumElement = this.createSumElement();
    const taxItemElement = this.createTaxItemElement();

    const btnRemoveElement = this.createBtnRemoveElement();

    const taxDataElement = document.createElement('div');
    taxDataElement.classList.add('tax__data');

    taxDataElement.appendChild(dateElement);
    taxDataElement.appendChild(incomeElement);
    taxDataElement.appendChild(currencyElement);
    taxDataElement.appendChild(courseElement);
    taxDataElement.appendChild(sumElement);
    taxDataElement.appendChild(taxItemElement);

    taxDataElement.appendChild(btnRemoveElement);

    const taxElement = document.createElement('div');
    taxElement.classList.add('tax');

    taxElement.appendChild(taxDataElement);
    taxElement.appendChild(btnRemoveElement);

    const dateInputElement = dateElement.querySelector('.tax__date');

    const datePicker = this.createDatePicker(dateInputElement, date);

    taxElement.id = `tax_${id}`;

    return {
      taxElement,
      datePicker
    };
  }

  createDatePicker(dateElement, date) {
    let nowDate  = new Date();
    let {day: nowDay, month: nowMonth, year: nowYear} = this.getDDMMYYYYFromDate(nowDate);
    const picker = new Datepicker(dateElement,
      {
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
          'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        startDay: 1,
        dateSelected: new Date(date.year, date.month -1, date.day),
        overlayPlaceholder: 'Введите год...',
        overlayButton: "Перейти",
        formatter: (input, date, instance) => {
          const value = date.toLocaleDateString();
          input.value = value;
        },
        maxDate: new Date(nowYear, nowMonth -1, nowDay),
        minDate: new Date(2016, 0, 1),
        onSelect: (instance, selectedDate) => {
          this.refreshData(dateElement);
        }
      });

    return picker;
  }

  getDDMMYYYYFromPointDate(dateString) {
    const date = dateString.split('.');
    const day = date[0];
    const month = date[1];
    const year = date[2];

    return {day, month, year};
  }

  getDDMMYYYYFromDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return {day, month, year};
  }

  getHyphenDateFromDDMMYYYY(date) {
    const {day, month, year} = date;
    const newDate = `${year}-${month}-${day}`;

    return newDate;
  }



  createDateElement() {

    const dateElement = document.createElement('input');
    dateElement.classList.add('tax__item', 'tax__date');
    dateElement.type = "text";
    dateElement.name = "date";
    dateElement.autocomplete="off";

    dateElement.setAttribute("required", "true");

    const cellElement = document.createElement('div');
    cellElement.classList.add('cell', 'cell__date');
    cellElement.appendChild(dateElement);

    return cellElement;
  }

  createIncomeElement() {
    const incomeElement = document.createElement('input');
    incomeElement.classList.add('tax__item', 'tax__income', 'tax__item--money');
    incomeElement.type = "text";
    incomeElement.setAttribute("required", "true");
    incomeElement.value = "0.00";
    incomeElement.autocomplete="off";

    const cellElement = document.createElement('div');
    cellElement.classList.add('cell', 'cell__income');
    cellElement.appendChild(incomeElement);

    return cellElement;
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

    const cellElement = document.createElement('div');
    cellElement.classList.add('cell', 'cell__currency');
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
    const courseElement = document.createElement('input');
    courseElement.classList.add('tax__item', 'tax__course', 'tax__item--money');
    courseElement.type = "text";
    courseElement.setAttribute("required", "true");
    courseElement.readOnly = true;
    courseElement.value = "0.00 / 1";
    courseElement.tabIndex = -1;

    const cellElement = document.createElement('div');
    cellElement.classList.add('cell', 'cell__course', 'cell--only-read');
    cellElement.appendChild(courseElement);

    return cellElement;
  }

  createSumElement() {
    const sumElement = document.createElement('input');
    sumElement.classList.add('tax__item', 'tax__sum', 'tax__item--money');
    sumElement.type = "text";
    sumElement.setAttribute("required", "true");
    sumElement.readOnly = true;
    sumElement.value = "0.00";
    sumElement.tabIndex = -1;

    const cellElement = document.createElement('div');
    cellElement.classList.add('cell', 'cell__sum', 'cell--only-read');
    cellElement.appendChild(sumElement);

    return cellElement;
  }

  createTaxItemElement() {
    const taxElement = document.createElement('input');
    taxElement.classList.add('tax__item', 'tax__tax', 'tax__item--money');
    taxElement.type = "text";
    taxElement.setAttribute("required", "true");
    taxElement.readOnly = true;
    taxElement.value = "0.00";
    taxElement.tabIndex = -1;


    const cellElement = document.createElement('div');
    cellElement.classList.add('cell', 'cell__tax', 'cell--only-read');
    cellElement.appendChild(taxElement);

    return cellElement;
  }

  createBtnRemoveElement() {
    const btnRemoveElement = document.createElement('button');
    btnRemoveElement.classList.add('tax__btn-remove');
    btnRemoveElement.type="button";


    return btnRemoveElement;
  }


  setScrollBottom() {
    const taxesElement = document.querySelector('.taxes__items');
    taxesElement.scrollTop = taxesElement.scrollHeight;
  }
}

let taxCalculation = new TaxCalculation();