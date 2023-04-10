import modelNews from "../models/model.news.js";

const createNews = (body) => modelNews.create(body);
const findall = (limit, offset) =>
  modelNews.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countNews = () => modelNews.countDocuments();
const topNews = () => modelNews.findOne().sort({ _id: -1 }).populate("user");
const findByIdNews = (id) => modelNews.findById(id).populate("user");
const findAllSearch = (title) =>
  modelNews
    .find({ title: { $regex: `${title || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");

const findNewsByUserService = (id) =>
  modelNews.find({ user: id }).sort({ _id: -1 }).populate("user");

const updateNewsService = (id, title, text, banner) =>
  modelNews.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const eraseNews = (id) => modelNews.findOneAndDelete({ _id: id });

const likeNewsService = (idNews, userId) =>
  modelNews.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

const deleteLikeService = (idNews, userId) =>
  modelNews.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

const createCommentService = (idNews, comments, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return modelNews.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, userId, comments, createdAt: new Date() },
      },
    }
  );
};

const deleteCommentsService = (idNews, idComment, userId) =>
  modelNews.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } }
  );

export {
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
};
