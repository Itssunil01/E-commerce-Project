const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [{
    product: { type: Schema.Types.Mixed },
    qty: Number,
    lineTotal: Number
  }],
  total: Number,
  customer: {
    name: String,
    email: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
