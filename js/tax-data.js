(function () {
    let taxId = 0;

//export  default
    class TaxData {

        constructor() {
            this.date = null;
            this.income = null;
            this.currency = 'USD';
            this.id = ++taxId;
        }
    }

    window.TaxData = TaxData;
})();
