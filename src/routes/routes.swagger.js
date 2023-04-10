import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };


const routerSwagger = Router();

routerSwagger.use("/", swaggerUi.serve);
routerSwagger.get("/", swaggerUi.setup(swaggerDocument) );

export default routerSwagger