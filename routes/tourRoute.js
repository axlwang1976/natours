const express = require('express');

const { protect, restrickTo } = require('../controllers/authController');
const {
  getTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopFive,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages
} = require('../controllers/tourController');
const reviewRouter = require('./reviewRoute');

const router = express.Router();
// router.param('id', checkId);

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-five-tours').get(aliasTopFive, getTours);

router.route('/tour-stats').get(getTourStats);

router
  .route('/monthly-plan/:year')
  .get(protect, restrickTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getTours)
  .post(protect, restrickTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrickTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protect, restrickTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
