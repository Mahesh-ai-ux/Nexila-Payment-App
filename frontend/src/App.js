import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Addexpense from './components/Addexpense';
import Income from './components/Income';
import Expense from './components/Expense';
import Transaction from './components/Transaction';
import Account from './components/Account';
import Category from './components/Category';
import Analysis from './components/Analysis';
import Accounts from './components/Accounts';
import Budget from './components/Budget';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* ✅ Route for root path "/" */}
          <Route path="/" element={<Navbar />} />

          <Route path="/navbar" element={<Navbar />} />
          <Route path="/add-expense" element={<Addexpense />} />
          <Route path="/add-income" element={<Income />} />
          <Route path="/expense" element={<Expense />} /> {/* Fixed duplicate route */}
          <Route path="/add-transaction" element={<Transaction />} />
          <Route path="/account" element={<Account />} />
          <Route path="/category" element={<Category />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

