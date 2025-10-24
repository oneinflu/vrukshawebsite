import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    onUpdateQuantity(item._id, newQuantity);
  };

  // Get the first image from the product images array
  const imageUrl = item.product.images && item.product.images.length > 0 
    ? item.product.images[0].replace(/[` ]/g, '').trim() 
    : 'https://via.placeholder.com/100x100?text=Product';

  // Calculate price based on variation price
  const price = item.variation ? item.variation.price : (item.product.price || 0);
  const totalPrice = price * item.quantity;

  return (
    <Row className="cart-item align-items-center py-3 border-bottom">
      <Col xs={3} md={2}>
        <img 
          src={imageUrl} 
          alt={item.product.name}
          className="img-fluid rounded"
          style={{ maxHeight: '80px', objectFit: 'cover' }}
        />
      </Col>
      <Col xs={9} md={4}>
        <h5 className="mb-1">{item.product.name}</h5>
        <p className="text-muted small mb-0">
          {item.product.description.length > 60 
            ? `${item.product.description.substring(0, 60)}...` 
            : item.product.description}
        </p>
        {item.variation && (
          <p className="text-muted small mb-0">
            Weight: {item.variation.weight}
          </p>
        )}
      </Col>
      <Col xs={4} md={2} className="mt-3 mt-md-0">
        <Form.Select 
          value={item.quantity} 
          onChange={handleQuantityChange}
          size="sm"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col xs={4} md={2} className="text-center mt-3 mt-md-0">
        <span className="fw-bold">₹{totalPrice.toFixed(2)}</span>
      </Col>
      <Col xs={4} md={2} className="text-end mt-3 mt-md-0">
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={() => onRemove(item._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;