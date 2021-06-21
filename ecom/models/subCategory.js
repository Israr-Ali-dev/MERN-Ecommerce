const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
subCategorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
subCategorySchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
