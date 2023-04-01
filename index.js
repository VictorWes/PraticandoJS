import express from "express";
import router from "./src/routes/routes.user.js";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";
import routerAuth from "./src/routes/routes.auth.js";

dotenv.config();
const app = express();
connectDatabase();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.use("/create", router);
app.use("/findall", router);
app.use("/", router);
app.use("/auth", routerAuth);
