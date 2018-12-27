let taxId = 0;

export default class TaxData {

  constructor() {
    this.date = null;
    this.income = null;
    this.currency = 'USD';
    this.id = ++taxId;
    this.datePicker = undefined;
  }

  setDatePicker (datePicker) {
    this.datePicker = datePicker;
  }
}

