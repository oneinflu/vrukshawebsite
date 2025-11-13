import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const UserDeletionPolicyPage: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="mb-4 text-success">User Account Deletion Policy</h1>

          <div className="bg-light p-4 rounded mb-4">
            <p className="lead">
              This policy explains how you can request deletion of your account and
              personal data at Vruksha Farms, and what happens afterward.
            </p>
          </div>

          <section className="mb-4">
            <h3>1. How to Request Deletion</h3>
            <p>
              You can request account deletion by contacting our support or from your
              account settings (if available).
            </p>
            <ul>
              <li>Email: <strong>info@vrukshafarms.com</strong></li>
              <li>Include your registered email and confirmation to proceed.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h3>2. What We Delete</h3>
            <p>
              We delete your profile and login credentials. Certain records may be
              retained to comply with legal, accounting, or fraud‑prevention
              obligations.
            </p>
            <ul>
              <li>Order and invoice records retained as required by law.</li>
              <li>Aggregated or anonymized data may be kept for analytics.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h3>3. Timeline</h3>
            <p>
              We aim to process verified deletion requests within 15 business days.
              You will receive confirmation when the request is completed.
            </p>
          </section>

          <section className="mb-4">
            <h3>4. Effects of Deletion</h3>
            <p>
              After deletion, you will lose access to your account and associated
              services. You may need to provide order details for any future support.
            </p>
          </section>

          <section className="mb-4">
            <h3>5. Contact</h3>
            <p>
              For any questions or to initiate deletion, email
              <strong> info@vrukshafarms.com</strong>.
            </p>
          </section>

          <div className="bg-light p-3 rounded text-center mt-5">
            <p className="mb-0">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDeletionPolicyPage;