import express from "express";
import router from "./src/routes/routes.user.js";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";
import routerAuth from "./src/routes/routes.auth.js";
import routerNews from "./src/routes/routes.news.js";
import routerSwagger from "./src/routes/routes.swagger.cjs";

dotenv.config();
const app = express();
connectDatabase();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

app.use("/createnova", routerNews);
app.use("/feednews", routerNews);
app.use("/news", routerNews);

app.use("/create", router);
app.use("/findall", router);
app.use("/", router);

app.use("/auth", routerAuth);

app.use("/doc", routerSwagger);
