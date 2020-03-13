const Review = require('../models/reviewModel');
const facroty = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }

  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  next();
};

exports.getReviews = facroty.getAll(Review);

exports.createReview = facroty.createOne(Review);

exports.deleteReview = facroty.deleteOne(Review);

exports.updateReview = facroty.updateOne(Review);

exports.getReview = facroty.getOne(Review);
