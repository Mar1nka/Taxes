(function () {
    const firstPartUrl = 'http://www.nbrb.by/API/ExRates/Rates/';
    const lastPartUrl = 'ParamMode=2';

    class CurrencyService {

        getCurrency(currency, date) {
            let url = `${firstPartUrl}${currency}?onDate=${date}&${lastPartUrl}`;

            return new Promise(function (resolve, reject) {

                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);

                    xhr.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status >= 200 && this.status <= 300) {
                                //console.log(this.responseText);
                                resolve(this.responseText);
                            } else {
                                let error = new Error(this.statusText);
                                error.code = this.status;
                                reject(error);
                            }
                        }
                    };

                    xhr.send();
                }
            );
        }

    }

    window.CurrencyService = new CurrencyService();
})();

