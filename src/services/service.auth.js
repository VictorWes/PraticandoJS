import newCliente from "../models/model.user.js";
import jwt from "jsonwebtoken"

const validIdService = (email) =>
  newCliente.findOne({ email: email }).select("+password");

  const jwtWebValid = (id) => jwt.sign({id: id}, process.env.JWT_TOKEN, {expiresIn: 86400} )
export  {validIdService, jwtWebValid};
