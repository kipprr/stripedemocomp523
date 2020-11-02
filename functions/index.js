

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Create user in firestore
exports.createUser = functions.auth.user().onCreate(async (user) => {
    await admin.firestore().collection('users').doc(user.uid).set({ email: user.email });
    return; 
});


// Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const stripe = require('stripe')(functions.config().stripe.token);

//Create Stripe customer when a user is created in Firebase
exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  const customer = await stripe.customers.create({ email: user.email });
  await admin.firestore().collection('customers').doc(user.uid).set({
    customer_id: customer.id,
  });
  return;
});
