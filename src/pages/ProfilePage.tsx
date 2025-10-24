import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, ListGroup, Badge, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { authAPI, ordersAPI } from '../services/api';
import { Address } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");
  
  // Form state
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [country, setCountry] = useState<string>('India');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchAddresses();
    fetchOrders();
  }, [isAuthenticated, navigate]);
  
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getAddresses();
      console.log('Address response:', response.data);
      
      // Handle the correct address format from the API
      const addressesData = Array.isArray(response.data) 
        ? response.data 
        : Array.isArray(response.data?.addresses) 
          ? response.data.addresses 
          : [];
          
      console.log('Processed addresses:', addressesData);
      setAddresses(addressesData);
    } catch (err) {
      console.error('Error fetching addresses:', err);
      setError('Failed to load your addresses. Please try again.');
      // Initialize with empty array on error
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const response = await ordersAPI.getUserOrders();
      console.log('Orders response:', response.data);
      
      const ordersData = Array.isArray(response.data) 
        ? response.data 
        : Array.isArray(response.data?.orders) 
          ? response.data.orders 
          : [];
          
      console.log('Processed orders:', ordersData);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrdersError('Failed to load your orders. Please try again.');
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };
  
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const addressData = {
      address: street, // Map street to address as expected by API
      city,
      state,
      pincode: postalCode, // Map postalCode to pincode as expected by API
    };
    
    try {
      if (editingAddress) {
        await authAPI.updateAddress(editingAddress._id, addressData);
      } else {
        await authAPI.addAddress(addressData);
      }
      
      resetForm();
      fetchAddresses();
    } catch (err) {
      console.error('Error saving address:', err);
      setError('Failed to save address. Please try again.');
    }
  };
  
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setStreet(address.address); // Use address instead of street
    setCity(address.city);
    setState(address.state);
    setPostalCode(address.pincode); // Use pincode instead of postalCode
    setCountry(address.country || 'India'); // Provide default value if undefined
    setIsDefault(address.isDefault || false); // Provide default value if undefined
    setShowAddressForm(true);
  };
  
  const handleDeleteAddress = async (addressId: string) => {
    try {
      await authAPI.deleteAddress(addressId);
      fetchAddresses();
    } catch (err) {
      console.error('Error deleting address:', err);
      setError('Failed to delete address. Please try again.');
    }
  };
  
  const resetForm = () => {
    setStreet('');
    setCity('');
    setState('');
    setPostalCode('');
    setCountry('India');
    setIsDefault(false);
    setEditingAddress(null);
    setShowAddressForm(false);
  };
  
  if (!isAuthenticated || !user) {
    return <div>Please log in to view your profile.</div>;
  }
  
  return (
    <Container className="py-5">
      <h1 className="mb-4">My Profile</h1>
      
      <Tab.Container id="profile-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k || "profile")}>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <span className="h3 mb-0">{user?.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <h5 className="mt-3 mb-1">{user?.name}</h5>
                  <p className="text-muted mb-0">{user?.email}</p>
                </div>
                
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="profile" className="mb-2">Profile Information</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="addresses" className="mb-2">My Addresses</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders" className="mb-2">My Orders</Nav.Link>
                  </Nav.Item>
                </Nav>
                
                <div className="mt-4">
                  <Button variant="outline-danger" onClick={logout} className="w-100">
                    Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h4 className="mb-4">Profile Information</h4>
                    <Row>
                      <Col md={6}>
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              <Tab.Pane eventKey="addresses">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="mb-0">My Addresses</h4>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => {
                          resetForm();
                          setShowAddressForm(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} className="me-1" /> Add New Address
                      </Button>
                    </div>
                    
                    {error && <Alert variant="danger">{error}</Alert>}
              
              {showAddressForm && (
                <Form onSubmit={handleAddressSubmit} className="mb-4 p-3 bg-light rounded">
                  <h5>{editingAddress ? 'Edit Address' : 'Add New Address'}</h5>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Check 
                          type="checkbox" 
                          label="Set as default address" 
                          checked={isDefault}
                          onChange={(e) => setIsDefault(e.target.checked)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                      {editingAddress ? 'Update Address' : 'Save Address'}
                    </Button>
                    <Button variant="outline-secondary" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
              
              {loading ? (
                <div className="text-center py-3">Loading addresses...</div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-3">No addresses found. Add your first address.</div>
              ) : (
                <div className="address-list">
                  {addresses.map((address) => (
                    <Card key={address._id} className="mb-3 border-0 shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6>
                              {address.address}
                              {address.isDefault && (
                                <span className="ms-2 badge bg-success">Default</span>
                              )}
                            </h6>
                            <p className="mb-0 text-muted">
                              {address.city}, {address.state} {address.pincode}<br />
                              {address.country || 'India'}
                            </p>
                          </div>
                          <div>
                            <Button 
                              variant="link" 
                              className="text-primary p-0 me-2"
                              onClick={() => handleEditAddress(address)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button 
                              variant="link" 
                              className="text-danger p-0"
                              onClick={() => handleDeleteAddress(address._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab.Pane>
        
        <Tab.Pane eventKey="orders">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4">My Orders</h4>
              
              {ordersError && <Alert variant="danger">{ordersError}</Alert>}
              
              {ordersLoading ? (
                <div className="text-center py-3">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-3">
                  <p>You haven't placed any orders yet.</p>
                  <Button variant="primary" onClick={() => navigate('/products')}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="order-list">
                  {orders.map((order) => (
                    <Card key={order._id} className="mb-3 border-0 shadow-sm">
                      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Order #{order._id.substring(order._id.length - 6)}</strong>
                          <span className="ms-3 text-muted">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge bg={order.status === 'delivered' ? 'success' : order.status === 'processing' ? 'warning' : 'info'}>
                          {order.status}
                        </Badge>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={8}>
                            <h6>Items</h6>
                            <ListGroup variant="flush">
                              {order.items && order.items.map((item: any) => (
                                <ListGroup.Item key={item._id} className="px-0 py-2 border-0">
                                  <div className="d-flex justify-content-between">
                                    <div>
                                      <p className="mb-0">{item.product?.name || 'Product'}</p>
                                      <small className="text-muted">Quantity: {item.quantity}</small>
                                    </div>
                                    <div>
                                      <p className="mb-0">₹{((parseFloat(String(item.product?.price || 0)) * (item.quantity || 1))).toFixed(2)}</p>
                                    </div>
                                  </div>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          </Col>
                          <Col md={4}>
                            <h6>Order Details</h6>
                            <p className="mb-1"><strong>Total:</strong> ₹{order.total?.toFixed(2) || '0.00'}</p>
                            <p className="mb-1"><strong>Payment:</strong> {order.paymentMethod || 'Online'}</p>
                            {order.isRecurring && (
                              <p className="mb-1">
                                <Badge bg="info">Recurring</Badge>
                                <small className="ms-2">
                                  Starts: {new Date(order.startDate).toLocaleDateString()}
                                </small>
                              </p>
                            )}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
            
            </Container>
  );
};

export default ProfilePage;