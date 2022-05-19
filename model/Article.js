
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
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
      
        type: mongoose.Types.ObjectId,
        required: [true, "comment required"],
        ref: "Comment",
        
     
    },
  ],
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;