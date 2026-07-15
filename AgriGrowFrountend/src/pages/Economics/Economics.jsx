import { useState, useEffect } from 'react';
import { DollarSign, Trash2, Plus, Calendar, HelpCircle } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import './Economics.css';

const Economics = () => {
  const [logs, setLogs] = useState([]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Seeds');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState('expense');

  // Load economics transactions on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await apiClient.get('/economics');
        setLogs(data);
      } catch (error) {
        console.error("Failed to load transactions from backend database, using local storage backup: ", error);
        const saved = localStorage.getItem('agri_economics');
        if (saved) {
          try {
            setLogs(JSON.parse(saved));
          } catch {
            setLogs([
              { id: 1, title: 'Purchased Wheat Seeds', amount: 3200, category: 'Seeds', date: '2026-06-10', type: 'expense' },
              { id: 2, title: 'Bought Urea Fertilizer', amount: 4800, category: 'Fertilizer', date: '2026-06-12', type: 'expense' },
              { id: 3, title: 'Sold Barley Yield', amount: 35000, category: 'Sales', date: '2026-06-15', type: 'revenue' },
              { id: 4, title: 'Paid Irrigation charges', amount: 1500, category: 'Irrigation', date: '2026-06-16', type: 'expense' }
            ]);
          }
        } else {
          setLogs([]);
        }
      }
    };
    fetchTransactions();
  }, []);

  // Update backup cache
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem('agri_economics', JSON.stringify(logs));
    }
  }, [logs]);

  const handleAddLog = async (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    const newLog = {
      title,
      amount: parseFloat(amount),
      category,
      date,
      type
    };

    try {
      const savedLog = await apiClient.post('/economics', newLog);
      setLogs(prev => [savedLog, ...prev]);
      setTitle('');
      setAmount('');
    } catch (error) {
      console.error("Failed to save transaction to database: ", error);
      // Local fallback
      const localLog = { ...newLog, id: Date.now() };
      setLogs(prev => [localLog, ...prev]);
      setTitle('');
      setAmount('');
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      await apiClient.delete(`/economics/${id}`);
      setLogs(prev => prev.filter(log => log.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction from database: ", error);
      setLogs(prev => prev.filter(log => log.id !== id));
    }
  };

  // Computations
  const totalExpenses = logs.filter(l => l.type === 'expense').reduce((sum, l) => sum + l.amount, 0);
  const totalRevenue = logs.filter(l => l.type === 'revenue').reduce((sum, l) => sum + l.amount, 0);
  const netIncome = totalRevenue - totalExpenses;

  // Compute category distributions for visual Donut Chart
  const categories = ['Seeds', 'Fertilizer', 'Irrigation', 'Labor', 'Sales', 'Subsidy', 'Others'];
  const categoryTotals = categories.reduce((acc, cat) => {
    acc[cat] = logs.filter(l => l.category === cat).reduce((sum, l) => sum + l.amount, 0);
    return acc;
  }, {});

  const totalSum = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  // Donut chart math parameters
  // Circle radius = 50, stroke width = 16. Perimeter = 2 * PI * r = ~314.16
  const strokeDash = 314.16;
  let accumulatedPercent = 0;

  const colors = {
    Seeds: '#10b981',      // Emerald
    Fertilizer: '#f97316',  // Orange
    Irrigation: '#3b82f6',  // Blue
    Labor: '#a855f7',       // Purple
    Sales: '#eab308',       // Yellow
    Subsidy: '#ec4899',     // Pink
    Others: '#9ca3af'       // Gray
  };

  return (
    <div className="container main-content economics-page animate-fade-in">
      <header className="page-header mb-6">
        <h1 className="page-title"><DollarSign size={32} /> Farm Economics & Budgets</h1>
        <p className="page-subtitle">Log operating expenses, monitor crop revenues, and visualize category allocations inside a secure ledger.</p>
      </header>

      {/* Net Stats panel */}
      <section className="grid-3 mb-6">
        <div className="card stat-card border-orange">
          <span className="stat-label">Operating Expenses</span>
          <h2 className="stat-val text-orange">₹{totalExpenses.toLocaleString()}</h2>
        </div>
        <div className="card stat-card border-green">
          <span className="stat-label">Sales & Earnings</span>
          <h2 className="stat-val text-green">₹{totalRevenue.toLocaleString()}</h2>
        </div>
        <div className="card stat-card border-purple">
          <span className="stat-label">Net Surplus</span>
          <h2 className={`stat-val ${netIncome >= 0 ? 'text-green' : 'text-orange'}`}>
            ₹{netIncome.toLocaleString()}
          </h2>
        </div>
      </section>

      <div className="economics-layout-grid mb-6">
        {/* Left Form */}
        <div className="econ-col">
          <form className="card add-log-card" onSubmit={handleAddLog}>
            <h3 className="card-title"><Plus size={18} className="text-green" /> Record Transaction</h3>
            <p className="db-card-subtitle text-muted mb-4">Add operating expense or crop sale items</p>

            <div className="form-group mb-4">
              <label className="form-label">Transaction Title</label>
              <input 
                type="text" 
                placeholder="e.g. Sonalika Seeds purchase" 
                className="input" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group-row mb-4">
              <div className="form-group flex-1">
                <label className="form-label">Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="₹" 
                  className="input" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Type</label>
                <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="expense">Expense</option>
                  <option value="revenue">Revenue / Earnings</option>
                </select>
              </div>
            </div>

            <div className="form-group-row mb-6">
              <div className="form-group flex-1">
                <label className="form-label">Category</label>
                <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Seeds">Seeds</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Labor">Labor</option>
                  <option value="Sales">Sales</option>
                  <option value="Subsidy">Subsidy</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  className="input" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">Save Transaction</button>
          </form>
        </div>

        {/* Right Chart Card */}
        <div className="econ-col">
          <div className="card distribution-chart-card">
            <h3 className="card-title">Category Distribution</h3>
            <p className="db-card-subtitle text-muted mb-4">Breakdown of farm capital flow</p>
            
            <div className="chart-layout-wrapper d-flex align-items-center">
              {totalSum > 0 ? (
                <>
                  <div className="donut-chart-container">
                    <svg viewBox="0 0 140 140" className="donut-chart">
                      <circle cx="70" cy="70" r="50" fill="transparent" stroke="var(--border-color)" strokeWidth="16" />
                      {categories.map((cat) => {
                        const val = categoryTotals[cat];
                        if (val === 0) return null;
                        const pct = (val / totalSum) * 100;
                        const offset = strokeDash - (pct / 100) * strokeDash;
                        const rotation = (accumulatedPercent / 100) * 360;
                        accumulatedPercent += pct;
                        
                        return (
                          <circle 
                            key={cat}
                            cx="70" 
                            cy="70" 
                            r="50" 
                            fill="transparent" 
                            stroke={colors[cat]} 
                            strokeWidth="16"
                            strokeDasharray={strokeDash}
                            strokeDashoffset={offset}
                            transform={`rotate(${-90 + rotation} 70 70)`}
                            className="donut-segment"
                          />
                        );
                      })}
                    </svg>
                    <div className="donut-center-label">
                      <span className="donut-val">₹{(totalSum > 1000 ? `${(totalSum / 1000).toFixed(1)}k` : totalSum)}</span>
                      <span className="donut-label">Total Flow</span>
                    </div>
                  </div>

                  <div className="chart-legend-grid">
                    {categories.map((cat) => {
                      const val = categoryTotals[cat];
                      if (val === 0) return null;
                      return (
                        <div className="legend-row d-flex align-items-center gap-2" key={cat}>
                          <span className="legend-dot" style={{ backgroundColor: colors[cat] }}></span>
                          <span className="legend-label-text">{cat}</span>
                          <span className="legend-value-text ml-auto">₹{val.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="w-full text-center py-6">
                  <HelpCircle className="text-muted mb-2" size={36} />
                  <p className="text-muted">Add transactions to generate distribution chart.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Ledger Logs Table */}
      <section className="card ledger-table-card">
        <h3 className="card-title mb-4"><Calendar size={20} className="text-green" /> Transaction Ledger History</h3>
        {logs.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th style={{ width: '60px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td><strong>{log.title}</strong></td>
                    <td><span className="legend-dot inline-dot" style={{ backgroundColor: colors[log.category] }}></span> {log.category}</td>
                    <td>{log.date}</td>
                    <td>
                      <span className={`badge ${log.type === 'revenue' ? 'badge-success' : 'badge-danger'}`}>
                        {log.type}
                      </span>
                    </td>
                    <td><strong className={log.type === 'revenue' ? 'text-green' : 'text-orange'}>₹{log.amount.toLocaleString()}</strong></td>
                    <td>
                      <button className="btn-icon btn-delete" onClick={() => handleDeleteLog(log.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted text-center py-6">No transaction logs available. Create a new log above.</p>
        )}
      </section>
    </div>
  );
};

export default Economics;
