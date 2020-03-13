const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Must have a name'],
      unique: true,
      trim: true
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'Must have a difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Must be above 1.0'],
      max: [5, 'Must be below 5.0'],
      set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Must have a price']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'Must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
