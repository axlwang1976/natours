const express = require('express');

const {
  getUsers,
  getMe,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  uploadPhoto,
  resizePhoto
} = require('../controllers/userController');
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updatePassword,
  protect,
  restrickTo,
  logout
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.post('/forgetPassword', forgetPassword);

router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.patch('/updatePassword', updatePassword);

router.patch('/updateMe', uploadPhoto, resizePhoto, updateMe);

router.delete('/deleteMe', deleteMe);

router.get('/me', getMe, getUser);

router.use(restrickTo('admin'));

router.route('/').get(getUsers);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
