import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaChartBar, FaBoxOpen, FaBell, FaCog, FaChartLine } from 'react-icons/fa';
import { getDashboardStats } from '../services/api';
import '../App.css';

const navLinks = [
  { to: '/dashboard', icon: <FaChartBar />, label: 'Dashboard', desc: 'Overview & Analytics' },
  { to: '/products', icon: <FaBoxOpen />, label: 'Products', desc: 'Inventory Management' },
  { to: '/forecast', icon: <FaChartLine />, label: 'Forecast', desc: 'Predictions & Analytics' },
  { to: '/alerts', icon: <FaBell />, label: 'Alerts', desc: 'Expiry & Stock Alerts' },
];

const Sidebar = ({ open }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    expiringItems: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await getDashboardStats();
        if (dashboardStats) {
          setStats({
            totalProducts: dashboardStats.totalProducts,
            lowStockItems: dashboardStats.lowStockItems,
            expiringItems: dashboardStats.expiringItems
          });
        }
      } catch (error) {
        console.error('Error fetching sidebar stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!open) return null;
  
  return (
    <aside className="sidebar d-flex flex-column justify-content-between">
      <div>
        <Nav className="flex-column sidebar-nav" variant="pills">
          {navLinks.map(link => (
            <Nav.Link
              as={NavLink}
              to={link.to}
              key={link.to}
              className={({ isActive }) =>
                `sidebar-link d-flex align-items-center${isActive ? ' active' : ''}`
              }
              end
            >
              <span className="sidebar-icon">{link.icon}</span>
              <span className="sidebar-link-text ms-2">
                {link.label}
                <div className="sidebar-link-desc">{link.desc}</div>
              </span>
            </Nav.Link>
          ))}
        </Nav>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-quickstats p-3 mb-3 rounded">
          <div className="sidebar-quickstats-title mb-2">Quick Stats</div>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border spinner-border-sm text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="sidebar-quickstats-item d-flex justify-content-between">
                <span>Total Products:</span> 
                <span>{stats.totalProducts?.toLocaleString() || '0'}</span>
              </div>
              <div className="sidebar-quickstats-item d-flex justify-content-between">
                <span>Low Stock:</span> 
                <span className="text-warning">{stats.lowStockItems || '0'}</span>
              </div>
              <div className="sidebar-quickstats-item d-flex justify-content-between">
                <span>Expiring Soon:</span> 
                <span className="text-danger">{stats.expiringItems || '0'}</span>
              </div>
            </>
          )}
        </div>
        <Nav className="flex-column">
          <Nav.Link
            as={NavLink}
            to="/settings"
            className={({ isActive }) =>
              `sidebar-link d-flex align-items-center${isActive ? ' active' : ''}`
            }
            end
          >
            <span className="sidebar-icon"><FaCog /></span>
            <span className="sidebar-link-text ms-2">Settings</span>
          </Nav.Link>
        </Nav>
      </div>
    </aside>
  );
};

export default Sidebar; 