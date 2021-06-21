const express = require('express');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    subcategory: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
categorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
categorySchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Category', categorySchema);
