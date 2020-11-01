import React from "react";
import "./styles.css";
import { Stripe, StripeCheckout } from 'stripe';

const STRIPE_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // TODO: PUT YOUR STRIPE PUBLISHABLE KEY HERE
const FIREBASE_FUNCTION = 'https://[YOUR_FIREBASE_PROJECT].cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE

const stripe = Stripe(STRIPE_PUBLIC_KEY);

const charge_amount = 500;
const charge_currency = 'usd';

// Store the elements used
const elForm = document.getElementById('form');
const elCheckout = document.getElementById('checkout');


export default function App() {

  function addCheckoutMethod() {
    const handler = StripeCheckout.configure({
        key: STRIPE_PUBLIC_KEY,
        locale: 'auto',
        token: async token => {

            // Pass the received token to our Firebase function
            let res = await charge(token, charge_amount, charge_currency);
            

            // Card successfully charged
            elForm.style.display = 'none';
            
        }
    });

    elCheckout.addEventListener('click', e => {
        e.preventDefault();
        handler.open({
            name: 'Firebase Example',
            amount: charge_amount,
            currency: charge_currency,
        });
    });

    // Close Checkout on page navigation
    window.addEventListener('popstate', () => handler.close());
}

// Function used to send the charge data to your Firebase function
async function charge(token, amount, currency) {
    const res = await fetch(FIREBASE_FUNCTION, {
        method: 'POST',
        body: JSON.stringify({
            token,
            charge: {
                amount,
                currency,
            },
        }),
    });
    const data = await res.json();
    data.body = JSON.parse(data.body);
    return data;
}
  return (
    <div className="App">
      <h1>COMP 523 Team H Demo: Stripe</h1>
      <h2>Let's checkout!</h2>

      <div>
        <form id="form">
            <button id="checkout" onClick={addCheckoutMethod()}>Use Checkout</button>
        </form>
    </div>

    </div>
  );
}
