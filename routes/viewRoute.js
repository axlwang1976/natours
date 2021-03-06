const express = require('express');

const { isLoggedIn, protect } = require('../controllers/authController');

const {
  getOverview,
  getTourDetail,
  login,
  account,
  getMyTours
} = require('../controllers/viewController');

const router = express.Router();

router.get('/', isLoggedIn, getOverview);

router.get('/tour/:slug', isLoggedIn, getTourDetail);

router.get('/login', isLoggedIn, login);

router.get('/me', protect, account);

router.get('/my-tours', protect, getMyTours);

module.exports = router;
