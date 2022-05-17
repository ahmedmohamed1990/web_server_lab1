const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
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

      }
},
{ timestamps: true });

    const Comment = model('Comment', commentSchema);
    module.exports = Comment;    