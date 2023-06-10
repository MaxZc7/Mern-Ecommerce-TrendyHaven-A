import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import { Store } from '../store';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps';

function ShippingAdressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  useEffect(() => {
    if (!userInfo) navigate('/signin?redirect=/shipping');
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Adress</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3"> Shipping Adress</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              <input onSubmit={submitHandler}>
                <button type="submit">
                  <a href="/payment">Continue</a>
                </button>
              </input>{' '}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ShippingAdressScreen;
