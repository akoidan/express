const {generatePassword} = require('./utils');

generatePassword("test").then(pass => {
  console.log(pass)
})
