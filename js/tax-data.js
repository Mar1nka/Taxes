(function () {
    let taxId = 0;

//export  default
    class TaxData {

        constructor() {
            this.date = null;
            this.income = null;
            this.currency = 'USD';
            this.id = ++taxId;

            this.percent = 13;

            this.tax = 0;
        }

    }

    window.TaxData = TaxData;
})();
