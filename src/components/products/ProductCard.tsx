import React from 'react';
import { Card, Button } from 'react-bootstrap';

import { Product } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { cartAPI } from '../../services/api';
import { useAuth } from '../../services/AuthContext';


interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { isAuthenticated } = useAuth();
  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    
    try {
      await cartAPI.addToCart(product._id, 1);
      if (onAddToCart) onAddToCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  return (
    <Card className="h-100 border-0 shadow-sm product-card">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={product.images && product.images.length > 0 ? product.images[0].replace(/[` ]/g, '') : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h5 mb-2">{product.name}</Card.Title>
        <Card.Text className="text-muted small mb-3 flex-grow-1">
          {product.description.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div className="price-container">
            <span className="fw-bold">₹{product.variation && product.variation.length > 0 ? product.variation[0].price : (product.price?.toFixed(2) || '0.00')}</span>
          </div>
          <Button 
            variant="success" 
            size="sm" 
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
          >
            <FontAwesomeIcon icon={faCartPlus} className="me-1" /> Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;