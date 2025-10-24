import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Address } from '../../types';
import { authAPI, ordersAPI } from '../../services/api';

interface CheckoutFormProps {
  totalAmount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalAmount }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [schedule, setSchedule] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const weekdays = [
    { value: 'mon', label: 'Monday' },
    { value: 'tue', label: 'Tuesday' },
    { value: 'wed', label: 'Wednesday' },
    { value: 'thurs', label: 'Thursday' },
    { value: 'fri', label: 'Friday' },
    { value: 'sat', label: 'Saturday' },
    { value: 'sun', label: 'Sunday' }
  ];

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await authAPI.getAddresses();
        console.log('Address API Response:', response);
        console.log('Address Data:', response.data);
        
        // Handle the correct address format from the API
        const addressesData = Array.isArray(response.data?.addresses) 
          ? response.data.addresses 
          : [];
          
        console.log('Processed addresses:', addressesData);
        setAddresses(addressesData);
        
        if (addressesData.length > 0) {
          setSelectedAddressId(addressesData[0]._id);
        }
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
        setError('Failed to load your addresses. Please try again.');
        // Initialize with empty array on error
        setAddresses([]);
      }
    };

    fetchAddresses();
  }, []);

  const handleScheduleChange = (day: string) => {
    setSchedule(prevSchedule => {
      if (prevSchedule.includes(day)) {
        return prevSchedule.filter(d => d !== day);
      } else {
        return [...prevSchedule, day];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAddressId) {
      setError('Please select a delivery address');
      return;
    }
    
    if (isRecurring && schedule.length === 0) {
      setError('Please select at least one day for recurring delivery');
      return;
    }
    
    if (isRecurring && !startDate) {
      setError('Please select a start date for recurring delivery');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const orderData = {
        addressId: selectedAddressId,
        isRecurring,
        startDate: isRecurring ? startDate : new Date().toISOString().split('T')[0],
        ...(isRecurring ? { 
          ...(endDate ? { endDate } : {}),
          ...(schedule.length > 0 ? { schedule } : {})
        } : {})
      };
      
      console.log('Submitting order data:', orderData);
      await ordersAPI.createOrder(orderData);
      navigate('/order-success');
    } catch (err: any) {
      console.error('Failed to place order:', err);
      setError(err.response?.data?.message || 'Failed to place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        <h3 className="mb-4">Checkout</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Select Delivery Address</Form.Label>
            {addresses.length === 0 ? (
              <Alert variant="info">
                You don't have any saved addresses. Please add an address to continue.
              </Alert>
            ) : (
              addresses.map((address) => (
                <div key={address._id} className="mb-2">
                  <Form.Check
                    type="radio"
                    id={`address-${address._id}`}
                    name="addressId"
                    label={`${address.address}, ${address.city}, ${address.state} - ${address.pincode}`}
                    value={address._id}
                    checked={selectedAddressId === address._id}            
                    onChange={() => setSelectedAddressId(address._id)}
                  />
                </div>
              ))
            )}
            <Button 
              variant="outline-secondary" 
              size="sm" 
              className="mt-2"
              onClick={() => navigate('/profile/')}
            >
              Add New Address
            </Button>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              id="recurring-order"
              label="Set up recurring delivery"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="mb-3"
            />
            
            {isRecurring && (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>End Date (Optional)</Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group>
                  <Form.Label>Delivery Schedule</Form.Label>
                  <div className="d-flex flex-wrap">
                    {weekdays.map((day) => (
                      <Form.Check
                        key={day.value}
                        type="checkbox"
                        id={`day-${day.value}`}
                        label={day.label}
                        checked={schedule.includes(day.value)}
                        onChange={() => handleScheduleChange(day.value)}
                        className="me-3 mb-2"
                      />
                    ))}
                  </div>
                </Form.Group>
              </>
            )}
          </Form.Group>
          
          <div className="d-flex justify-content-between mt-4">
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate('/cart')}
            >
              Back to Cart
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading || addresses.length === 0}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CheckoutForm;