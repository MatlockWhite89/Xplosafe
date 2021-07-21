process.env.NODE_ENV = "production";
process.env.API_URL = "https://xplodemo.longwaveinc.com/api";
process.env.DB_CONFIG = JSON.stringify({
  // Host name for database connection:
  host: "xplo-db-2.cjqsaluhovy7.us-east-2.rds.amazonaws.com",
  // Database user:
  user: "admin",
  // Password for the above database user:
  password: "Longwave1",
  // Database name:
  database: "xplosafedb",
  // Port number for database connection:
  port: 3306,
  // Whether or not to automatically check for and clear expired sessions:
  clearExpired: true,
  // How frequently expired sessions will be cleared; milliseconds:
  checkExpirationInterval: 900000,
  // The maximum age of a valid session; milliseconds:
  expiration: 86400000,
  // Whether or not to create the sessions database table, if one does not already exist:
  createDatabaseTable: true,
  // Number of connections when creating a connection pool:
  connectionLimit: 1,
  // Whether or not to end the database connection when the store is closed.
  // The default value of this option depends on whether or not a connection was passed to the constructor.
  // If a connection object is passed to the constructor, the default value for this option is false.
  endConnectionOnClose: true,
  charset: "utf8mb4_bin",
});
