import React, {useState, useContext} from 'react';
import {db, currentUser} from './index.js';
import {loadStripe} from '@stripe/stripe-js';
import UserContext from './UserProvider';
 
const stripePromise = loadStripe('pk_test_51Hild4Ck7G164RWSPuLOiwl0ZRL4U3u9EmHJQegcFC5f16m22AZ1Hzb0UfjUQhlvCf5WXdgn7xBY6Pncs75FBjmw00lZY9IVjq');


class StripeCheckout extends React.Component { 
    static contextType = UserContext;
    
    
    
    handleClick = async () => {
      // Get Stripe.js instance
    
      const stripe = await stripePromise;

    // console.log(this.context);
    // console.log(this.context.state);
    // console.log(this.context.state.user);
    // console.log(this.context.state.user.uid);
  
    // Call your backend to create the Checkout Session
    
    const docRef = await db
      .collection('customers')
      .doc('3CpZcLVF8yfLoPcZ1dYIhGNK6UE3')
      .collection('checkout_sessions')
      .add({
        price: 'price_1Hir87Ck7G164RWS600cMmlw',
        success_url: window.location.origin + '/success',
        cancel_url: window.location.origin + '/checkout',
      });
    // Wait for the CheckoutSession to get attached by the extension
    docRef.onSnapshot((snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and then inspect your function logs.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        stripe.redirectToCheckout({ sessionId });
      }
    });
    }

    render() {
        return(
            <button role="link" onClick={this.handleClick}>
                Checkout
            </button>
        )
    }
}






export default StripeCheckout;