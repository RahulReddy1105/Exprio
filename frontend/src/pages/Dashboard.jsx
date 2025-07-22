import React, { useState, useEffect } from "react";
import { Card, Row, Col, ProgressBar, Spinner } from "react-bootstrap";
import { getDashboardStats, getCategoryDistribution, getExpiringProducts, getSalesAnalysis } from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [salesAnalysis, setSalesAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, categoriesData, expiringData, salesData] = await Promise.all([
          getDashboardStats(),
          getCategoryDistribution(),
          getExpiringProducts(),
          getSalesAnalysis()
        ]);

        console.log('Expiring Products Data:', expiringData); // Debug log
        setStats(statsData);
        setCategories(categoriesData);
        setExpiringProducts(expiringData);
        setSalesAnalysis(salesData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="text-center p-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="text-center p-5">
          <div className="alert alert-danger">
            <h4>Error Loading Dashboard</h4>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper for category cards
  const renderCategories = () => {
    if (categories && Array.isArray(categories)) {
      return categories.map((category, idx) => (
        <div key={category.name} className="d-flex align-items-center mb-2">
          <span style={{ fontSize: 20, marginRight: 10 }}>
            {category.name === 'Fresh Vegetables' ? '🥬' : 
             category.name === 'Fresh Fruits' ? '🍎' :
             category.name === 'Dairy & Eggs' ? '🥛' :
             category.name === 'Bakery & Breads' ? '🍞' :
             category.name === 'Meat & Poultry' ? '🍗' :
             category.name === 'Rice & Pulses' ? '🍚' :
             category.name === 'Cooking Oil & Ghee' ? '🫒' :
             category.name === 'Spices & Masalas' ? '🌶️' :
             category.name === 'Beverages' ? '🥤' :
             category.name === 'Snacks & Namkeen' ? '🍪' :
             category.name === 'Personal Care' ? '🧴' :
             category.name === 'Household & Cleaning' ? '🧽' :
             category.name === 'Frozen Foods' ? '🧊' :
             category.name === 'Baby Care' ? '👶' :
             category.name === 'Pet Care' ? '🐕' : '📦'}
          </span>
          <span className="fw-semibold me-auto">{category.name}</span>
          <span className="badge bg-light text-dark ms-2">{category.value}</span>
        </div>
      ));
    }
    return <div className="text-muted">No category data available</div>;
  };

  return (
    <div className="dashboard-modern">
      <Row className="gy-4">
        {/* Top Stats */}
        <Col md={3} sm={6} xs={12}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="text-muted mb-1">Total Products</div>
              <div className="h3 fw-bold text-success mb-0">{stats?.totalProducts?.toLocaleString() || 0}</div>
              <div className="small text-secondary">Across all categories</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="text-muted mb-1">Expiring Soon</div>
              <div className="h3 fw-bold text-warning mb-0">{stats?.expiringItems || 0}</div>
              <div className="small text-secondary">Requires immediate attention</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="text-muted mb-1">Low Stock Items</div>
              <div className="h3 fw-bold text-danger mb-0">{stats?.lowStockItems || 0}</div>
              <div className="small text-secondary">Need restocking soon</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="text-muted mb-1">Daily Sales</div>
              <div className="h3 fw-bold text-success mb-0">₹{stats?.totalSales?.toLocaleString() || 0}</div>
              <div className="small text-secondary">Average: ₹{stats?.averageTransactionValue?.toFixed(2) || 0}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="gy-4 mt-1">
        {/* Product Categories */}
        <Col md={4} sm={12}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="fw-bold mb-2">Product Categories</div>
              <div className="text-muted mb-2">Distribution across supermarket sections</div>
              {renderCategories()}
            </Card.Body>
          </Card>
        </Col>
        {/* Expiring Soon */}
        <Col md={4} sm={12}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="fw-bold mb-2">Expiring Soon</div>
              <div className="text-muted mb-2">Products expiring within 7 days</div>
              {expiringProducts && Array.isArray(expiringProducts) && expiringProducts.length > 0 ? (
                expiringProducts.slice(0, 3).map((product, idx) => (
                  <div key={product.id} className={`expiring-item mb-2 p-2 rounded ${product.status.includes('1 day') || product.status.includes('2 days') ? 'bg-danger bg-opacity-10' : 'bg-warning bg-opacity-10'}`}>
                    <div className="fw-semibold">{product.name}</div>
                    <div className="small text-muted">{product.category} • {product.quantity} {product.unit}</div>
                    <div className="badge bg-light text-dark float-end mt-1">{product.status}</div>
                  </div>
                ))
              ) : (
                <div className="text-muted">No expiring products found</div>
              )}
              <button className="btn btn-outline-secondary btn-sm w-100 mt-2">View All Expiring Items</button>
            </Card.Body>
          </Card>
        </Col>
        {/* Sales Analysis */}
        <Col md={4} sm={12}>
          <Card className="dashboard-card h-100">
            <Card.Body>
              <div className="fw-bold mb-2">Recent Sales</div>
              <div className="text-muted mb-2">Latest sales data</div>
              {salesAnalysis && Array.isArray(salesAnalysis) && salesAnalysis.length > 0 ? (
                salesAnalysis.slice(0, 4).map((day, idx) => (
                  <div key={day.id || idx} className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="fw-semibold">{day.date}</span>
                      <span className="badge bg-success">₹{day.totalSales}</span>
                    </div>
                    <div className="small text-muted mb-1">
                      {day.customers} customers • {day.totalProducts} products
                    </div>
                    <ProgressBar 
                      now={(day.totalSales / 200) * 100} 
                      style={{ height: 6 }} 
                      variant={day.totalSales > 150 ? 'success' : 'warning'}
                    />
                  </div>
                ))
              ) : (
                <div className="text-muted">No sales data available</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="gy-4 mt-1">
        <Col md={12}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="fw-bold mb-2">Quick Actions</div>
              <div className="text-muted mb-3">Common supermarket inventory tasks</div>
              <Row>
                <Col md={3} sm={6} xs={12} className="mb-2">
                  <button className="btn btn-outline-primary w-100">
                    <i className="fas fa-plus-circle me-2"></i> Add Product
                  </button>
                </Col>
                <Col md={3} sm={6} xs={12} className="mb-2">
                  <button className="btn btn-outline-secondary w-100">
                    <i className="fas fa-chart-bar me-2"></i> View Reports
                  </button>
                </Col>
                <Col md={3} sm={6} xs={12} className="mb-2">
                  <button className="btn btn-outline-success w-100">
                    <i className="fas fa-boxes me-2"></i> Update Stock
                  </button>
                </Col>
                <Col md={3} sm={6} xs={12} className="mb-2">
                  <button className="btn btn-outline-warning w-100">
                    <i className="fas fa-bell me-2"></i> Set Alerts
                  </button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;