import React, { useState, useEffect, useCallback } from 'react';
import { Table, Form, Card, Badge, Spinner, Alert as AlertComponent, Row, Col } from 'react-bootstrap';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/firebaseApi';
import '../styles/Products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const filters = {};
      if (filter === 'expiry') filters.hasExpiry = true;
      if (filter === 'no-expiry') filters.hasExpiry = false;
      
      const data = await getProducts(filters);
      if (data) {
        setProducts(data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Error loading products');
      console.error('Products fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // eslint-disable-next-line no-unused-vars
  const handleProductAction = async (action, productId, data = null) => {
    try {
      let result;
      switch (action) {
        case 'create':
          result = await createProduct(data);
          break;
        case 'update':
          result = await updateProduct(productId, data);
          break;
        case 'delete':
          result = await deleteProduct(productId);
          break;
        default:
          return;
      }
      
      if (result) {
        await fetchProducts(); // Refresh the list
      }
    } catch (err) {
      console.error(`Error ${action}ing product:`, err);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.batch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                        (filter === 'expiry' && product.expiry !== 'No expiry') ||
                        (filter === 'no-expiry' && product.expiry === 'No expiry');
    return matchesSearch && matchesFilter;
  });

  const getStatusVariant = (status) => {
    if (status.includes('left')) return 'warning';
    if (status === 'Good') return 'success';
    if (status === 'Expired') return 'danger';
    return 'secondary';
  };

  const getVelocityVariant = (velocity) => {
    if (velocity === 'Fast') return 'success';
    if (velocity === 'Medium') return 'warning';
    return 'danger';
  };

  const formatQuantity = (product) => {
    return `${product.quantity} ${product.unit}`;
  };

  if (loading) {
    return (
      <div className="products-modern">
        <div className="text-center p-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-modern">
        <AlertComponent variant="danger">
          <AlertComponent.Heading>Error Loading Products</AlertComponent.Heading>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchProducts}>
            Retry
          </button>
        </AlertComponent>
      </div>
    );
  }

  return (
    <div className="products-modern">
      <Row className="gy-4">
        <Col md={4} sm={12}>
          <Card className="search-card mb-3">
            <Card.Body>
              <Form.Control 
                placeholder="Search products or batch numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="filter-buttons mt-3 d-flex gap-2">
                <button 
                  className={filter === 'all' ? 'active' : ''}
                  onClick={() => setFilter('all')}
                >
                  All Products
                </button>
                <button 
                  className={filter === 'expiry' ? 'active' : ''}
                  onClick={() => setFilter('expiry')}
                >
                  With Expiry Date
                </button>
                <button 
                  className={filter === 'no-expiry' ? 'active' : ''}
                  onClick={() => setFilter('no-expiry')}
                >
                  No Expiry Date
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} sm={12}>
          {selectedProducts.length > 0 && (
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <span>{selectedProducts.length} product(s) selected</span>
                  <div>
                    <button className="btn btn-outline-primary btn-sm me-2">
                      Bulk Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                      Bulk Delete
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="products-table-card">
            <Card.Body>
              <Table responsive hover className="products-table align-middle">
                <thead>
                  <tr>
                    <th>
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Batch</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Expiry</th>
                    <th>Status</th>
                    <th>Velocity</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                        />
                      </td>
                      <td>
                        <div>
                          <strong>{product.name}</strong>
                          <br />
                          <small className="text-muted">{product.pricePerUnit}</small>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.batch}</td>
                      <td>
                        <div>
                          <strong>{formatQuantity(product)}</strong>
                          <br />
                          <small className="text-muted">
                            Min: {product.minStock} {product.unit} | Max: {product.maxStock} {product.unit}
                          </small>
                        </div>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.expiry}</td>
                      <td>
                        <Badge bg={getStatusVariant(product.status)}>
                          {product.status}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={getVelocityVariant(product.velocity)}>
                          {product.velocity}
                        </Badge>
                      </td>
                      <td>
                        <small className="text-muted">{product.location}</small>
                      </td>
                      <td>
                        <button className="action-btn">⋮</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {filteredProducts.length === 0 && (
                <div className="text-center p-4">
                  <p className="text-muted">No products found matching your criteria</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Products;