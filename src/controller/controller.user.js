import mongoose from "mongoose";
import novoCadastroService from "../services/service.user.js";
import findAllService from "../services/service.user.js";
import findByIdService from "../services/service.user.js";
import alterarCadastroService from "../services/service.user.js";
const cadastroCliente = async (req, res) => {
  let { name, username, password, email } = req.body;

  if (!name || !username || !password || !email) {
    res
      .status(400)
      .send({ message: "Por favor preencha o campo corretamente" });
  }

  const criarCadastro = await novoCadastroService.novoCadastroService(req.body);

  if (!criarCadastro) {
    return res.status(400).send({ message: "Erro ao criar usuario" });
  }

  res.status(200).send({
    user: {
      id: criarCadastro._id,
      name,
      username,
      password,
      email,
    },
    message: "Usuario criado com sucesso",
  });
};

const findAll = async (req, res) => {
  const todosID = await findAllService.findAllService();

  if (todosID.length > 0) {
    res.status(200).send(todosID);
  } else {
    res.status(400).send({ message: "Não foi encontrado ID" });
  }
};

const findByIdController = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID não é valido" });
  }

  const findUniqueId = await findByIdService.findByIdService(id);

  if (!findUniqueId) {
    return res.status(400).send({ message: "Usuario não encontrado" });
  }

  res.status(200).send(findUniqueId);
};

const findAndRenameController = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID não é valido" });
  }

  const finduser = await findByIdService.findByIdService(id);

  if (!finduser) {
    return res.status(400).send({ message: "Usuario não encontrado" });
  }

  let { name, username, password, email } = req.body;

  if (!name && !username && !password && !email) {
    res
      .status(400)
      .send({ message: "Por favor preencha o campo corretamente" });
  }

  await alterarCadastroService.alterarCadastroService(
    id,
    name,
    username,
    password,
    email
  );

  res.status(200).send({ message: "Usuario atualizado" });
};
export default {
  cadastroCliente,
  findAll,
  findByIdController,
  findAndRenameController,
};
