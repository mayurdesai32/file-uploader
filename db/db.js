const { Sequelize } = require("sequelize");
// const mysql = require("mysql2");
// const pool = mysql.createPool({
//   // host: "",
//   // user: "",
//   // database: "",
//   // password: "",

//   host: process.env.DBHOST,
//   user: process.env.DBUSER,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.DBPORT,
// });
console.log(process.env.DATABASE, process.env.DBUSE, process.env.PASSWORD);
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DBHOST,
  }
);
 
module.exports = sequelize;
