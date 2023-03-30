import newCliente from "../models/model.user.js";

const novoCadastroService = (body) => newCliente.create(body);
const findAllService = () => newCliente.find();
const findByIdService = (id) => newCliente.findById(id);
const alterarCadastroService = (id, name, username, password, email) =>
  newCliente.findOneAndUpdate({ _id: id }, { name, username, password, email });

export default {
  novoCadastroService,
  findAllService,
  findByIdService,
  alterarCadastroService,
};
