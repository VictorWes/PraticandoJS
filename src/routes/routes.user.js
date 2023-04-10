import express from "express";
import findAll from "../controller/controller.user.js";
import cadastroCliente from "../controller/controller.user.js";
import findByIdController from "../controller/controller.user.js";
import findAndRenameController from "../controller/controller.user.js";
import { validUser, validId } from "../middlewares/global.middlewares.js";

const router = express.Router();


router.patch("/:id", findAndRenameController.findAndRenameController);
router.post("/user", cadastroCliente.cadastroCliente);
router.get("/users", findAll.findAll);
router.get("/:id", validId, validUser, findByIdController.findByIdController);

export default router;
