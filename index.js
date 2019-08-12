'use strict';
const periodic = require('periodicjs');

periodic
  .init({
    debug: true,
    skip_reconfig: true,
  })
  .then(periodicInitStatus => {
    console.log({ periodicInitStatus });
  })
  .catch(e => {
    console.error(e);
  });