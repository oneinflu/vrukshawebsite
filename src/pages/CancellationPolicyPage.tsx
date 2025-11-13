import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CancellationPolicyPage: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="mb-4 text-success">Cancellation & Refund Policy</h1>

          <div className="bg-light p-4 rounded mb-4">
            <p className="lead">
              We aim to provide a smooth purchasing experience. This policy explains
              how cancellations and refunds work at Vruksha Farms.
            </p>
          </div>

          <section className="mb-4">
            <h3>1. Order Cancellation</h3>
            <p>
              You can cancel an order before it is shipped. Once shipped, cancellation
              is not guaranteed and may be processed as a return subject to eligibility.
            </p>
            <ul>
              <li>Cancel via your account under <strong>Orders</strong> or contact support.</li>
              <li>Provide the order ID and reason for cancellation.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h3>2. Refunds</h3>
            <p>
              Approved cancellations and eligible returns will be refunded to your
              original payment method.
            </p>
            <ul>
              <li>Refund initiation: within 3–5 business days after approval.</li>
              <li>Bank posting times may vary (typically 5–7 business days).</li>
            </ul>
          </section>

          <section className="mb-4">
            <h3>3. Non-Refundable Items</h3>
            <p>
              Certain items may be non‑refundable due to perishability or hygiene
              reasons. Please check product details before purchase.
            </p>
          </section>

          <section className="mb-4">
            <h3>4. Contact</h3>
            <p>
              For cancellations or refunds, reach us at <strong>info@vrukshafarms.com</strong>
              with your order details.
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

export default CancellationPolicyPage;