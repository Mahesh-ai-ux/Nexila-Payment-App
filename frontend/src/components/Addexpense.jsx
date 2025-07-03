import React, { useState } from 'react';
import Income from './Income';
import Expense from './Expense';
import Transaction from './Transaction';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [formType, setFormType] = useState('income');
  const navigate = useNavigate();

  const handleClick = (type) => {
    setFormType(type);
  };

  const handleClosePage = () => {
    navigate(-1);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleClick('income')}>Income</button>
        <button onClick={() => handleClick('expense')}>Expense</button>
        <button onClick={() => handleClick('transaction')}>Transaction</button>
        <button onClick={handleClosePage}>×</button>
      </div>

      <div>
        {formType === 'income' && <Income formType="income" />}
        {formType === 'expense' && <Expense formType="expense" />}
        {formType === 'transaction' && <Transaction formType="transaction" />}
      </div>
    </div>
  );
};

export default AddExpense;
