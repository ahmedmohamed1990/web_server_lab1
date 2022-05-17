const User = require('../model/Users');

module.exports = {
  findUserByID: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user === null) {
      return next({ status: 'failure', message: 'user not found' });
    }res.json({
      status: 'success',
      data: user,
    })
  },
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.json({
      status: 'success',
      data: users,
    });
  },
  createUser: async (req, res) => {
    const { username, dob, isSuspended } = req.body;
    const user = await User.create({
      username,
      dob,
      isSuspended,
    });
    res.json({
      status: 'user is create success',
      data: user,
    });
  },
  deleteUser: async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: 'user id delete success',
      data: null,
    });
  },
  updateUser: async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      new: true,
      
    });
    res.status(200).json({
      status: 'user is update success',
      data: {
        user: updatedUser,
      },
    });
  },
  susbend:async(req,res,next)=>{
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
       $set: {isSuspended: true} , 
             new: true 
    });
    res.status(200).json({
      status: 'user is susbend',
      data: {
        user: updatedUser,
      },
    });
  },
  unsusbend:async(req,res,next)=>{
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
       $set: {isSuspended: false} , 
             new: true 
    });
    res.status(200).json({
      status: 'user is unsusbend',
      data: {
        user: updatedUser,
      },
    });
  }

};