const express = require('express');
const { config } = require('./config/config');
const routingBuilder = require('./src/services/routing.builder');
const { routes, roles } = require('./config/routes.config');

const app = express();

routingBuilder(app, routes, roles, config);

app.listen(config.port, () => {
  console.log('App running in port ' +  config.port);
});