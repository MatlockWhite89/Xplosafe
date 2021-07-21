/**
 * Server Automatic start and restart requirements.
 */

let pm2 = require("pm2");
let environment = process.env.NODE_ENV;
let isProduction = environment === "production";

/**
 * Server Automatic start and restart functionality.
 */

pm2.connect(function (err) {
  console.log("Connect called");
  if (err) {
    console.log(err);
    process.exit(2);
  }
  pm2.list((err, list) => {
    if (!isProduction) {
      console.log(err, list);
    } else {
      // swallow
    }
  });

  pm2.stop("bin/www", (err, proc) => {
    console.log("Ending Backend Call.");
  });

  pm2.restart("bin/www", (err, proc) => {
    console.log("Restarting the Backend.");
  });

  pm2.start(
    {
      script: "bin/www",
      interpreter: "node",
      kill_timeout: "1600",
      exec_mode: "fork",
      instances: 1,
      max_memory_restart: "100G",
    },
    function (err, apps) {
      console.log("Started.");
      pm2.disconnect();
      if (err) {
        pm2.disconnect();
        throw err;
      }
    }
  );
});
