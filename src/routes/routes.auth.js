import { Router } from "express";
import validLoginController from "../controller/controller.auth.js";

const routerAuth = Router();

routerAuth.post("/login", validLoginController);

export default routerAuth;
