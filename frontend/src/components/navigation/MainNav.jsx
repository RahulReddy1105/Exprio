import React, { useState, useEffect } from 'react';
import { Nav, Badge, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getAlertSummary } from '../../services/api';

const MainNav = () => {
  const [alertSummary, setAlertSummary] = useState({});
  const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars

  useEffect(() => {
    const fetchAlertSummary = async () => {
      try {
        setLoading(true);
        const summary = await getAlertSummary();
        if (summary) {
          setAlertSummary(summary);
        }
      } catch (error) {
        console.error('Error fetching alert summary:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch alert summary on component mount
    fetchAlertSummary();

    // Set up interval to refresh alert summary every 30 seconds
    const interval = setInterval(fetchAlertSummary, 30000);

    return () => clearInterval(interval);
  }, []);

  const totalAlerts = (alertSummary.criticalAlerts || 0) + 
                     (alertSummary.highPriority || 0) + 
                     (alertSummary.mediumPriority || 0);

  return (
    <Nav variant="tabs" defaultActiveKey="/dashboard" className="main-nav">
      <LinkContainer to="/dashboard">
        <Nav.Link>
          Dashboard
        </Nav.Link>
      </LinkContainer>
      
      <LinkContainer to="/products">
        <Nav.Link>
          Products
        </Nav.Link>
      </LinkContainer>
      
      <LinkContainer to="/forecast">
        <Nav.Link>
          Forecast
        </Nav.Link>
      </LinkContainer>
      
      <LinkContainer to="/alerts">
        <Nav.Link>
          Alerts
          {totalAlerts > 0 && (
            <Badge 
              bg="danger" 
              className="ms-1"
              style={{ fontSize: '0.7rem' }}
            >
              {totalAlerts}
            </Badge>
          )}
        </Nav.Link>
      </LinkContainer>

      <div className="ms-auto d-flex align-items-center">
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" size="sm">
            <i className="fas fa-user-circle me-1"></i>
            Admin
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <i className="fas fa-cog me-2"></i>
              Settings
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fas fa-chart-line me-2"></i>
              Reports
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Nav>
  );
};

export default MainNav;