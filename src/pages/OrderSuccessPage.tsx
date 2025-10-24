import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const { orderId } = location.state || { orderId: null };

  return (
    <Container className="py-5">
      <Card className="text-center shadow border-0 p-4">
        <Card.Body>
          <div className="mb-4">
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-success" 
              style={{ fontSize: '5rem' }} 
            />
          </div>
          
          <Card.Title as="h1" className="mb-4">Order Placed Successfully!</Card.Title>
          
          {orderId && (
            <Card.Text className="mb-4">
              Your order ID: <strong>{orderId}</strong>
            </Card.Text>
          )}
          
          <Card.Text className="mb-4">
            Thank you for your purchase. We've received your order and will begin processing it right away.
            You will receive a confirmation email shortly with your order details.
          </Card.Text>
          
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/products">
              <Button variant="outline-primary">
                <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderSuccessPage;