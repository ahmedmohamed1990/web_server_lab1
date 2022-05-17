const ARTICLE = require('../model/Article');
const { catchAsync } = require('../utils/util');


module.exports = {
  findArticleByID: async (req, res, next) => {
    const { id } = req.params;
    const article = await ARTICLE.findById(id);
    if (article === null) {
      return next({ status: 'failure', message: 'article not found' });
    }
    req.article = article;
    next();
  },
  getAllArticles: (req, res) => {
    ARTICLE.find()
      .then((data) => {
        console.log("db is here");
        console.log(data);
        let query = JSON.stringify(req.query);
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },
  getArticleByID: catchAsync(async (req, res) => {
    res.json({
      status: 'success',
      data: req.article,
    });
  }),
  createArticle: catchAsync(async (req, res) => {
    const article = await ARTICLE.create(req.body);
    res.json({
      status: 'sucess',
      data: article,
    });
  }),
  updateArticle: catchAsync(async (req, res) => {
    const { id } = req.params;
    //fe option f find by id and update asmo new: true 3shan y3dl f l 7aga bt3ty
    const article = await ARTICLE.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      status: 'success',
      data: article,
    });
    console.log('user updated');
  }),
  deleteArticle: catchAsync(async (req, res) => {
    const { id } = req.params;
    await ARTICLE.findByIdAndDelete(id);
    res.status(204).json({ message: 'Success' });
    console.log('user deleted');
  }),
};