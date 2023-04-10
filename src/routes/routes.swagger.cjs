const routerSwagger = require("express").Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

routerSwagger.use("/", swaggerUi.serve);
routerSwagger.get("/", swaggerUi.setup(swaggerDocument));

module.exports = routerSwagger;
