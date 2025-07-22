import React, { useState, useEffect } from 'react';
import { FaBell, FaPlus, FaUserCircle, FaChevronLeft, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAlertSummary } from '../services/api';
import '../App.css';

const TopBar = ({ sidebarOpen, setSidebarOpen }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const alertSummary = await getAlertSummary();
        if (alertSummary) {
          setNotificationCount(alertSummary.unread || 0);
        }
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };

    fetchNotificationCount();
  }, []);

  return (
    <div className="topbar d-flex align-items-center justify-content-between px-4 py-3">
      <div className="d-flex align-items-center">
        <button
          className="sidebar-toggle-btn btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          style={{ marginRight: 16 }}
        >
          {sidebarOpen ? <FaChevronLeft size={22} /> : <FaBars size={22} />}
        </button>
        <img src="/logo.jpeg" alt="Expireo Logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', marginRight: 12 }} />
        <span className="topbar-appname fw-bold" style={{ fontSize: '1.3rem', color: '#059669' }}>Expireo</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn position-relative me-2 notification-btn"
          onClick={() => navigate('/alerts')}
          style={{
            backgroundColor: '#fff',
            border: '2px solid #e9ecef',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            padding: 0,
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.transform = 'scale(1.08)';
            e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}
        >
          <FaBell size={22} style={{ color: '#495057' }} />
          {notificationCount > 0 && (
            <span
              className="notification-badge"
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: '#ff4757',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(255, 71, 87, 0.4)',
                animation: 'pulse 2s infinite',
                zIndex: 2,
              }}
            >
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>
        <button className="btn btn-primary d-flex align-items-center">
          <FaPlus className="me-2" /> Add Product
        </button>
        <div style={{ marginLeft: '1px' }}>
          <FaUserCircle size={32} className="text-secondary" />
        </div>
      </div>
    </div>
  );
};

export default TopBar; 