import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Cart as CartType, CartItem as CartItemType } from '../types';
import { cartAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';
import CartItem from '../components/cart/CartItem';
import {LinkContainer} from 'react-router-bootstrap';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    fetchCart();
  }, [isAuthenticated, navigate]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      console.log('Cart API Response:', response);
      console.log('Cart Data:', response.data);
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load your cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      setUpdating(true);
      await cartAPI.updateCartItem(itemId, quantity);
      await fetchCart(); // Refresh cart after update
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError('Failed to update item quantity. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      setUpdating(true);
      await cartAPI.removeCartItem(itemId);
      await fetchCart(); // Refresh cart after removal
    } catch (err) {
      console.error('Error removing cart item:', err);
      setError('Failed to remove item from cart. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-5">
        <FontAwesomeIcon icon={faShoppingBag} size="3x" className="text-muted mb-3" />
        <h3>Your cart is empty</h3>
        <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
        <LinkContainer to="/products">
          <Button variant="success">
            Start Shopping
          </Button>
        </LinkContainer>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="mb-4">Your Cart</h1>
      
      {updating && (
        <Alert variant="info">
          Updating your cart...
        </Alert>
      )}
      
      <Row>
        <Col lg={8}>
          <div className="cart-items bg-white p-4 rounded shadow-sm mb-4">
            <div className="d-none d-md-flex fw-bold border-bottom pb-2 mb-3">
              <Row className="w-100">
                <Col xs={6}>Product</Col>
                <Col xs={2}>Quantity</Col>
                <Col xs={2} className="text-center">Price</Col>
                <Col xs={2} className="text-end">Actions</Col>
              </Row>
            </div>
            
            {cart.items.map((item: CartItemType) => (
              <CartItem 
                key={item._id} 
                item={item} 
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        </Col>
        
        <Col lg={4}>
          <div className="cart-summary bg-white p-4 rounded shadow-sm">
            <h4 className="mb-4">Order Summary</h4>
            
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{(cart.total || 0).toFixed(2)}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <hr />
            
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold">Total</span>
              <span className="fw-bold text-success fs-5">₹{(cart.total || 0).toFixed(2)}</span>
            </div>
            
            <LinkContainer to="/checkout">
              <Button 
                variant="success" 
                className="w-100 py-2"
              >
                Proceed to Checkout
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </LinkContainer>
            
            <div className="text-center mt-3">
              <LinkContainer to="/products">
                <Button 
                  variant="link" 
                  className="text-decoration-none"
                >
                  Continue Shopping
                </Button>
              </LinkContainer>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;