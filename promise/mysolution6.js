'use strict'

require('es6-promise');

var promise1 = Promise.resolve('FULFILLED');

var promise2 = Promise.reject('NOT FULFILLED');

var promise3 = new Promise(function(fulfill, reject) {
  reject('REJECTED');
});

promise1.then(console.log);
promise2.catch(console.log);
promise3.catch(console.log);