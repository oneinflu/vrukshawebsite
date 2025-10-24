import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutUsPage: React.FC = () => {
  return (
    <Container className="about-us-page py-4">
      {/* Banner Section */}
      <div 
        className="banner-section text-center py-5 mb-5 rounded" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          color: 'white'
        }}
      >
        <div style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          borderRadius: '0.25rem'
        }}></div>
        
        <div className="position-relative py-5">
          <h1 className="display-4 fw-bold mb-2">🌾 Vruksha Farms</h1>
          <p className="lead mb-0">Nourishing Nature, Cultivating Future</p>
        </div>
      </div>
      
      {/* About Us Content */}
      <section className="mb-5">
        <h2 className="text-center mb-4">🥦 About Us</h2>
        
        <Row className="mb-4">
          <Col lg={12}>
            <p>
              At Vruksha Farms, we believe that true wellness begins at the roots — in the soil, in the seeds, and in the way we grow our food. 
              We bring you nature's purest goodness directly from our farmers to our customers, ensuring every product reflects freshness, authenticity, and care. 
              Our range includes farm-fresh fruits and vegetables, cold-pressed oils, organic spices and powders, pulses and millets, pure ghee, and natural raw honey — all cultivated with love and integrity. 
              We are committed to offering healthier, safer, and more natural food choices that nourish both people and the planet.
            </p>
          </Col>
        </Row>
        
        <Row className="mb-4 align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <Image 
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Sustainable Farming" 
              fluid 
              rounded 
              className="shadow"
            />
          </Col>
          <Col lg={6}>
            <p>
              At Vruksha Farms, we don't just source — we support, guide, and educate farmers to adopt pesticide-free, chemical-free, and sustainable farming practices. 
              By empowering them with knowledge and fair partnerships, we ensure every crop is grown the right way — naturally and responsibly. 
              Every product is carefully graded for purity and quality, and only the finest reaches our customers. 
              Because for us, purity, trust, and sustainability are not just values — they are our way of life.
            </p>
          </Col>
        </Row>
        
        <Row className="align-items-center">
          <Col lg={6} className="order-lg-2 mb-4 mb-lg-0">
            <Image 
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Organic Produce" 
              fluid 
              rounded 
              className="shadow"
            />
          </Col>
          <Col lg={6} className="order-lg-1">
            <p>
              Our vision is to build a healthier and more sustainable future through conscious farming and mindful living. 
              We aim to make organic and natural living accessible to everyone, while creating a transparent link between farmers and customers. 
              At Vruksha Farms, we stand for honesty, care, and harmony with the Earth — because when nature thrives, we all thrive.
            </p>
          </Col>
        </Row>
      </section>
      
      {/* Tagline Divider */}
      <div className="text-center py-4 my-5">
        <p className="h5 text-success font-italic">
          🌱 "Because when we nourish nature, we cultivate a better future."
        </p>
        <hr className="w-25 mx-auto my-4" />
      </div>
    </Container>
  );
};

export default AboutUsPage;