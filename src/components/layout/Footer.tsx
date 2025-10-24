import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3 d-flex align-items-center">
              <FontAwesomeIcon icon={faLeaf} className="text-success me-2" />
              Vruksha Farms
            </h5>
            <p className="text-white mb-3">
              Nourishing Nature, Cultivating Future
            </p>
            <p className="text-white">
              Pure. Honest. Sustainable. The Vruksha Way.
            </p>
            <div className="social-icons d-flex mt-3">
              <a href="https://facebook.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="https://twitter.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="https://instagram.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://youtube.com" className="text-light me-3" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-white">Home</Link></li>
              <li className="mb-2"><Link to="/products" className="text-decoration-none text-white">Products</Link></li>
              <li className="mb-2"><Link to="/categories" className="text-decoration-none text-white">Categories</Link></li>
              <li className="mb-2"><Link to="/about" className="text-decoration-none text-white">About Us</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-decoration-none text-white">Terms & Conditions</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-decoration-none text-white">Privacy Policy</Link></li>
            </ul>
          </Col>
          
          <Col lg={5} md={12}>
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-white">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
              10-11-40, Main Road, Near Pochamma Temple,
Balanagar, Fathenagar Colony, Hyderabad,
Telangana-500018
              </li>
              <li className="mb-2 text-white">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                +91 91 000 3222 3
              </li>
              <li className="mb-2 text-white">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                support@vrukshafarms.com
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4 bg-secondary" />
        
        <Row>
          <Col className="text-center text-white">
            <small>&copy; {new Date().getFullYear()} VSA AGRO GREEN PRIVATE LIMITED 
. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;