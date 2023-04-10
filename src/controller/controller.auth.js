import bcrypt from "bcrypt";
import { validIdService, jwtWebValid } from "../services/service.auth.js";

const validLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkLoginEmail = await validIdService(email);
    if (!checkLoginEmail) {
      return res
        .status(400)
        .send({ message: "Email invalido ou senha invalida" });
    }
    const checkPassword = await bcrypt.compareSync(
      password,
      checkLoginEmail.password
    );

    if (!checkPassword) {
      return res
        .status(400)
        .send({ message: " Email invalido ou senha invalida" });
    }

    const checkJwt = jwtWebValid(checkLoginEmail.id);

    res.status(200).send({ checkJwt });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { validLoginController };
