const express = require('express');
const mongoose = require('mongoose');

const casesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    photo: {
      data: String,
      contentType: String,
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
casesSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
casesSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Cases', casesSchema);
