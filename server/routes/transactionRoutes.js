const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
router.get('/', async (req, res) => {
  try {
    console.log("Fetching transactions from DB...");
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc    Add a transaction
// @route   POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete transaction" });
    }
})

module.exports = router;