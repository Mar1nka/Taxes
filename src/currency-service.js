const firstPartUrl = 'https://www.nbrb.by/API/ExRates/Rates/';
const lastPartUrl = 'ParamMode=2';

export default class CurrencyService {

  getCurrency(currency, date) {
    console.log("date", date);
    let url = `${firstPartUrl}${currency}?onDate=${date}&${lastPartUrl}`;

    return new Promise(function (resolve, reject) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
          if (this.readyState === 4) {
            if (this.status >= 200 && this.status <= 300) {
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

