import bcrypt from "bcrypt";
import validIdService from "../services/service.auth.js";

const validLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkLoginEmail = await validIdService(email);

    if (!checkLoginEmail) {
      return res.status(400).send({ message: "Usuario ou senha invalido" });
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkLoginEmail.password
    );

    if (!checkPassword) {
      return res.status(400).send({ message: "Usuario ou senha invalida" });
    }
    res.status(200).send({ message: "Usuario logado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default validLoginController;
