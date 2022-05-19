const express = require('express');

const usersRouter = express.Router();
const {
  getAllUsers,
  findUserByID,
  createUser,
  deleteUser,
  updateUser,
  susbend,
  unsusbend,
  
} = require('../../controler/users');



usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', findUserByID);
usersRouter.post('/', createUser);
usersRouter.post('/:id/susbend',susbend);
usersRouter.post('/:id/unsusbend',unsusbend);

usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);


module.exports = usersRouter;