import React, { useState, useEffect } from 'react';
import { Card, Table, Row, Col, ProgressBar, Button, Spinner, Alert as AlertComponent, Badge, Modal, Form } from 'react-bootstrap';
import { getExpiryPredictions, getStockPredictions, getVelocityAnalysis } from '../services/api';
import '../styles/Forecast.css';

const Forecast = () => {
  const [expiryPredictions, setExpiryPredictions] = useState([]);
  const [stockPredictions, setStockPredictions] = useState([]);
  const [velocityData, setVelocityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllExpiry, setShowAllExpiry] = useState(false);
  const [showAllStock, setShowAllStock] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [discountSuccess, setDiscountSuccess] = useState(false);

  useEffect(() => {
    fetchForecastData();
  }, []);

  const fetchForecastData = async () => {
    try {
      setLoading(true);
      const [expiryData, stockData, velocityData] = await Promise.all([
        getExpiryPredictions(),
        getStockPredictions(),
        getVelocityAnalysis()
      ]);

      if (expiryData) setExpiryPredictions(expiryData);
      if (stockData) setStockPredictions(stockData);
      if (velocityData) setVelocityData(velocityData);
    } catch (err) {
      setError('Failed to load forecast data');
      console.error('Forecast data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskVariant = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      default: return 'success';
    }
  };

  if (loading) {
    return (
      <div className="forecast-modern">
        <div className="text-center p-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading forecast data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forecast-modern">
        <AlertComponent variant="danger">
          <AlertComponent.Heading>Error Loading Forecast</AlertComponent.Heading>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchForecastData}>
            Retry
          </button>
        </AlertComponent>
      </div>
    );
  }

  return (
    <div className="forecast-modern">
      <Row className="gy-4">
        <Col md={6} sm={12}>
          <Card className="mb-3">
            <Card.Header>
              <Card.Title>Expiry Waste Prediction</Card.Title>
              <Card.Text>Predicted waste and recommendations to minimize losses</Card.Text>
            </Card.Header>
            <Card.Body>
              {expiryPredictions.length > 0 ? (
                <>
                  <Table borderless>
                    <tbody>
                      {(showAllExpiry ? expiryPredictions : expiryPredictions.slice(0, 3)).map((item, idx) => (
                        <React.Fragment key={item.id || idx}>
                          <tr className="prediction-header">
                            <td colSpan="2">
                              <strong>{item.product}</strong>
                              <Badge bg={getRiskVariant(item.riskLevel)} className="float-end">
                                {item.riskLevel}
                              </Badge>
                            </td>
                          </tr>
                          <tr>
                            <td>Batch</td>
                            <td>{item.batch}</td>
                          </tr>
                          <tr>
                            <td>Expiry Date</td>
                            <td>{item.expiryDate}</td>
                          </tr>
                          <tr>
                            <td>Current Stock</td>
                            <td>{item.currentStock} units</td>
                          </tr>
                          <tr>
                            <td>Predicted Sales</td>
                            <td>{item.predictedSales} units</td>
                          </tr>
                          <tr>
                            <td>Waste Risk</td>
                            <td>{item.wasteRisk} units</td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <div className="action-buttons d-flex gap-2">
                                <Button 
                                  variant="outline-primary" 
                                  size="sm"
                                  onClick={() => { setSelectedProduct(item); setShowPromoModal(true); }}
                                >
                                  Promote sales
                                </Button>
                                <Button 
                                  variant="outline-secondary" 
                                  size="sm"
                                >
                                  Normal sales
                                </Button>
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => { setSelectedProduct(item); setShowDiscountModal(true); }}
                                >
                                  Urgent discount
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                  {expiryPredictions.length > 3 && (
                    <div className="text-center mt-3">
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => setShowAllExpiry(!showAllExpiry)}
                      >
                        {showAllExpiry ? 'Show Less' : `View All (${expiryPredictions.length})`}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-4">
                  <p className="text-muted">No expiry predictions available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} sm={12}>
          <Card className="mb-3">
            <Card.Header>
              <Card.Title>Stock Predictions</Card.Title>
            </Card.Header>
            <Card.Body>
              {stockPredictions.length > 0 ? (
                <>
                  {(showAllStock ? stockPredictions : stockPredictions.slice(0, 3)).map((item, idx) => (
                    <div key={item.id || idx} className="stock-item mb-3 p-2 bg-light rounded">
                      <h5>{item.product}</h5>
                      <div className="stock-details mb-1">
                        <span>Current Stock: {item.currentStock} units</span>
                        {item.stockOutDate && (
                          <span className="ms-3">Stock-out Date: {item.stockOutDate}</span>
                        )}
                      </div>
                      <div className="progress-container mb-1">
                        <span>Weekly Usage: {item.weeklyUsage} units</span>
                        <ProgressBar 
                          now={item.confidence ? parseInt(item.confidence) : 0} 
                          label={item.confidence} 
                        />
                      </div>
                      {item.recommendedOrder && (
                        <div className="recommendation">
                          <strong>Recommended Order: {item.recommendedOrder} units</strong>
                          <span className="ms-2">Confidence: {item.confidence}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {stockPredictions.length > 3 && (
                    <div className="text-center mt-3">
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => setShowAllStock(!showAllStock)}
                      >
                        {showAllStock ? 'Show Less' : `View All (${stockPredictions.length})`}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-4">
                  <p className="text-muted">No stock predictions available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="gy-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title>Velocity Analysis</Card.Title>
              <Card.Text>Product movement velocity</Card.Text>
            </Card.Header>
            <Card.Body>
              {velocityData && (
                <Row>
                  <Col md={4} sm={12}>
                    <div className="velocity-section mb-3">
                      <h6 className="text-success">Fast Moving</h6>
                      <ul className="list-unstyled mb-0">
                        {velocityData.fast_moving && velocityData.fast_moving.length > 0 ? (
                          velocityData.fast_moving.map((item, idx) => (
                            <li key={idx} className="mb-1">{item}</li>
                          ))
                        ) : (
                          <li className="text-muted">None</li>
                        )}
                      </ul>
                    </div>
                  </Col>
                  <Col md={4} sm={12}>
                    <div className="velocity-section mb-3">
                      <h6 className="text-warning">Medium Moving</h6>
                      <ul className="list-unstyled mb-0">
                        {velocityData.medium_moving && velocityData.medium_moving.length > 0 ? (
                          velocityData.medium_moving.map((item, idx) => (
                            <li key={idx} className="mb-1">{item}</li>
                          ))
                        ) : (
                          <li className="text-muted">None</li>
                        )}
                      </ul>
                    </div>
                  </Col>
                  <Col md={4} sm={12}>
                    <div className="velocity-section mb-3">
                      <h6 className="text-danger">Slow Moving</h6>
                      <ul className="list-unstyled mb-0">
                        {velocityData.slow_moving && velocityData.slow_moving.length > 0 ? (
                          velocityData.slow_moving.map((item, idx) => (
                            <li key={idx} className="mb-1">{item}</li>
                          ))
                        ) : (
                          <li className="text-muted">None</li>
                        )}
                      </ul>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Promotion Modal */}
      <Modal show={showPromoModal} onHide={() => { setShowPromoModal(false); setPromoSuccess(false); }}>
        <Modal.Header closeButton>
          <Modal.Title>Promote Sales for {selectedProduct?.product}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {promoSuccess ? (
            <div className="text-success">Promotion message set for {selectedProduct?.product}!</div>
          ) : (
            <Form onSubmit={e => { e.preventDefault(); setPromoSuccess(true); }}>
              <Form.Group controlId="promoMessageInput">
                <Form.Label>Promotion Message</Form.Label>
                <Form.Control
                  type="text"
                  value={promoMessage}
                  onChange={e => setPromoMessage(e.target.value)}
                  placeholder="Enter promotion details"
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">Set Promotion</Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowPromoModal(false); setPromoSuccess(false); }}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* Discount Modal */}
      <Modal show={showDiscountModal} onHide={() => { setShowDiscountModal(false); setDiscountSuccess(false); }}>
        <Modal.Header closeButton>
          <Modal.Title>Set Discount for {selectedProduct?.product}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {discountSuccess ? (
            <div className="text-success">Discount of {discountValue}% set for {selectedProduct?.product}!</div>
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

export default Forecast;