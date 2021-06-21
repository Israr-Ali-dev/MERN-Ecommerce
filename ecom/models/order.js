const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

const CartItem = mongoose.model('CartItem', CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: 'Not processed',
      enum: [
        'Not processed',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
      ], // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Duplicate the ID field.
OrderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
OrderSchema.set('toJSON', {
  virtuals: true,
});

const Orders = mongoose.model('Orders', OrderSchema);

module.exports = { Orders, CartItem };
