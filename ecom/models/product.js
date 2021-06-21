const mongoose = require('mongoose');
const mongooseFindAndFilter = require('mongoose-find-and-filter');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategory: {
      type: ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    collections: {
      type: ObjectId,
      ref: 'Collections',
      required: true,
    },
    cases: {
      type: ObjectId,
      ref: 'Cases',
      required: true,
    },
    model: {
      type: ObjectId,
      ref: 'phoneModel',
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: String,
      contentType: String,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set('toJSON', {
  virtuals: true,
});

// attach mongoose-find-and-filter plugin to userSchema
productSchema.plugin(mongooseFindAndFilter);

module.exports = mongoose.model('Product', productSchema);
