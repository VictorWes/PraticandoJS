import { Router } from "express";
import {
  createNewsController,
  todasNews,
  bannerTopNews,
  findByIdController,
  searchNewsController,
  findNewsByUser,
  updateNewsController,
  eraseNewsControler,
  likenews,
  commentsController,
  deleteComment,
} from "../controller/controller.news.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const routerNews = Router();

routerNews.get("", todasNews);
routerNews.post("/news", authMiddleware, createNewsController);
routerNews.get("/top", bannerTopNews);
routerNews.get("/search", searchNewsController);
routerNews.get("/findnewsbyuser", authMiddleware, findNewsByUser);
routerNews.get("/:id", authMiddleware, findByIdController);
routerNews.patch("/:id", authMiddleware, updateNewsController);
routerNews.delete("/:id", authMiddleware, eraseNewsControler);
routerNews.patch("/like/:id", authMiddleware, likenews);
routerNews.patch("/comments/:id", authMiddleware, commentsController);
routerNews.patch("/comments/:idNews/:idComment", authMiddleware, deleteComment);
export default routerNews;
