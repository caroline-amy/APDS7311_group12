const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true },
  recipientAccount: { type: String, required: true },
  swiftCode: { type: String, required: true },
  status: { type: String, default: 'Pending' }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
