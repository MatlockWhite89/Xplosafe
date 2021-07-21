let environment = process.env.NODE_ENV;
let isProduction = environment === "production";
let config = process.env.DB_CONFIG;

if (!isProduction) {
  console.log("Exporting development MySQL Pool.");
} else {
  console.log("Exporting production MySQL Pool.");
}

const mysql = require("mysql");
let pool = mysql.createPool(JSON.parse(config));
module.exports = {
  query: (queryText, params, callback) => {
    if (!isProduction) {
      console.log("\nQUERY_TEXT: " + queryText);
      if (params !== null) {
        console.log("PARAMS: " + params);
      }
      // if (callback) {
      //   console.log("CALLBACK: " + callback);
      // }
    }

    return pool.query(queryText, params, callback);
  },
};
