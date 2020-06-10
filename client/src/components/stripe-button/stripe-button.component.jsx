import React from "react";
import {connect} from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

import {clearCart} from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, clearCart }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_ODnkCLAIYsVhjPJCm6lw2qXg";

  const onToken = (token) => {
    axios({
      url: 'http://localhost:5000/payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(res => {
      alert('Payment Successful');
      clearCart();
    }).catch(error => {
      console.log('Payment Error: ', JSON.stringify(error));
      alert('Please use the default credit card');
    });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your Total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart())
});

export default connect(null,mapDispatchToProps)(StripeCheckoutButton);
