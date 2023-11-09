// project-a/index.js
const _ = require('lodash');

const componentA = () => {
  console.log('This is component A with Lodash version:', _.VERSION);
};

module.exports = componentA;
