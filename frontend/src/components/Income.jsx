
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/income.css';
import axios from 'axios';
const Income = () => {
  const [formData, setFormData] = useState({
    accountType: '',
    category: '',
    amount: '',
    notes: '',
    photo: '',
    date: new Date().toISOString().slice(0, 16),  // Default date & time
  });


  const [accounts, setAccounts] = useState([]);
  const [categorys, setCategorys] = useState([]);
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
      // Fetch account types for the dropdown
      const fetchCategorys = async () => {
        try {
          const response = await axios.get('REACT_APP_API_URL=http://13.233.255.147:5000/api/category');
          setCategorys(response.data);
        } catch (err) {
          console.error('Failed to fetch accounts', err);
        }
      };
  
      fetchCategorys();
    }, []);
  
  useEffect(() => {
    const now = new Date();
    setFormData(prev => ({
      ...prev,
      date: now.toISOString().slice(0, 16)
    }));
  }, []);
  const handleSubmit = async (e, clearForm = false) => {
    e.preventDefault();
    const payload = { ...formData, photo: image };
  
    try {
      const response = await fetch('REACT_APP_API_URL=http://13.233.255.147:5000/api/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('Income saved successfully');
        if (clearForm) {
          setFormData({
            accountType: '',
            category: '',
            amount: '',
            notes: '',
            photo: '',
            date: new Date().toISOString().slice(0, 16),
          });
          setImage(null);
        }
      } else {
        alert('Failed to save income');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving income');
    }
  };

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // Store image data
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    setFormData({
      accountType: '',
      category: '',
      amount: '',
      notes: '',
      photo: '',
      date: new Date().toISOString().slice(0, 16),
    });
    setImage(null);
    navigate('/');
  };

  return (
    <div >
     <br /><br />
      
      <form onSubmit={handleSubmit}>
        {/* Account Type */}
        <div className="form-group">
          <label>Account</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
          >
            <option value="">Select Account</option>
             {accounts.map(account => (
              <option key={account._id} value={account.accountType}>
               {account.accountType}
             </option>
        ))}
          </select>
           
        </div>
        
        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
             <option value="">Select Category</option>
             {categorys.map(category => (
              <option key={category._id} value={category.categoryType}>
               {category.categoryType}
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

        {/* Photo */}
        <div className="form-group">
          <label>Photo</label>
          <div className="photo-buttons">
            <input
              type="file"
              accept="image/*"
              id="gallery-input"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="gallery-input" className="photo-btn">
              Gallery
            </label>
            <button
              type="button"
              className="photo-btn"
              onClick={() => document.getElementById('camera-input').click()}
            >
              Camera
            </button>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              id="camera-input"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Display Image */}
        {image && (
          <div className="image-preview">
            <img src={image} alt="Uploaded" width="100" height="100" />
          </div>
        )}

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
        <button type="submit" className="btn-save-continue" onClick={(e) => handleSubmit(e, true)}>Save & Continue</button>
        <button type="button" className="btn-save" onClick={(e) => handleSubmit(e, false)}>Save</button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Income;
