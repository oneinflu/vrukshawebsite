import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="min-vh-100 py-4">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;