// models/Budget.js
import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  accountType: String,
  category: String,
  month: Number,
  year: Number,
  budgetAmount: Number,
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget; // ✅ ES module default export

