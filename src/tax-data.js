let taxId = 0;

export default class TaxData {

  constructor(date, income, currency) {
    this.date = date;
    this.income = income;
    this.currency = currency;
    this.id = ++taxId;
  }
}

