import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Tab, Tabs, Form, Button, Badge, Spinner, Alert as AlertComponent, Row, Col, Modal } from 'react-bootstrap';
import { 
  getNotifications, 
  getExpiringSoon, 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  getAlertSummary 
} from '../services/api';
import '../styles/Alerts.css';

const Alerts = () => {
  const [key, setKey] = useState('notifications');
  const [notifications, setNotifications] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);
  const [alertSummary, setAlertSummary] = useState({});
  const [alertConfig, setAlertConfig] = useState({
    expiryDays: 7,
    stockThreshold: 20,
    forecastFrequency: 'daily',
    wasteThreshold: 10
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [discountSuccess, setDiscountSuccess] = useState(false);

  useEffect(() => {
    fetchAlertsData();
  }, []);

  const fetchAlertsData = async () => {
    try {
      setLoading(true);
      const [notificationsData, expiringData, summaryData] = await Promise.all([
        getNotifications(),
        getExpiringSoon(),
        getAlertSummary()
      ]);

      if (notificationsData) setNotifications(notificationsData);
      if (expiringData) setExpiringSoon(expiringData);
      if (summaryData) setAlertSummary(summaryData);
    } catch (err) {
      setError('Failed to load alerts data');
      console.error('Alerts data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const result = await markNotificationAsRead(id);
      if (result) {
        setNotifications(notifications.map(n => 
          n.id === id ? {...n, read: true} : n
        ));
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const result = await markAllNotificationsAsRead();
      if (result) {
        setNotifications(notifications.map(n => ({...n, read: true})));
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setAlertConfig({
      ...alertConfig,
      [name]: name === 'expiryDays' || name === 'stockThreshold' || name === 'wasteThreshold' 
        ? parseInt(value) 
        : value
    });
  };

  const handleSaveConfig = async () => {
    try {
      setSaving(true);
      // Simulate saving configuration
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Alert configuration saved successfully');
      // Show success message
      alert('Alert configuration saved successfully!');
    } catch (err) {
      console.error('Error saving alert config:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleTestNotifications = () => {
    // Implement test notification logic
    console.log('Testing notifications...');
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriority = alertSummary.high || 0;
  const mediumPriority = alertSummary.medium || 0;
  // eslint-disable-next-line no-unused-vars
  const lowPriority = alertSummary.low || 0;

  if (loading) {
    return (
      <div className="alerts-container">
        <div className="text-center p-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading alerts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alerts-container">
        <AlertComponent variant="danger">
          <AlertComponent.Heading>Error Loading Alerts</AlertComponent.Heading>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchAlertsData}>
            Retry
          </button>
        </AlertComponent>
      </div>
    );
  }

  return (
    <div className="alerts-container">
      <h1>Notification Center</h1>
      <p>Manage alerts and stay informed about your inventory</p>

      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 alerts-tabs"
      >
        <Tab eventKey="notifications" title={
          <span>
            Recent Notifications
            {unreadCount > 0 && <Badge bg="danger" className="ms-2">{unreadCount}</Badge>}
          </span>
        }>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Latest alerts and system notifications</span>
              <Button variant="outline-primary" size="sm" onClick={handleMarkAllAsRead}>
                Mark All as Read
              </Button>
            </Card.Header>
            <Card.Body>
              {notifications.length > 0 ? (
                <ListGroup variant="flush">
                  {notifications.map(notification => (
                    <ListGroup.Item 
                      key={notification.id} 
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    >
                      <div className="d-flex align-items-start">
                        <Form.Check 
                          type="checkbox" 
                          checked={notification.read}
                          onChange={() => handleMarkAsRead(notification.id)}
                          className="me-3"
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h5 className={`mb-1 ${notification.type}-alert`}>
                              {notification.product}
                            </h5>
                            <small className="text-muted">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                          <p className="mb-1">{notification.message}</p>
                          <Badge bg={notification.severity === 'high' ? 'danger' : notification.severity === 'medium' ? 'warning' : 'info'} className="me-2">
                            {notification.type}
                          </Badge>
                          <Button variant="link" size="sm" className="p-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center p-4">
                  <p className="text-muted">No notifications available</p>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h5>Expiry Calendar</h5>
              <p>Items expiring in the next 7 days</p>
            </Card.Header>
            <Card.Body>
              {expiringSoon.length > 0 ? (
                <ListGroup variant="flush">
                  {expiringSoon.map(item => (
                    <ListGroup.Item key={item.id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{item.name}</strong>
                          <div className="text-muted small">
                            {item.category} | Quantity: {item.quantity} {item.unit}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-danger">Expires: {item.expiry}</div>
                          <Badge bg={item.status.includes('1 day') ? 'danger' : 'warning'} className="mb-2">
                            {item.status}
                          </Badge>
                          <div>
                            <Button variant="outline-danger" size="sm" onClick={() => { setSelectedItem(item); setShowDiscountModal(true); }}>Set Discount</Button>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center p-4">
                  <p className="text-muted">No items expiring soon</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="configuration" title="Alert Configuration">
          <Card>
            <Card.Header>
              <h5>Customize your notification preferences</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Alerts</Form.Label>
                  <Form.Text className="d-block mb-2">
                    Get notified when products are close to expiry
                  </Form.Text>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Alert</span>
                    <Form.Control
                      type="number"
                      name="expiryDays"
                      value={alertConfig.expiryDays}
                      onChange={handleConfigChange}
                      style={{ width: '60px' }}
                      min="1"
                      max="30"
                    />
                    <span className="ms-2">days before expiry</span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Low Stock Alerts</Form.Label>
                  <Form.Text className="d-block mb-2">
                    Alert when inventory falls below threshold
                  </Form.Text>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Threshold:</span>
                    <Form.Control
                      type="number"
                      name="stockThreshold"
                      value={alertConfig.stockThreshold}
                      onChange={handleConfigChange}
                      style={{ width: '80px' }}
                      min="1"
                    />
                    <span className="ms-2">units</span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Forecast Notifications</Form.Label>
                  <Form.Text className="d-block mb-2">
                    Receive reorder recommendations
                  </Form.Text>
                  <Form.Select
                    name="forecastFrequency"
                    value={alertConfig.forecastFrequency}
                    onChange={handleConfigChange}
                    style={{ width: '200px' }}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Waste Prevention</Form.Label>
                  <Form.Text className="d-block mb-2">
                    Notifications to prevent product waste
                  </Form.Text>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Threshold:</span>
                    <Form.Control
                      type="number"
                      name="wasteThreshold"
                      value={alertConfig.wasteThreshold}
                      onChange={handleConfigChange}
                      style={{ width: '80px' }}
                      min="1"
                    />
                    <span className="ms-2">units</span>
                  </div>
                </Form.Group>

                <Button 
                  variant="primary" 
                  onClick={handleSaveConfig}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </Button>
                <Button 
                  variant="outline-secondary" 
                  className="ms-2"
                  onClick={handleTestNotifications}
                >
                  Test Notifications
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="summary" title="Alert Summary">
          <Row>
            <Col md={3}>
              <Card className="summary-card critical">
                <Card.Body>
                  <Card.Title>Critical Alerts</Card.Title>
                  <Card.Text>{highPriority}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="summary-card high">
                <Card.Body>
                  <Card.Title>High Priority</Card.Title>
                  <Card.Text>{highPriority}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="summary-card medium">
                <Card.Body>
                  <Card.Title>Medium Priority</Card.Title>
                  <Card.Text>{mediumPriority}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="summary-card unread">
                <Card.Body>
                  <Card.Title>Total Unread</Card.Title>
                  <Card.Text>{unreadCount}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      {/* Discount Modal */}
      <Modal show={showDiscountModal} onHide={() => { setShowDiscountModal(false); setDiscountSuccess(false); }}>
        <Modal.Header closeButton>
          <Modal.Title>Set Discount for {selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {discountSuccess ? (
            <div className="text-success">Discount of {discountValue}% set for {selectedItem?.name}!</div>
          ) : (
            <Form onSubmit={e => { e.preventDefault(); setDiscountSuccess(true); }}>
              <Form.Group controlId="discountInput">
                <Form.Label>How much discount do you want to set?</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="100"
                  value={discountValue}
                  onChange={e => setDiscountValue(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">Set Discount</Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowDiscountModal(false); setDiscountSuccess(false); }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Alerts;