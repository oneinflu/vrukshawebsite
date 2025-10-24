import React, { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Cart } from '../types';
import { cartAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await cartAPI.getCart();
        
        if (!response.data || response.data.items.length === 0) {
          navigate('/cart');
          return;
        }
        
        setCart(response.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to load your cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div className="text-center py-5">Loading checkout...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!cart) {
    return <Alert variant="info">Your cart is empty. Please add items before checkout.</Alert>;
  }

  return (
    <div className="checkout-page">
      <h1 className="mb-4">Checkout</h1>
      
      <Row>
        <Col lg={8}>
          <CheckoutForm totalAmount={cart.total} />
        </Col>
        
        <Col lg={4}>
          <div className="bg-light p-4 rounded shadow-sm">
            <h4 className="mb-3">Order Summary</h4>
            
            <div className="mb-3">
              {cart.items.map(item => (
                <div key={item._id} className="d-flex justify-content-between mb-2">
                  <span>
                    {item.product.name} <small className="text-muted">x{item.quantity}</small>
                  </span>
                  <span>₹{((parseFloat(String(item.variation.price || 0)) * (item.quantity || 1))).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <hr />
            
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{cart.total.toFixed(2)}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <hr />
            
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total</span>
              <span className="fw-bold text-success">₹{cart.total.toFixed(2)}</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;