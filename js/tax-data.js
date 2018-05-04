(function () {
    let taxId = 0;

    const firstPartUrl = 'http://www.nbrb.by/API/ExRates/Rates/';
    const lastPartUrl = 'ParamMode=2';

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

        request() {
            let xhr = new XMLHttpRequest();

            let url = `${firstPartUrl}${this.currency}?onDate=${this.date}&${lastPartUrl}`;
            xhr.open('GET', url, true);

            let allSum = 0;
            const this2 = this;

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    // console.log(xhr.responseText);

                    let reply = JSON.parse(xhr.responseText);

                    allSum = (this2.income * reply.Cur_OfficialRate / reply.Cur_Scale).toFixed(2);
                    this2.tax= (allSum / 100 * this2.percent).toFixed(2);

                    EventObserver.triggerEvent('finishRequest', [this2.tax]);
                }
            }

            xhr.send();
        }
    }

    window.TaxData = TaxData;
})();
