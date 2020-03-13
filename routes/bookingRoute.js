const express = require('express');

const { protect, restrickTo } = require('../controllers/authController');
const {
  getCheckoutSession,
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(restrickTo('admin', 'lead-guide'));

router
  .route('/')
  .get(getAllBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
