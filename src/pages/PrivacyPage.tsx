import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PrivacyPage: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="mb-4 text-success">Privacy Policy</h1>
          
          <div className="bg-light p-4 rounded mb-4">
            <p className="lead">
              At Vruksha Farms, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </div>
          
          <section className="mb-4">
            <h3>1. Information We Collect</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Register on our website</li>
              <li>Place an order</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us</li>
              <li>Participate in promotions or surveys</li>
            </ul>
            <p>The personal information we collect may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and shipping address</li>
              <li>Payment information</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h3>2. How We Use Your Information</h3>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraudulent transactions and monitor against theft</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h3>3. Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>4. Third-Party Disclosure</h3>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described below:
            </p>
            <ul>
              <li>Service providers who assist us in operating our website, conducting our business, or serving our users</li>
              <li>Business partners with your consent</li>
              <li>Legal requirements: to comply with law, respond to legal requests, protect our rights</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h3>5. Data Security</h3>
            <p>
              We implement appropriate security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>6. Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing your personal information</li>
              <li>Request transfer of your personal information</li>
              <li>Withdraw consent</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h3>7. Children's Privacy</h3>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>8. Changes to This Privacy Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>9. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: info@vrukshafarms.com<br />
              Phone: +91 98765 43210
            </p>
          </section>
          
          <div className="bg-light p-3 rounded text-center mt-5">
            <p className="mb-0">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPage;