import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Spinner, Alert, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../types';
import { productsAPI, cartAPI } from '../services/api';
import { useAuth } from '../services/AuthContext';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [selectedVariation, setSelectedVariation] = useState<number>(0);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Fetching product with ID:', productId);
        const response = await productsAPI.getById(productId || '');
        
        // Log the complete API response
        console.log('Complete API response:', response);
        
        if (response && response.data) {
          console.log('Product data:', response.data);
          setProduct(response.data);
        } else {
          setError('Failed to load product data');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/products/${productId}` } });
      return;
    }
    
    try {
      setAddingToCart(true);
      setError(null); // Clear any previous errors
      
      // Get the product ID and selected variation index
      const selectedProductId = product._id;
      
      console.log('Adding to cart:', {
        productId: selectedProductId,
        variationIndex: selectedVariation,
        quantity: quantity
      });
      
      const response = await cartAPI.addToCart(selectedProductId, quantity, selectedVariation);
      console.log('Add to cart response:', response);
      
      // Only navigate to cart if the request was successful
      if (response && response.data) {
        navigate('/cart');
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Loading product details...</p>
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

  if (!product) {
    return (
      <Alert variant="warning">
        Product not found
      </Alert>
    );
  }

  // Get current price based on selected variation or default price
  const currentPrice = product.variation && product.variation.length > 0 
    ? product.variation[selectedVariation].price 
    : (product.price || 0);

  return (
    <div className="product-detail-page">
      <Button 
        variant="link" 
        className="mb-4 text-decoration-none" 
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back to Products
      </Button>
      
      <Row>
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="border-0 shadow-sm">
            <Card.Img 
              src={product.images && product.images.length > 0 
                ? product.images[0].replace(/[` ]/g, '') 
                : (product.imageUrl || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png')} 
              alt={product.name}
              className="img-fluid"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
              }}
            />
          </Card>
        </Col>
        
        <Col md={6}>
          <h1 className="mb-2">{product.name}</h1>
          <p className="text-muted mb-4">{product.description}</p>
          
          <div className="d-flex align-items-center mb-4">
            <h3 className="text-success mb-0 me-3">₹{currentPrice}</h3>
            
          </div>
          
          <Form className="mb-4">
            {product.variation && product.variation.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Variation</Form.Label>
                <Form.Select 
                  value={selectedVariation}
                  onChange={(e) => setSelectedVariation(parseInt(e.target.value))}
                >
                  {product.variation.map((variant, index) => (
                    <option key={variant._id || index} value={index}>
                      {variant.weight} - ₹{variant.price} ({variant.pcs} pcs)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
            
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <div className="d-flex align-items-center">
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  
                >
                  -
                </Button>
                <div className="px-3 fw-bold">{quantity}</div>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
           
                >
                  +
                </Button>
              </div>
            </Form.Group>
            
            <Button 
              variant="success" 
              size="lg" 
              className="w-100"
              
              onClick={handleAddToCart}
            >
              {addingToCart ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Adding...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </Form>
          
          <Card className="border-0 bg-light p-3">
            <h5>Product Details</h5>
            <ul className="mb-0">
              <li>Category: {product.category?.name || 'Uncategorized'}</li>
              <li>Stock: {product.stock || 0} units</li>
              <li>Product ID: {product._id}</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;