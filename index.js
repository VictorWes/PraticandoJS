import express from "express";
import router from "./src/routes/routes.user.js";
import connectDatabase from "./src/database/database.js";
const app = express();
connectDatabase();
const port = 3000;
app.use(express.json());
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.use("/create", router);
app.use("/findall", router);
app.use("/", router);
