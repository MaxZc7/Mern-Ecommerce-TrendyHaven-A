import React, { useContext, useEffect, useState } from 'react';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../store';
import { useNavigate } from 'react-router-dom';

function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [PaymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'Paypal'
  );
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: PaymentMethodName,
    });
    localStorage.setItem('paymentMethod', PaymentMethodName);
    navigate('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={PaymentMethodName === 'Paypal'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
        </Form>

        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={PaymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">
              <a href="/placeorder">Submit</a>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PaymentMethodScreen;
