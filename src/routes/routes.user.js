import express from "express";
import findAll from "../controller/controller.user.js";
import cadastroCliente from "../controller/controller.user.js";
import findByIdController from "../controller/controller.user.js";
import findAndRenameController from "../controller/controller.user.js";
import { validUser, validId } from "../middlewares/global.middlewares.js";

const router = express.Router();

router.get("/:id", validId, validUser, findByIdController.findByIdController);
router.patch("/:id", findAndRenameController.findAndRenameController);
router.post("", cadastroCliente.cadastroCliente);
router.get("", findAll.findAll);

export default router;
