import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.post('/add-transaction', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json({ message: 'transaction saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save transaciton' });
  }
});

export default router;