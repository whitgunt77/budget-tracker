const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);