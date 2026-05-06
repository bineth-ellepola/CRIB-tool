import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { downloadTableAsXML } from '../utils/xmlConverter';
import { Table } from './Table';
import '../styles/dashboard.css';

export interface TableData {
  [key: string]: string | number | boolean;
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace '/data' with your actual API endpoint
      const result = await apiService.fetchData<TableData>('/data');
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      // For demo purposes, set sample data if API fails
      setData(getSampleData());
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExportXML = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }
    downloadTableAsXML(data, 'table_data.xml', 'data');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <div className="user-info">
            {user && <span>Welcome, {user.email || user.name}</span>}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="controls">
          <button onClick={fetchData} disabled={isLoading} className="refresh-btn">
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </button>
          <button onClick={handleExportXML} disabled={isLoading || data.length === 0} className="export-btn">
            Convert to XML
          </button>
        </div>

        {error && (
          <div className="warning-message">
            <p>{error}</p>
            <p className="demo-note">Showing sample data for demonstration.</p>
          </div>
        )}

        {isLoading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <Table data={data} />
        )}
      </main>
    </div>
  );
};

// Sample data for demonstration
const getSampleData = (): TableData[] => {
  return [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      department: 'Engineering',
      salary: 75000,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'Marketing',
      salary: 65000,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      department: 'Sales',
      salary: 70000,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice@example.com',
      department: 'Engineering',
      salary: 80000,
      status: 'Active',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      department: 'HR',
      salary: 60000,
      status: 'Inactive',
    },
  ];
};
