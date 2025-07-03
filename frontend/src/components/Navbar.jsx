import React, {useState, useEffect} from 'react';
import '../style/navbar.css';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Calendar,Plus, List, BarChart2, Wallet, Briefcase, DollarSign } from 'lucide-react';
import logoImg from '../assets/log.png';
import axios from 'axios';

  

const Navbar = () => {
  const navigate = useNavigate(); // React Router Hook for navigation

 
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar toggle

  const handleAddClick = () => {
    navigate('/add-expense');// Navigate to AddExpense page
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleAccountClick = () => {
    navigate('/account');
  };
  const handleCategoryClick = () => {
    navigate('/category');
  };

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [incomeTotal,setIncometotal]=useState([]);
  const [expenseTotal,setExpensetotal]=useState([]);
  const [balance,setBalanceTotal]=useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const incomeRes = await axios.get('REACT_APP_API_URL=http://13.233.255.147:5000/api/income');
      const expenseRes = await axios.get('REACT_APP_API_URL=http://13.233.255.147:5000/api/expense');
      setIncomes(incomeRes.data);
      setExpenses(expenseRes.data);

     const incometol = incomeRes.data.reduce((sum, item) => sum + Number(item.amount), 0);
     const expensetol = expenseRes.data.reduce((sum, item) => sum + Number(item.amount), 0);
     const balancetol = incometol - expensetol;
     
      setIncometotal(incometol);
      setExpensetotal(expensetol);
      setBalanceTotal(balancetol);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };
 
  

  
  return (
    <div className="tracker-container">
       {/* Sidebar */}
       <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <button onClick={() => setShowSidebar(false)} className="close-btn">×</button>
        <button className="category-btn" onClick={handleAccountClick}>Account</button>
        <button className="category-btn" onClick={handleCategoryClick}>Category</button>
        
      </div>
       {/* Header with Search Box */}
      
       <div className='header-container'>
       <div className="header">
        <Menu className="icon" onClick={toggleSidebar} />
        <img src={logoImg} alt="Logo" className="logo-image" />
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search transactions..."
          />
          <Search className="icon-small search-icon" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs fixed-tabs">
        <button className="tab">Today</button>
        <button className="tab">Weekly</button>
        <button className="tab">Monthly</button>
        <button className="tab">
          <Calendar className="icon-small" /> Calendar
        </button>
      </div>

      {/* Table Header */}
      <div className="table-header fixed-table">
        <span>Income <span className='incometol'>₹{incomeTotal}</span></span>
        <span>Expense <span className='expensetol'>-₹{expenseTotal}</span></span>
        <span>Balance <span className='balancetol'>₹{balance}</span></span>
      </div>
      </div>
       {/* List Income & Expense Records */}
<div className="records-container">
 <div className="records-section">
  {incomes.length > 0 || expenses.length > 0 ? (
    <>
    
      {incomes.map((item) => (
        <div key={item._id} className="record-item-income">
          <span className="date">{new Date(item.date).toLocaleDateString()}</span>
          <span className="account">{item.accountType}</span>
          <span className="category">{item.category}</span>
          <span className="amount">₹{item.amount}</span>
        </div>
        
      ))}
      {expenses.map((item) => (
        <div key={item._id} className="record-item-expense">
          <span className="date">{new Date(item.date).toLocaleDateString()}</span>
          <span className="account">{item.accountType}</span>
          <span className="category">{item.category}</span>
          <span className="amount">-₹{item.amount}</span>
        </div>
      ))}
    </>
  ) : (
    <p>No income or expense records.</p>
  )} 
</div>

</div>
      

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div><List className="bottom-icon" /> Transaction</div>
        <div><BarChart2 className="bottom-icon" /> Analysis</div>
        <div><Wallet className="bottom-icon" /> Account</div>
        <div><Briefcase className="bottom-icon" /> Business</div>
        <div><DollarSign className="bottom-icon" /> Budget</div>
      </div>

      {/* Floating Action Button */}
      <button className="fab-button" onClick={handleAddClick} >
        <Plus className="fab-icon" />
      </button>
    </div>
  );
};

export default Navbar;
