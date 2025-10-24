import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import { Product, Category } from '../types';
import { productsAPI, categoriesAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';

const ProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryCategoryId = queryParams.get('category');
  
  // Use either the URL param or query param for category
  const activeCategoryId = categoryId || queryCategoryId;
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<{[key: string]: Product[]}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesAPI.getAll();
        console.log('Categories response:', response);
        
        let categoriesData: Category[] = [];
        if (response.data && Array.isArray(response.data)) {
          categoriesData = response.data;
        } else if (response.data && Array.isArray(response.data.categories)) {
          categoriesData = response.data.categories;
        }
        
        setCategories(categoriesData);
        
        // If we have an active category ID, find the matching category
        if (activeCategoryId && categoriesData.length > 0) {
          const category = categoriesData.find(cat => cat._id === activeCategoryId);
          if (category) {
            setActiveCategory(category);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [activeCategoryId]);

  // Fetch products based on whether we have a specific category or need all categories
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsMap: {[key: string]: Product[]} = {};
      
      try {
        if (activeCategoryId) {
          // Fetch products for just the active category
          console.log(`Fetching products for specific category: ${activeCategoryId}`);
          const response = await productsAPI.getByCategory(activeCategoryId);
          
          let productsData: Product[] = [];
          if (response.data) {
            if (Array.isArray(response.data)) {
              productsData = response.data;
            } else if (Array.isArray(response.data.products)) {
              productsData = response.data.products;
            } else if (typeof response.data === 'object') {
              productsData = [response.data];
            }
          }
          
          if (productsData.length > 0) {
            productsMap[activeCategoryId] = productsData;
          }
        } else {
          // Fetch products for all categories
          for (const category of categories) {
            try {
              console.log(`Fetching products for category: ${category.name} (${category._id})`);
              const response = await productsAPI.getByCategory(category._id);
              
              let productsData: Product[] = [];
              if (response.data) {
                if (Array.isArray(response.data)) {
                  productsData = response.data;
                } else if (Array.isArray(response.data.products)) {
                  productsData = response.data.products;
                } else if (typeof response.data === 'object') {
                  productsData = [response.data];
                }
              }
              
              if (productsData.length > 0) {
                productsMap[category._id] = productsData;
              }
            } catch (error) {
              console.error(`Error fetching products for category ${category.name}:`, error);
            }
          }
        }
        
        setCategoryProducts(productsMap);
      } catch (error) {
        console.error('Error in fetchProducts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0 || activeCategoryId) {
      fetchProducts();
    }
  }, [categories, activeCategoryId]);

  const handleCartUpdate = () => {
    // This function will be called when a product is added to cart
  };

  // Render products for a specific category or all categories
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2">Loading products...</p>
        </div>
      );
    }
    
    if (activeCategoryId) {
      // Render products for specific category
      const products = categoryProducts[activeCategoryId] || [];
      
      if (products.length === 0) {
        return (
          <div className="text-center py-5">
            <p>No products found in this category.</p>
          </div>
        );
      }
      
      return (
        <div>
          <h1 className="mb-4">{activeCategory?.name || 'Category Products'}</h1>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map(product => (
              <Col key={product._id}>
                <ProductCard product={product} onAddToCart={handleCartUpdate} />
              </Col>
            ))}
          </Row>
        </div>
      );
    } else {
      // Render all categories and their products
      if (categories.length === 0) {
        return (
          <div className="text-center py-5">
            <p>No categories found.</p>
          </div>
        );
      }
      
      return (
        <div>
          <h1 className="mb-4">All Products by Category</h1>
          {categories.map(category => {
            const products = categoryProducts[category._id] || [];
            
            if (products.length === 0) {
              return null; // Skip categories with no products
            }
            
            return (
              <div key={category._id} className="mb-5">
                <h2 className="border-bottom pb-2 mb-4">{category.name}</h2>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  {products.map(product => (
                    <Col key={product._id}>
                      <ProductCard product={product} onAddToCart={handleCartUpdate} />
                    </Col>
                  ))}
                </Row>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="products-page">
      {renderContent()}
    </div>
  );
};

export default ProductsPage;