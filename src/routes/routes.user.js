import express from "express";
import findAll from "../controller/controller.user.js";
import cadastroCliente from "../controller/controller.user.js";
import findByIdController from "../controller/controller.user.js";
import findAndRenameController from "../controller/controller.user.js";
const router = express.Router();

router.post("", cadastroCliente.cadastroCliente);
router.get("", findAll.findAll);
router.get("/:id", findByIdController.findByIdController);
router.patch("/:id", findAndRenameController.findAndRenameController);

export default router;
