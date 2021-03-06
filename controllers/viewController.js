const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', { title: 'All Tours', tours });
});

exports.getTourDetail = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('Wrong tour name', 404));
  }

  res.status(200).render('tour', { title: `${tour.name} Tour`, tour });
});

exports.login = (req, res) => {
  res.status(200).render('login', { title: 'Log In' });
};

exports.account = (req, res) => {
  res.status(200).render('account', { title: 'My Account' });
};

exports.getMyTours = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIds = bookings.map(booking => booking.tour);

  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', { title: 'My Tours', tours });
});
