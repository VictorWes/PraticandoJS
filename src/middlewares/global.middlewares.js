import mongoose from "mongoose";
import findByIdService from "../services/service.user.js";

export const validId = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid id!" });
  }

  next();
};

export const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await findByIdService.findByIdService(id);

  if (!user) {
    return res.status(400).send({
      message: "User not found",
    });
  }

  next();
};


