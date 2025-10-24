import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TermsPage: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="mb-4 text-success">Terms and Conditions</h1>
          
          <div className="bg-light p-4 rounded mb-4">
            <p className="lead">
              Welcome to Vruksha Farms. These terms and conditions outline the rules and regulations for the use of our website and services.
            </p>
          </div>
          
          <section className="mb-4">
            <h3>1. Introduction</h3>
            <p>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Vruksha Farms' website if you do not accept all of the terms and conditions stated on this page.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>2. Intellectual Property Rights</h3>
            <p>
              Other than the content you own, under these terms, Vruksha Farms and/or its licensors own all the intellectual property rights and materials contained in this website. You are granted limited license only for purposes of viewing the material contained on this website.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>3. Restrictions</h3>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>Publishing any website material in any other media</li>
              <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
              <li>Publicly performing and/or showing any website material</li>
              <li>Using this website in any way that is or may be damaging to this website</li>
              <li>Using this website in any way that impacts user access to this website</li>
              <li>Using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity</li>
            </ul>
          </section>
          
          <section className="mb-4">
            <h3>4. Your Content</h3>
            <p>
              In these terms and conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this website. By displaying Your Content, you grant Vruksha Farms a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
            </p>
            <p>
              Your Content must be your own and must not be invading any third-party's rights. Vruksha Farms reserves the right to remove any of Your Content from this website at any time without notice.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>5. No Warranties</h3>
            <p>
              This website is provided "as is," with all faults, and Vruksha Farms express no representations or warranties, of any kind related to this website or the materials contained on this website.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>6. Limitation of Liability</h3>
            <p>
              In no event shall Vruksha Farms, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Vruksha Farms, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>7. Indemnification</h3>
            <p>
              You hereby indemnify to the fullest extent Vruksha Farms from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these terms.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>8. Severability</h3>
            <p>
              If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>9. Variation of Terms</h3>
            <p>
              Vruksha Farms is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.
            </p>
          </section>
          
          <section className="mb-4">
            <h3>10. Governing Law & Jurisdiction</h3>
            <p>
              These terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
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

export default TermsPage;