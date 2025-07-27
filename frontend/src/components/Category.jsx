import React, { useEffect, useState } from 'react';
import '../style/accounts.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE = process.env.REACT_APP_API_URL;
const Category = () => {
  const [categorys, setCategorys] = useState([]);
  const [formData, setFormData] = useState({ categoryType: '' });
  const [editId, setEditId] = useState(null);

  const fetchCategorys = async () => {
    try {
      const res = await axios.get(`${API_BASE}/category`);
      setCategorys(res.data);
    } catch (err) {
      console.error('Error fetching categorys:', err);
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  const handleChange = (e) => {
    setFormData({ categoryType: e.target.value });
  };

  const handleAdd = async () => {
    if (!formData.categoryType.trim()) return;
    try {
      await axios.post(`${API_BASE}/category, formData`);
      setFormData({ categoryType: '' });
      fetchCategorys();
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/category/${id}`);
      fetchCategorys();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  const handleEdit = (id, type) => {
    setEditId(id);
    setFormData({ categoryType: type });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/category/${editId}`, formData);
      setFormData({ categoryType: '' });
      setEditId(null);
      fetchCategorys();
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };
   const navigate = useNavigate();
   const goBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div className="accounts-container">
       <button onClick={goBack} className="back-button">
        ← Back
      </button>
      <h2>Manage Categorys</h2>

      <div className="account-form">
        <input
          type="text"
          name="categoryType"
          placeholder="Enter category type"
          value={formData.categoryType}
          onChange={handleChange}
        />
        {editId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add Item</button>
        )}
      </div>

      <ul className="account-list">
        {categorys.map((category) => (
          <li key={category._id}>
            {category.categoryType}
            <button onClick={() => handleEdit(category._id, category.categoryType)}>Edit</button>
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
