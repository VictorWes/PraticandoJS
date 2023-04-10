import mongoose from "mongoose";
import novoCadastroService from "../services/service.user.js";
import findAllService from "../services/service.user.js";
import findByIdService from "../services/service.user.js";
import alterarCadastroService from "../services/service.user.js";
const cadastroCliente = async (req, res) => {
  try {
    let { name, username, password, email, avatar, background } = req.body;

    if (!name || !username || !password || !email || !avatar || !background) {
      res
        .status(400)
        .send({ message: "Por favor preencha o campo corretamente cadastro" });
    }

    const criarCadastro = await novoCadastroService.novoCadastroService(
      req.body
    );

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
        avatar,
        background
      },
      message: "Usuario criado com sucesso",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const todosID = await findAllService.findAllService();

    if (todosID.length > 0) {
      res.status(200).send(todosID);
    } else {
      res.status(400).send({ message: "Não foi encontrado ID" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findByIdController = async (req, res) => {
  try {
    const id = req.params.id;

    const findUniqueId = await findByIdService.findByIdService(id);

    res.status(200).send(findUniqueId);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAndRenameController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID não é valido" });
    }

    const finduser = await findByIdService.findByIdService(id);

    if (!finduser) {
      return res.status(400).send({ message: "Usuario não encontrado" });
    }

    let { name, username, password, email, avatar, background } = req.body;

    if (!name && !username && !password && !email && !avatar && !background) {
      res
        .status(400)
        .send({ message: "Por favor preencha o campo corretamente" });
    }

    await alterarCadastroService.alterarCadastroService(
      id,
      name,
      username,
      password,
      email,
      avatar,
      background
    );

    res.status(200).send({ message: "Usuario atualizado" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export default {
  cadastroCliente,
  findAll,
  findByIdController,
  findAndRenameController,
};
