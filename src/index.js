import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import firebase from 'firebase/app';
import "firebase/database";

// Set the configuration for your app
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyCxUFp3R5sqvuEcwqZFn_OTGHxUSW_UG0M",
  authDomain: "stripedemo-dc2b3.firebaseapp.com",
  databaseURL: "https://stripedemo-dc2b3.firebaseio.com",
  projectId: "stripedemo-dc2b3",
  storageBucket: "stripedemo-dc2b3.appspot.com",
  messagingSenderId: "746425677564",
  appId: "1:746425677564:web:1a829a89848436cf20c979",
  measurementId: "G-8JNWE64PXS"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
