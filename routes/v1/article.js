const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleByID,
  createArticle,
  updateArticle,
  deleteArticle,
  findArticleByID,
} = require('../../controler/article');



router.route('/').get(getAllArticles).post(createArticle);
router.get('/:id', findArticleByID);
router.route('/:id').get(getArticleByID).patch(updateArticle).delete(deleteArticle);

module.exports = router;