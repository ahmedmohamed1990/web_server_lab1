// const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true,


    },
    username: {
        type: String,
        required: true,
      },
      date:{
          type:Date

      },
      article: {
        type: mongoose.Types.ObjectId,
        ref: 'articles',
        required: [true, 'article is required'],
      },
},
{ timestamps: true });

    const Comment = mongoose.model('Comment', commentSchema);
    module.exports = Comment;    