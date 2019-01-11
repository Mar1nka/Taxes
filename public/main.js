!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/public/",n(n.s=7)}([function(e,t,n){var r=n(1);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(5)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(2)(!1);var r=n(3)(n(4));t.push([e.i,"* {\r\n  box-sizing: border-box;\r\n  padding: 0;\r\n  margin: 0;\r\n  border: none;\r\n  --main-color: #0d47a1;\r\n  --second-color: #1976d2;\r\n  font-family: 'Roboto Mono', monospace;\r\n}\r\n\r\nhtml {\r\n  display: flex;\r\n  width: 100%;\r\n  min-width: fit-content;\r\n  height: 100%;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n}\r\n\r\nbody {\r\n  width: fit-content;\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  overflow: auto;\r\n  background: #e4e4e4;\r\n}\r\n\r\n.taxes {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n  align-items: flex-start;\r\n  min-height: 650px;\r\n  max-height: 650px;\r\n  margin: 40px 0 20px 0;\r\n  border: 2px solid lightgray;\r\n  box-shadow: 0 0 6px 1px lightgray;\r\n  border-radius: 5px;\r\n  padding: 10px 20px;\r\n  background: white;\r\n}\r\n\r\n\r\n.taxes__basic {\r\n  height: 100%;\r\n}\r\n\r\n.taxes__title {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.taxes__title-name {\r\n  font-size: 24px;\r\n  font-weight: bold;\r\n}\r\n\r\n.taxes__table {\r\n  height: 100%;\r\n}\r\n\r\n\r\n.taxes__table-header {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: flex-start;\r\n\r\n  align-items: stretch;\r\n  margin-bottom: 1px;\r\n  background: var(--main-color);\r\n}\r\n\r\n.taxes__table-header-cell {\r\n  display: flex;\r\n  justify-content: flex-start;\r\n\r\n  color: white;\r\n  font-size: 15px;\r\n\r\n  padding: 10px;\r\n}\r\n\r\n\r\n\r\n.taxes__table-header-cell, .taxes__table-body-row-cell {\r\n  margin-right: 30px;\r\n}\r\n\r\n.taxes__table-header-date, .taxes__table-body-row-date {\r\n  max-width: 160px;\r\n  min-width: 160px;\r\n}\r\n\r\n.taxes__table-header-income, .taxes__table-body-row-income {\r\n  max-width: 100px;\r\n  min-width: 100px;\r\n}\r\n\r\n.taxes__table-header-currency, .taxes__table-body-row-currency {\r\n  max-width: 120px;\r\n  min-width: 120px;\r\n}\r\n\r\noption {\r\n  background: var(--main-color);\r\n  color: white;\r\n}\r\n\r\n.taxes__table-header-course, .taxes__table-body-row-course {\r\n  max-width: 145px;\r\n  min-width: 145px;\r\n}\r\n\r\n.taxes__table-header-sum, .taxes__table-body-row-sum {\r\n  max-width: 120px;\r\n  min-width: 120px;\r\n}\r\n\r\n.taxes__table-header-tax, .taxes__table-body-row-tax {\r\n  max-width: 120px;\r\n  min-width: 120px;\r\n}\r\n\r\n.taxes__table-header-action, .taxes__table-body-row-remove {\r\n  max-width: 50px;\r\n  min-width: 50px;\r\n  margin-right: 0;\r\n}\r\n\r\n.taxes__table-body {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n  align-items: flex-start;\r\n\r\n  min-width: 100%;\r\n  max-height: 340px;\r\n  height: 100%;\r\n  overflow: auto;\r\n\r\n}\r\n\r\n.taxes__table-body-row {\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n\r\n  width: 100%;\r\n  min-width: 100%;\r\n  min-height: 45px;\r\n  border-bottom: 1px solid gray;\r\n}\r\n\r\n.taxes__table-body-row:first-child {\r\n  border-top: 1px solid gray;\r\n}\r\n\r\n\r\n.taxes__basic .taxes__table-body .taxes__table-body-row:hover {\r\n  background: #ebeef3;\r\n}\r\n\r\n\r\n\r\n.taxes__table-body-row-cell {\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: center;\r\n  align-items: center;\r\n\r\n  outline: none;\r\n  min-height: 38px;\r\n}\r\n\r\n.taxes__table-body-row-cell-field {\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  font-size: 14px;\r\n\r\n  padding: 10px;\r\n  text-align: left;\r\n  background: transparent;\r\n  outline: none;\r\n}\r\n\r\n.taxes__table-body-row-cell-field:focus  {\r\n  outline: 2px solid var(--main-color);\r\n}\r\n\r\n\r\n.taxes__table-body-row .taxes__table-body-row-cell-field--only-read{\r\n  color: gray;\r\n  outline: none;\r\n}\r\n\r\n\r\n.taxes__table-header-cell--money, .taxes__table-body-row-cell-field--money {\r\n  text-align: right;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.tax-fields {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n\r\n  min-width: 100%;\r\n  height: 100%;\r\n  overflow: auto;\r\n}\r\n\r\n\r\n.taxes__table-body-row-remove {\r\n  /*margin: 0 15px;*/\r\n\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.taxes__table-body-row-field-remove {\r\n  font-size: 18px;\r\n  outline: none;\r\n  padding: 5px;\r\n  opacity: 0.7;\r\n\r\n  width: 30px;\r\n  height: 30px;\r\n\r\n  background-image: url("+r+");\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: 15px 15px;\r\n  background-color: transparent;\r\n\r\n}\r\n\r\n.taxes__table-body-row-field-remove:hover, .taxes__table-body-row-field-remove:focus {\r\n  opacity: 1;\r\n  transition: opacity 0.3s;\r\n  cursor: pointer;\r\n}\r\n\r\n.taxes__table-body-row-field-remove:focus {\r\n  transform: scale(1.3);\r\n}\r\n\r\n\r\n.taxes__table-add {\r\n  width: 35px;\r\n  height: 35px;\r\n  margin: 10px 0;\r\n  background: var(--main-color);\r\n  color: white;\r\n  box-shadow: 0 3px 6px 1px lightgray;\r\n  border-radius: 50%;\r\n  outline: none;\r\n  font-weight: bold;\r\n  font-size: 20px;\r\n  transition: background-color ease-in-out 0.2s;\r\n}\r\n\r\n.taxes__table-add:hover, .taxes__table-add:focus  {\r\n  cursor: pointer;\r\n  background: var(--second-color);\r\n  color: white;\r\n}\r\n\r\n.taxes__table-add:focus {\r\n  transform: scale(1.1);\r\n}\r\n\r\n\r\n\r\n.taxes__functional {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n\r\n  margin-bottom: 30px;\r\n}\r\n\r\n\r\n\r\n.taxes__functional-buttons {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: flex-end;\r\n  align-items: center;\r\n}\r\n\r\n.button {\r\n  padding: 10px;\r\n  margin-left: 10px;\r\n  box-shadow: 0 3px 6px 2px lightgrey;\r\n  transition: all ease-in-out 0.2s;\r\n}\r\n\r\n.button:focus {\r\n  transform: scale(1.1);\r\n}\r\n\r\n\r\n.taxes__functional-buttons-save {\r\n  background: white;\r\n  border-radius: 5px;\r\n  border: 2px solid var(--main-color);\r\n  color: var(--main-color);\r\n  outline: none;\r\n}\r\n\r\n.taxes__functional-buttons-save:hover, .taxes__functional-buttons-save:focus {\r\n  cursor: pointer;\r\n  color: var(--second-color);\r\n  border: 2px solid var(--second-color);\r\n}\r\n\r\n\r\n.taxes__functional-buttons-save--disabled {\r\n  color: rgba(0,0,0,.26);\r\n  border-color: rgba(0,0,0,.26);\r\n}\r\n\r\n.taxes__functional-buttons-save--disabled:hover {\r\n  color: rgba(0,0,0,.26);\r\n  border-color: rgba(0,0,0,.26);\r\n  cursor: default;\r\n}\r\n\r\n.taxes__functional-buttons-calculate {\r\n  background: var(--main-color);\r\n  border: 2px solid var(--main-color);\r\n\r\n  border-radius: 5px;\r\n  color: white;\r\n  outline: none;\r\n\r\n}\r\n\r\n.taxes__functional-buttons-calculate:hover, .taxes__functional-buttons-calculate:focus {\r\n  cursor: pointer;\r\n  background: var(--second-color);\r\n  border-color: var(--second-color);\r\n}\r\n\r\n.taxes__functional-result {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-direction: row;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  visibility: visible;\r\n\r\n  font-size: 18px;\r\n}\r\n\r\n.taxes__functional-result--hidden {\r\n  visibility: hidden;\r\n}\r\n\r\n\r\n.taxes__functional-result-sum {\r\n  border: none;\r\n  background: none;\r\n  font-size: 20px;\r\n  margin-left: 10px;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",""])},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),a=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(a).concat([o]).join("\n")}var s;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(o=0;o<e.length;o++){var s=e[o];null!=s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(e,t,n){"use strict";e.exports=function(e,t){return"string"!=typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)||t?'"'+e.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':e)}},function(e,t){e.exports="\"data:image/svg+xml,%3C!-- Generated by IcoMoon.io --%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E %3Ctitle%3Ebin%3C/title%3E %3Cpath d='M2 5v10c0 0.55 0.45 1 1 1h9c0.55 0 1-0.45 1-1v-10h-11zM5 14h-1v-7h1v7zM7 14h-1v-7h1v7zM9 14h-1v-7h1v7zM11 14h-1v-7h1v7z'%3E%3C/path%3E %3Cpath d='M13.25 2h-3.25v-1.25c0-0.412-0.338-0.75-0.75-0.75h-3.5c-0.412 0-0.75 0.338-0.75 0.75v1.25h-3.25c-0.413 0-0.75 0.337-0.75 0.75v1.25h13v-1.25c0-0.413-0.338-0.75-0.75-0.75zM9 2h-3v-0.987h3v0.987z'%3E%3C/path%3E %3C/svg%3E\""},function(e,t,n){var r,o,a={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),i=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),l=null,c=0,d=[],u=n(6);function x(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=a[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(m(r.parts[s],t))}else{var i=[];for(s=0;s<r.parts.length;s++)i.push(m(r.parts[s],t));a[r.id]={id:r.id,refs:1,parts:i}}}}function b(e,t){for(var n=[],r={},o=0;o<e.length;o++){var a=e[o],s=t.base?a[0]+t.base:a[0],i={css:a[1],media:a[2],sourceMap:a[3]};r[s]?r[s].parts.push(i):n.push(r[s]={id:s,parts:[i]})}return n}function f(e,t){var n=i(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=d[d.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),d.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=i(e.insertAt.before,n);n.insertBefore(t,o)}}function h(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=d.indexOf(e);t>=0&&d.splice(t,1)}function p(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return _(t,e.attrs),f(e,t),t}function _(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function m(e,t){var n,r,o,a;if(t.transform&&e.css){if(!(a="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=a}if(t.singleton){var s=c++;n=l||(l=p(t)),r=w.bind(null,n,s,!1),o=w.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",_(t,e.attrs),f(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,a=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||a)&&(r=u(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(s),i&&URL.revokeObjectURL(i)}.bind(null,n,t),o=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=p(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){h(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=s()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=b(e,t);return x(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var s=n[o];(i=a[s.id]).refs--,r.push(i)}e&&x(b(e,t),t);for(o=0;o<r.length;o++){var i;if(0===(i=r[o]).refs){for(var l=0;l<i.parts.length;l++)i.parts[l]();delete a[i.id]}}}};var y,v=(y=[],function(e,t){return y[e]=t,y.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,o);else{var a=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(a,s[t]):e.appendChild(a)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,a=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)?e:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){"use strict";n.r(t);let r=0;class o{constructor(e,t,n){this.date=e,this.income=t,this.currency=n,this.id=++r}}const a="https://www.nbrb.by/API/ExRates/Rates/",s="ParamMode=2";n(0);const i=[{text:"RUB",textCode:"RUB",scale:100},{text:"USD",textCode:"USD",scale:1},{text:"EUR",textCode:"EUR",scale:1}],l=new class{getCurrency(e,t){let n=`${a}${e}?onDate=${t}&${s}`;return new Promise(function(e,t){let r=new XMLHttpRequest;r.open("GET",n,!0),r.onreadystatechange=function(){if(4===this.readyState)if(this.status>=200&&this.status<=300)e(this.responseText);else{let e=new Error(this.statusText);e.code=this.status,t(e)}},r.send()})}},c=13;new class{constructor(){document.querySelector(".taxes").classList.remove("taxes--hidden"),document.querySelector(".loader-background").classList.add("loader-background--hidden"),this.taxesList=[],this.setEventListeners(),this.setDisabledSaveButton(!0),this.addTaxHtml()}setEventListeners(){const e=document.querySelector(".taxes__table-add");this.addTaxHtml=this.addTaxHtml.bind(this),e.addEventListener("click",this.addTaxHtml);const t=document.querySelector(".taxes__table-body");this.focusOutHandler=this.focusOutHandler.bind(this),this.formatInputIncome=this.formatInputIncome.bind(this),this.clickRemoveHandler=this.clickRemoveHandler.bind(this),t.addEventListener("blur",this.focusOutHandler,!0),t.addEventListener("input",this.formatInputIncome),t.addEventListener("click",this.clickRemoveHandler);const n=document.querySelector(".taxes");this.submitHandler=this.submitHandler.bind(this),n.addEventListener("submit",this.submitHandler),this.clickSaveHandler=this.clickSaveHandler.bind(this),document.querySelector(".taxes__functional-buttons-save").addEventListener("click",this.clickSaveHandler)}clickSaveHandler(e){let t=document.querySelector(".taxes__table-header-date").textContent,n=document.querySelector(".taxes__table-header-income").textContent,r=document.querySelector(".taxes__table-header-currency").textContent,o=document.querySelector(".taxes__table-header-course").textContent,a=document.querySelector(".taxes__table-header-sum").textContent,s=document.querySelector(".taxes__table-header-tax").textContent;const i=[[t=t.split(",").join(" "),n=n.split(",").join(" "),r=r.split(",").join(" "),o=o.split(",").join(" "),a=a.split(",").join(" "),s=s.split(",").join(" ")]];let l=this.taxesList.length;for(let e=0;e<l;e++){const t=this.taxesList[e].id,n=document.querySelector(`#tax_${t}`),r=n.querySelector(".taxes__table-body-row-cell-date").value,o=n.querySelector(".taxes__table-body-row-cell-income").value,a=n.querySelector(".taxes__table-body-row-cell-currency").value,s=n.querySelector(".taxes__table-body-row-cell-course").textContent,l=n.querySelector(".taxes__table-body-row-cell-sum").textContent,c=n.querySelector(".taxes__table-body-row-cell-tax").textContent;i.push([r,o,a,s,l,c])}i.push(["","","","","",""]);let c=document.querySelector(".taxes__functional-result-sum").textContent;c=c.split(" ")[0],i.push(["Общая сумма налога",c,"","","",""]),this.downloadCsv(i)}downloadCsv(e){let t="";e.forEach(e=>{t+=e.join(","),t+="\n"});const n=document.createElement("a");n.href="data:text/csv;charset=utf-8,"+encodeURI(t),n.target="_blank",n.download="taxes.csv",n.click()}setDisabledSaveButton(e){const t=document.querySelector(".taxes__functional-buttons-save");e?(t.setAttribute("disabled","disabled"),t.classList.add("taxes__functional-buttons-save--disabled")):(t.removeAttribute("disabled"),t.classList.remove("taxes__functional-buttons-save--disabled"))}submitHandler(e){e.preventDefault(),this.calculateTaxes()}calculateTaxes(){let e=0,t=0,n=this.taxesList.length;for(let r=0;r<n;r++)l.getCurrency(this.taxesList[r].currency,this.taxesList[r].date).then(o=>{e++;const a=JSON.parse(o),s=+(this.taxesList[r].income*a.Cur_OfficialRate/a.Cur_Scale).toFixed(2);t+=s;const i=this.taxesList[r].id,l=document.querySelector(`#tax_${i}`);l.querySelector(".taxes__table-body-row-cell-course").textContent=`${a.Cur_OfficialRate} / ${a.Cur_Scale}`,l.querySelector(".taxes__table-body-row-cell-sum").textContent=s.toFixed(2);const d=l.querySelector(".taxes__table-body-row-cell-tax"),u=s/100*c;if(d.textContent=u.toFixed(2),e===n){const e=(t/100*c).toFixed(2);this.setTotalTax(e),this.setDisabledSaveButton(!1)}}).catch(function(e){})}setTotalTax(e){const t=document.querySelector(".taxes__functional-result");t.classList.add("taxes__functional-result--hidden");const n=document.querySelector(".taxes__functional-result-sum");let r="";e&&(r=`${e} BYN`,t.classList.remove("taxes__functional-result--hidden")),n.textContent=r}clickRemoveHandler(e){const t=e.target;if(t.classList.contains("taxes__table-body-row-field-remove")){const e=t.closest(".taxes__table-body-row"),n=+e.id.split("tax_")[1];this.removeTax(n),this.removeTaxElement(e),this.setTotalTax(null),this.setDisabledSaveButton(!0),this.taxesList.length||this.addTaxHtml()}}removeTax(e){let t=null;for(let n=0;n<this.taxesList.length;n++)if(this.taxesList[n].id===e){t=n;break}isNaN(t)||this.taxesList.splice(t,1)}removeTaxElement(e){e.parentNode.removeChild(e)}formatInputIncome(e){const t=e.target;t.classList.contains("taxes__table-body-row-cell-income")&&(t.value=t.value.replace(/[^\d,.]*/g,"").replace(/([,.])[,.]+/g,"$1").replace(/^[^\d]*(\d+([.,]\d{0,2})?).*$/g,"$1"))}focusOutHandler(e){const t=e.target,n=e.relatedTarget;this.refreshData(t,n)}refreshData(e,t){const n=e.closest(".taxes__table-body-row");let r=+n.id.split("tax_")[1],o=this.filterTaxes(r),a=!1;if(e.closest(".cell"),o)if(e.classList.contains("taxes__table-body-row-cell-date"))a=this.isChangeData(o.date,e.value),o.date=e.value;else if(e.classList.contains("taxes__table-body-row-cell-income")){a=this.isChangeData(o.income,e.value);const t=+e.value;e.value=t,o.income=t}else e.classList.contains("taxes__table-body-row-cell-currency")&&(a=this.isChangeData(o.currency,e.value),o.currency=e.value);a&&(this.setTotalTax(null),this.setDisabledSaveButton(!0),this.clearFields(n))}clearFields(e){e.querySelector(".taxes__table-body-row-cell-course").textContent="0.00 / 0",e.querySelector(".taxes__table-body-row-cell-sum").textContent="0.00",e.querySelector(".taxes__table-body-row-cell-tax").textContent="0.00"}isChangeData(e,t){let n=!1;return e!==t&&(n=!0),n}filterTaxes(e){let t=null;for(let n=0;n<this.taxesList.length;n++)if(this.taxesList[n].id===e){t=this.taxesList[n];break}return t}addTaxHtml(){let e=this.getHyphenDateFromDate(new Date);this.taxesList.length&&(e=this.taxesList[this.taxesList.length-1].date);let t=new o(e,0,i[0].textCode);this.taxesList.push(t);const n=this.createTaxElement(t.id,t.date);document.querySelector(".taxes__table-body").prepend(n);const r=n.querySelector(".taxes__table-body-row-cell-date");setTimeout(()=>{this.setFocus(r)},0),this.setTotalTax(null),this.setDisabledSaveButton(!0)}setFocus(e){e.focus()}createTaxElement(e,t){const n=this.createDateElement(t),r=this.createIncomeElement(),o=this.createCurrencyElement(),a=this.createCourseElement(),s=this.createSumElement(),i=this.createTaxItemElement(),l=this.createBtnRemoveElement(),c=document.createElement("div");return c.classList.add("taxes__table-body-row"),c.appendChild(n),c.appendChild(r),c.appendChild(o),c.appendChild(a),c.appendChild(s),c.appendChild(i),c.appendChild(l),c.id=`tax_${e}`,c}getDDMMYYYYFromDate(e){return{day:e.getDate(),month:e.getMonth()+1,year:e.getFullYear()}}getHyphenDateFromDate(e){const t=this.getDDMMYYYYFromDate(e);return this.getHyphenDateFromDDMMYYYY(t)}getHyphenDateFromDDMMYYYY(e){let{day:t,month:n,year:r}=e;return t<10&&(t=`0${t}`),n<10&&(n=`0${n}`),`${r}-${n}-${t}`}createDateElement(e){const t=document.createElement("input");t.classList.add("taxes__table-body-row-cell-field","taxes__table-body-row-cell-date"),t.type="date",t.name="date",t.autocomplete="off",t.setAttribute("required","true"),t.value=e,t.min="2016-01-01",t.max=this.getHyphenDateFromDate(new Date);const n=document.createElement("div");return n.classList.add("taxes__table-body-row-cell","taxes__table-body-row-date"),n.appendChild(t),n}createIncomeElement(){const e=document.createElement("input");e.classList.add("taxes__table-body-row-cell-field","taxes__table-body-row-cell-income","taxes__table-body-row-cell-field--money"),e.type="text",e.setAttribute("required","true"),e.value="0.00",e.autocomplete="off";const t=document.createElement("div");return t.classList.add("taxes__table-body-row-cell","taxes__table-body-row-income"),t.appendChild(e),t}createCurrencyElement(){const e=document.createElement("select");e.classList.add("taxes__table-body-row-cell-field","taxes__table-body-row-cell-currency"),e.name="currency",e.setAttribute("required","true");for(let t=0;t<i.length;t++){let n=this.createOptionCurrency(i[t].text,i[t].textCode);e.appendChild(n)}const t=document.createElement("div");return t.classList.add("taxes__table-body-row-cell","taxes__table-body-row-currency"),t.appendChild(e),t}createOptionCurrency(e,t){let n=document.createElement("option");return n.value=t,n.innerHTML=e,n}createCourseElement(){const e=document.createElement("span");e.classList.add("taxes__table-body-row-cell-field","taxes__table-body-row-cell-course","taxes__table-body-row-cell-field--money","taxes__table-body-row-cell-field--only-read"),e.textContent="0.00 / 0",e.tabIndex=-1;const t=document.createElement("div");return t.classList.add("taxes__table-body-row-cell","taxes__table-body-row-course"),t.appendChild(e),t}createSumElement(){const e=document.createElement("span");e.classList.add("taxes__table-body-row-cell-field","taxes__table-body-row-cell-sum","taxes__table-body-row-cell-field--money","taxes__table-body-row-cell-field--only-read"),e.textContent="0.00",e.tabIndex=-1;const t=document.createElement("div");return t.classList.add("taxes__table-body-row-cell","taxes__table-body-row-sum"),t.appendChild(e),t}createTaxItemElement(){const e=document.createElement("span");e.classList.add("taxes__table-body-row-cell-field","taxes__table-body-row-cell-tax","taxes__table-body-row-cell-field--money","taxes__table-body-row-cell-field--only-read"),e.textContent="0.00",e.tabIndex=-1;const t=document.createElement("div");return t.classList.add("taxes__table-body-row-cell","taxes__table-body-row-tax"),t.appendChild(e),t}createBtnRemoveElement(){const e=document.createElement("button");e.classList.add("taxes__table-body-row-field-remove"),e.type="button";const t=document.createElement("div");return t.classList.add("taxes__table-body-row-cell","taxes__table-body-row-remove"),t.appendChild(e),t}}}]);