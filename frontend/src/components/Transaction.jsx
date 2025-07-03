import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/income.css';
const Transaction = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    amount: '',
    notes: '',
    date: new Date().toISOString().slice(0, 16),  // Default date & time
  });
  const [accounts, setAccounts] = useState([]);

   useEffect(() => {
      // Fetch account types for the dropdown
      const fetchAccounts = async () => {
        try {
          const response = await axios.get('REACT_APP_API_URL=http://13.233.255.147:5000/api/account');
          setAccounts(response.data);
        } catch (err) {
          console.error('Failed to fetch accounts', err);
        }
      };
  
      fetchAccounts();
    }, []);

  useEffect(() => {
    const now = new Date();
    setFormData(prev => ({
      ...prev,
      date: now.toISOString().slice(0, 16)
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, clearForm = false) => {
    e.preventDefault();
    const payload = { ...formData };
  
    try {
      const response = await fetch('REACT_APP_API_URL=http://13.233.255.147:5000/api/transaction/add-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('transaction saved successfully');
        if (clearForm) {
          setFormData({
            from: '',
            to: '',
            amount: '',
            notes: '',
            date: new Date().toISOString().slice(0, 16),
          });
          
        }
      } else {
        alert('Failed to save transaction');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving transaction');
    }
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    setFormData({
      from: '',
      to: '',
      amount: '',
      notes: '',
      date: new Date().toISOString().slice(0, 16),
    });
    navigate('/');
  };

  return (
    <div >
      <br /><br />
      
      <form onSubmit={handleSubmit}>
        {/* From */}
        <div className="form-group">
          <label>From</label>
           <select
            name="from"
            value={formData.from}
            onChange={handleChange}
          >
             <option value="">From Acc</option>
             {accounts.map(account => (
              <option key={account._id} value={account.accountType}>
               {account.accountType}
             </option>
        ))}
          </select>
        </div>
        
        {/* To */}
        <div className="form-group">
          <label>To</label>
          <select
            name="to"
            value={formData.to}
            onChange={handleChange}
          >
             <option value="">To Acc</option>
             {accounts.map(account => (
              <option key={account._id} value={account.accountType}>
               {account.accountType}
             </option>
        ))}
          </select>
        </div>
        
        {/* Amount */}
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>

        {/* Notes */}
        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any notes here"
          />
        </div>

        {/* Date & Time */}
      <div className="form-group">
        <label>Date & Time</label>
        <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="button" className="btn-save" onClick={(e) => handleSubmit(e, false)}>Save</button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Transaction;
