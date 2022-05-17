const express = require('express');
const router = express.Router();
const {
  getAllComments,
  
  createComment,
  updateComment,
  deleteComment,
  findcommentByID,
} = require('../../controler/comment');



router.route('/').get(getAllComments).post(createComment);
router.get('/:id',findcommentByID);
router.route('/:id').patch(updateComment).delete(deleteComment);

module.exports = router;