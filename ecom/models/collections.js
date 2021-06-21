const express = require('express');
const mongoose = require('mongoose');

const collectionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
collectionsSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
collectionsSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Collections', collectionsSchema);
