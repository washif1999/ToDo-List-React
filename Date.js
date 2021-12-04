const moment = require('moment');
let now = moment("2021-11-26T10:44:00.000Z");
console.log(now.date());
console.log(now.format("Do MMMM YYYY") + " at "+ now.format("HH:mm:ss"));
