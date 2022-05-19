const Comment = require('../model/Comments');
const { catchAsync } = require('../utils/util');
const ARTICLE = require('../model/Article');
module.exports = {
  findcommentByID: async (req, res) => {
    const { id } = req.params;
    const comment = await  Comment.findById(id);
    if (comment === null) {
      return next({ status: 'failure', message: 'user not found' });
    }res.json({
      status: 'success',
      data: comment,
    })
  },
  getCommentByID: catchAsync(async (req, res) => {
    res.json({
      status: 'success',
      data: req.comment,
    });
  }),
  getAllComments: async (req, res) => {
    const comments = await  Comment.find();
    res.json({
      status: 'success',
      data: comments,
    });
  },
  createComment: async (req, res,next) => {
    const { username, content,date,article } = req.body;
    const articleRelated = await ARTICLE.findById(article);
  if (!articleRelated) next();
    const comment = await  Comment.create({
        content,
        username,
        date,
        article,
    });
    articleRelated.comments.push(comment);
    await articleRelated.save();
    res.json({
      status: 'comment is create success',
      data: comment,
    });
  },
  deleteComment: async (req, res, next) => {
    await Comment.findByIdAndUpdate(req.comment.id, { active: false });
    res.status(204).json({
      status: 'comment is delete success',
      data: null,
    });
  },
  updateComment: async (req, res, next) => {
    const updatedComment = await User.findByIdAndUpdate(req.user.id, {
      new: true,
      
    });
    res.status(200).json({
      status: 'comment is update success',
      data: {
        user: updatedComment,
      },
    });
  },
 
 

};