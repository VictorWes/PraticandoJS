import newCliente from "../models/model.user.js";

const validIdService = (email) =>
  newCliente.findOne({ email: email }).select("+password");

export default validIdService;
