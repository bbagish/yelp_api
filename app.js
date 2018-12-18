const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/cors")(app);
require("./startup/db")();
require("./startup/seeds")();
require("./startup/routes")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
