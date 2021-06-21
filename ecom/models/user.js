const express = require('express');
const mongoose = require('mongoose');
const { uuid } = require('uuidv4');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      deafult: [],
    },
  },
  { timestamps: true }
);

// Virtual Fields
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainTex) {
    return this.encryptPassword(plainTex) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) {
      return '';
    } else {
      try {
        return crypto
          .createHmac('sha1', this.salt)
          .update(password)
          .digest('hex');
      } catch (error) {
        return '';
      }
    }
  },
};

module.exports = mongoose.model('User', userSchema);
