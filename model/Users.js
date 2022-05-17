const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
   dob:{
     type:Date,
     required:[true,"please enter your date of birth"]
   },
    

    isSuspended:{
      type:Boolean,
      default:false,
    },
  
  },
  { timestamps: true }
);



const User = model('User', userSchema);
module.exports = User;
