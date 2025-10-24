import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../services/AuthContext';
import { categoriesAPI, cartAPI } from '../../services/api';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [categories, setCategories] = useState<Array<{
    _id: string, 
    name: string,
    icon?: string,
    parent: string | null,
    createdAt: string,
    updatedAt: string,
    __v: number
  }>>([]);
  
  // Function to organize categories into hierarchy
  const organizeCategories = (categories: any[]) => {
    const parentCategories = categories.filter(cat => cat.parent === null);
    const childCategories = categories.filter(cat => cat.parent !== null);
    
    // Add children to each parent category
    parentCategories.forEach(parent => {
      parent.children = childCategories.filter(child => child.parent === parent._id);
    });
    
    return parentCategories;
  };
  
  const [parentCategories, setParentCategories] = useState<Array<any>>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        console.log('Categories API Response:', response);
        let categoriesData = [];
        
        // Check if response.data exists directly (not nested in data property)
        if (response.data && Array.isArray(response.data)) {
          console.log('Categories Data:', response.data);
          categoriesData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          // Alternative structure with nested data property
          console.log('Categories Data (nested):', response.data.data);
          categoriesData = response.data.data;
        }
        
        setCategories(categoriesData);
        
        // Organize categories into parent-child hierarchy
        const organized = organizeCategories(categoriesData);
        console.log('Organized Categories:', organized);
        setParentCategories(organized);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch cart data when user is authenticated
  useEffect(() => {
    const fetchCartData = async () => {
      if (isAuthenticated) {
        try {
          const response = await cartAPI.getCart();
          console.log('Cart API Response:', response);
          console.log('Cart Data:', response.data);
          
          if (response.data && response.data.items) {
            console.log('Cart Items:', response.data.items);
            console.log('Cart Items Count:', response.data.items.length);
            setCartItemCount(response.data.items.length);
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };

    fetchCartData();
  }, [isAuthenticated]);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-success">
          Vruksha
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation links in the center */}
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            
            {/* Shop by category dropdown */}
            <NavDropdown title="Shop by Category" id="category-dropdown">
              {parentCategories.map(parent => (
                <React.Fragment key={parent._id}>
                  {/* Parent category as a link */}
                  <NavDropdown.Item 
                    as={Link} 
                    to={`/products?category=${parent._id}`}
                    className="fw-bold d-flex align-items-center"
                  >
                    {parent.icon && (
                      <img 
                        src={parent.icon} 
                        alt={parent.name} 
                        style={{ width: '20px', height: '20px', marginRight: '8px', objectFit: 'contain' }} 
                      />
                    )}
                    {parent.name}
                  </NavDropdown.Item>
                  
                  {/* Child categories */}
                  {parent.children && parent.children.length > 0 && parent.children.map((child: any) => (
                    <NavDropdown.Item 
                      key={child._id}
                      as={Link} 
                      to={`/products?category=${child._id}`}
                      className="ps-4 d-flex align-items-center"
                    >
                      {child.icon && (
                        <img 
                          src={child.icon} 
                          alt={child.name} 
                          style={{ width: '16px', height: '16px', marginRight: '8px', objectFit: 'contain' }} 
                        />
                      )}
                      {child.name}
                    </NavDropdown.Item>
                  ))}
                  
                  {/* Add a divider after each parent and its children */}
                  <NavDropdown.Divider />
                </React.Fragment>
              ))}
              <NavDropdown.Item as={Link} to="/categories">All Categories</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          
          {/* Icons on the right */}
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/cart" className="me-3 position-relative">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                  <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
                    {cartItemCount}
                  </Badge>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="me-3">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/cart" className="me-3 position-relative">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="me-3">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;