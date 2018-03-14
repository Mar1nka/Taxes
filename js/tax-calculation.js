
class TaxCalculation {
    constructor() {

        this.setHandlerAddTask();

    }

    setHandlerAddTask() {
        const addTax = document.querySelector(".button--add");

        this.addTaxHtml = this.addTaxHtml.bind(this);
        addTax.addEventListener('click', this.addTaxHtml);
    }

    addTaxHtml() {
    }
}

let taxCalculation = new TaxCalculation();