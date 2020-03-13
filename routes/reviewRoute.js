const express = require('express');

const { protect, restrickTo } = require('../controllers/authController');
const {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getReviews)
  .post(restrickTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .delete(restrickTo('user', 'admin'), deleteReview)
  .patch(restrickTo('user', 'admin'), updateReview)
  .get(getReview);

module.exports = router;
