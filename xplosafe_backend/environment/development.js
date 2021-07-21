process.env.NODE_ENV = "development";
process.env.API_URL = "http://xplosafe:8080/api";
process.env.DB_CONFIG = JSON.stringify({
  host: "xplosafe",
  user: "xplouser",
  password: "Longwave1",
  database: "xplosafedb",
  port: 3301,
});
