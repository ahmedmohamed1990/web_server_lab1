const express = require('express');
const router = express.Router();
const {
  getAllComments,
  getCommentByID,
  createComment,
  updateComment,
  deleteComment,
  findCommentByID,
} = require('../../controler/comment');



router.route('/').get(getAllComments).post(createComment);
router.get('/:id', findCommentByID);
router.route('/:id').get(getCommentByID).patch(updateComment).delete(deleteComment);

module.exports = router;