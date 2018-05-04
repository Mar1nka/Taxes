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
            let url = `${firstPartUrl}${this.currency}?onDate=${this.date}&${lastPartUrl}`;

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            let allSum = 0;
            const this2 = this;

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                     console.log(xhr.responseText);

                    let reply = JSON.parse(xhr.responseText);

                    allSum = (this2.income * reply.Cur_OfficialRate / reply.Cur_Scale).toFixed(2);
                    this2.tax= (allSum / 100 * this2.percent).toFixed(2);

                    EventObserver.triggerEvent('finishRequest', [this2.tax]);
                }
            }

            xhr.send();

            // this.httpGet(url)
            //     .then(
            //         (response) => {
            //             console.log(response);
            //             let reply = JSON.parse(response);
            //             let allSum = (this.income * reply.Cur_OfficialRate / reply.Cur_Scale).toFixed(2);
            //             this.tax = (allSum / 100 * this.percent).toFixed(2);
            //
            //             alert(`Fulfilled: ${this.tax}`);
            //         },
            //         (error) => {
            //             alert(`Rejected: ${error}`);
            //         }
            //     );
        }

        // httpGet(url) {
        //
        //     return new Promise(function(resolve, reject) {
        //
        //         let xhr = new XMLHttpRequest();
        //         xhr.open('GET', url, true);
        //
        //         xhr.onreadystatechange = function() {
        //             if (this.readyState === 4) {
        //                 console.log(this.responseText);
        //                 resolve(this.responseText);
        //             } else {
        //                 let error = new Error(this.statusText);
        //                 error.code = this.status;
        //                 reject(error);
        //             }
        //         };
        //
        //         xhr.onerror = function() {
        //             reject(new Error("Network Error"));
        //         };
        //
        //         xhr.send();
        //     });
        // }
    }

    window.TaxData = TaxData;
})();
