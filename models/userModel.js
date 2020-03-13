const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must have a name']
  },
  password: {
    type: String,
    required: [true, 'Must have a password'],
    trim: true,
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Must confirm password'],
    trim: true,
    validate: {
      // Only work on CREATE and SAVE
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  email: {
    type: String,
    required: [true, 'Must have a email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid E-mail']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  passwordChangedAt: Date,
  pwdResetToken: String,
  pwdResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    if (changedTimestamp > JWTTimestamp) {
      return true;
    }
  }
  return false;
};

userSchema.methods.createPwdResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.pwdResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.pwdResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
