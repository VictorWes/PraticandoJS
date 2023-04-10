import {
  createNews,
  findall,
  countNews,
  topNews,
  findByIdNews,
  findAllSearch,
  findNewsByUserService,
  updateNewsService,
  eraseNews,
  likeNewsService,
  deleteLikeService,
  createCommentService,
  deleteCommentsService,
} from "../services/service.news.js";
const createNewsController = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createNews({
      title,
      text,
      banner,
      user: { _id: "642f157ba5f109245f88b36f" },
    });

    res.status(201).send({ message: "Noticia criada" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const todasNews = async (req, res) => {
  let { limit, offset } = req.query;

  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const findallNews = await findall(limit, offset);
  const total = await countNews();
  const curretUrl = req.baseUrl;

  const next = limit + offset;

  const nextUrl =
    next < total ? `${curretUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${curretUrl}?limit=${limit}&offset=${previous}` : null;

  if (findallNews.length === 0) {
    return res.status(400).send({
      message: "Não existe news a serem mostradas",
    });
  }

  res.send({
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    result: findallNews.map((item) => ({
      id: item._id,
      title: item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name: item.user.name,
      username: item.user.username,
      userAvatar: item.user.avatar,
    })),
  });
};

const bannerTopNews = async (req, res) => {
  try {
    const noticiaTopo = await topNews();

    if (!noticiaTopo) {
      return res
        .status(400)
        .send({ message: "Não foi possivel localizar a noticia" });
    }

    res.send({
      news: {
        id: noticiaTopo._id,
        title: noticiaTopo.title,
        text: noticiaTopo.text,
        banner: noticiaTopo.banner,
        likes: noticiaTopo.likes,
        comments: noticiaTopo.comments,
        name: noticiaTopo.user.name,
        username: noticiaTopo.user.username,
        userAvatar: noticiaTopo.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const findNewsIdController = await findByIdNews(id);

    res.send({
      news: {
        id: findNewsIdController._id,
        title: findNewsIdController.title,
        text: findNewsIdController.text,
        banner: findNewsIdController.banner,
        likes: findNewsIdController.likes,
        comments: findNewsIdController.comments,
        name: findNewsIdController.user.name,
        username: findNewsIdController.user.username,
        userAvatar: findNewsIdController.user.avatar,
      },
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const searchNewsController = async (req, res) => {
  const { title } = req.query;

  const findNewsSearch = await findAllSearch(title);

  if (findNewsSearch === 0) {
    return res
      .status(400)
      .send({ message: "Não foi possivel localizar nenhuma noticia" });
  }

  return res.send({
    result: findNewsSearch.map((item) => ({
      id: item._id,
      title: item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name: item.user.name,
      username: item.user.username,
      userAvatar: item.user.avatar,
    })),
  });
};

const findNewsByUser = async (req, res) => {
  const id = req.userId;

  const newsByUser = await findNewsByUserService(id);

  return res.send({
    result: newsByUser.map((item) => ({
      id: item._id,
      title: item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name: item.user.name,
      username: item.user.username,
      userAvatar: item.user.avatar,
    })),
  });
};

const updateNewsController = async (req, res) => {
  const { title, text, banner } = req.body;
  const { id } = req.params;

  if (!title && !text && !banner) {
    res.status(400).send({
      message: "Por favor preencha pelo menos um dos campos solicitados",
    });
  }

  const newsUpdate = await findByIdNews(id);

  if (newsUpdate.user._id != req.userId) {
    return res
      .status(400)
      .send({ message: "Você não esta autorizado a realizar essa alteração" });
  }

  await updateNewsService(id, title, text, banner);
  return res.status(200).send({ message: "News atualizada com sucesso" });
};

const eraseNewsControler = async (req, res) => {
  const { id } = req.params;

  const findIdErase = await findByIdNews(id);

  if (findIdErase.user._id != req.userId) {
    return res
      .status(400)
      .send({ message: "Você não esta autorizado a realizar essa alteração" });
  }

  await eraseNews(id);

  return res.send({ message: "News deleta com sucesso" });
};

const likenews = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const newsLiked = await likeNewsService(id, userId);

  if (!newsLiked) {
    await deleteLikeService(id, userId);
    return res.status(200).send({ message: "Like sucessfull removed" });
  }

  res.send({ message: "Like Done sucessfully" });
};

const commentsController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comments } = req.body;

    if (!commentsController) {
      return res.status(400).send({ message: "Escreva uma mensagem" });
    }

    await createCommentService(id, comments, userId);

    res.send({ message: "Comentario cirado com sucesso" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted  = await deleteCommentsService(
      idNews,
      idComment,
      userId
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
      return res.status(404).send({ message: "Comment not found" });
    }

    res.send({ message: "Comentario deletado com sucesso" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export {
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
};
