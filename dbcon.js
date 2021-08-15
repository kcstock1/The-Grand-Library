var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : '[my username]',
  password        : '[mypassword]',
  database        : 'cs340_stockke',
  multipleStatements: true

});
module.exports.pool = pool;

