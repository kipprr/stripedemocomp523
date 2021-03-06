import React, {useContext} from 'react';
import {db} from './index.js';
import {loadStripe} from '@stripe/stripe-js';
import {UserContext} from './UserProvider';

 
const STRIPEPUBLICKEY = "pk_test_51Hild4Ck7G164RWSPuLOiwl0ZRL4U3u9EmHJQegcFC5f16m22AZ1Hzb0UfjUQhlvCf5WXdgn7xBY6Pncs75FBjmw00lZY9IVjq";
const stripePromise = loadStripe(STRIPEPUBLICKEY);

class StripeCheckout extends React.Component { 
    static contextType = UserContext;
    
    
    
    handleClick = async () => {
      // Get Stripe.js instance
    
      const stripe = await stripePromise;
  
    // Call your backend to create the Checkout Session
    
    const docRef = await db
      .collection('customers')
      .doc(this.context.user.uid)
      .collection('checkout_sessions')
      .add({
        price: 'price_1Hj9qZCk7G164RWSwd9UrSEN',
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