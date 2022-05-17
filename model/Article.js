
const { Schema, model,mongoose  } = require('mongoose');

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'article title must be required'],
    unique: true,
  },
  body:{ type:String,
  required:[true,"please enere article body"]
  
  },
  comments: [
    {
      comment: {
        type: mongoose.Types.ObjectId,
        required: [true, "comment required"],
        ref: "Comment",
      },
    },
  ],
});

const Article = model('Article', articleSchema);
module.exports = Article;