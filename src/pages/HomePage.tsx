import React, { useState, useEffect } from 'react';
import { Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Product, Category } from '../types';
import { productsAPI, categoriesAPI, slidersAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faRecycle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

interface Slider {
  _id: string;
  image: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, slidersRes] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll(),
          slidersAPI.getAll()
        ]);
        
        // Get all products from the API response
        const products = Array.isArray(productsRes.data) ? productsRes.data : 
                        (productsRes.data && Array.isArray(productsRes.data.data) ? productsRes.data.data : []);
        
        // Log the products data to console
        console.log('Products data:', products);
        
        // Set only 8 products as featured products
        setFeaturedProducts(products.slice(0, 8));
        
        // Set only 4 categories
        setCategories(categoriesRes.data.slice(0, 4));
        
        // Log the API responses to console
        console.log('Products API Response:', productsRes.data);
        console.log('Categories API Response:', categoriesRes.data);
        console.log('Sliders API Response:', slidersRes.data);
        
        setSliders(slidersRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        // If sliders API fails, use default sliders
        setSliders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section mb-5 vw-100 position-relative" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
        <Carousel fade className="w-100">
          {sliders.length > 0 ? (
            sliders.map((slider) => (
              <Carousel.Item key={slider._id}>
                <img
                  className="d-block w-100"
                  src={slider.image}
                  alt={slider.title || "Slider image"}
                  style={{ height: 'auto', maxHeight: '100%', objectFit: 'contain', width: '100%' }}
                />
                <Carousel.Caption>
                  <h1 className="display-4 fw-bold">{slider.title}</h1>
                  <p className="lead">{slider.subtitle}</p>
                  <Link to={slider.buttonLink || "/"}>
                     <Button variant={slider.buttonVariant || "success"}>{slider.buttonText}</Button>
                   </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <>
              <Carousel.Item>
                <div className="d-block w-100 bg-success text-white p-5 rounded" style={{ height: '400px' }}>
                  <div className="d-flex flex-column justify-content-center h-100">
                    <h1 className="display-4 fw-bold">Eco-Friendly Products</h1>
                    <p className="lead">Sustainable living made easy with our curated collection</p>
                    <div>
                      <LinkContainer to="/products">
                        <Button variant="light" className="me-2">Shop Now</Button>
                      </LinkContainer>
                      <LinkContainer to="/categories">
                        <Button variant="outline-light">Browse Categories</Button>
                      </LinkContainer>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="d-block w-100 bg-primary text-white p-5 rounded" style={{ height: '400px' }}>
                  <div className="d-flex flex-column justify-content-center h-100">
                    <h1 className="display-4 fw-bold">New Arrivals</h1>
                    <p className="lead">Check out our latest eco-friendly products</p>
                    <div>
                      <LinkContainer to="/products">
                        <Button variant="light">Explore Now</Button>
                      </LinkContainer>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            </>
          )}
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="features-section mb-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <FontAwesomeIcon icon={faLeaf} size="3x" className="text-success" />
              </div>
              <Card.Title>Eco-Friendly</Card.Title>
              <Card.Text>All our products are made with sustainable materials and processes.</Card.Text>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <FontAwesomeIcon icon={faRecycle} size="3x" className="text-primary" />
              </div>
              <Card.Title>Recyclable</Card.Title>
              <Card.Text>Our packaging is 100% recyclable to minimize environmental impact.</Card.Text>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <FontAwesomeIcon icon={faShieldAlt} size="3x" className="text-warning" />
              </div>
              <Card.Title>Quality Assured</Card.Title>
              <Card.Text>We ensure all products meet high-quality standards.</Card.Text>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section mb-5">
        <h2 className="section-title mb-4 text-center">Our Products</h2>
        <p className="text-center mb-4">Explore our wide range of eco-friendly products</p>
        {loading ? (
          <div className="text-center py-5">
            <p>Loading products...</p>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {featuredProducts.map(product => (
              <Col key={product._id}>
                <LinkContainer to={`/products/${product._id}`}>
                  <div>
                    <ProductCard product={product} />
                  </div>
                </LinkContainer>
              </Col>
            ))}
          </Row>
        )}
        <div className="text-center mt-4">
          <LinkContainer to="/products">
            <Button variant="outline-success">View All Products</Button>
          </LinkContainer>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Shop by Category</h2>
          <LinkContainer to="/categories">
            <Button variant="outline-success">All Categories</Button>
          </LinkContainer>
        </div>
        
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <Row xs={1} sm={2} md={4} className="g-4">
            {categories.map(category => (
              <Col key={category._id}>
                <Card className="h-100 border-0 shadow-sm category-card">
                  <Card.Img 
                    variant="top" 
                    src={category.icon || category.imageUrl || 'https://via.placeholder.com/300x200?text=Category'} 
                    alt={category.name}
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{category.name}</Card.Title>
                    <LinkContainer to={`/products/category/${category._id}`}>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                      >
                        Browse Products
                      </Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </div>
  );
};

export default HomePage;