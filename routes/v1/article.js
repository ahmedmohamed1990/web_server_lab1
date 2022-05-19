const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleByID,
  createArticle,
  updateArticle,
  deleteArticle,
  findArticleByID,
  getArticleComments,
} = require('../../controler/article');



router.route('/').get(getAllArticles).post(createArticle);
router.get('/:id', findArticleByID);
router.route('/:id').get(getArticleByID).patch(updateArticle).delete(deleteArticle);
router.get("/:id/comments",getArticleComments );

module.exports = router;