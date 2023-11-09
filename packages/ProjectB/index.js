// project-b/index.js
const componentA = require('@my-monorepo/project-a');
const axios = require('axios');

componentA();

axios.get('https://api.github.com/users/github')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
