import React from "react";
import "./styles.css";
import StripeCheckout from './StripeCheckout';
import SignUp from './SignUp';
import { 
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from 'history';

// history allows us to change pages by pushing to history
export const page = createBrowserHistory();

export default function App() {
   
  return (
    <div className="App">
      <h1>COMP 523 Team H Demo: Stripe</h1>
      <h2>Let's checkout!</h2>
      <Router history={page}>
        <Switch>
          <Route path="/checkout" component={StripeCheckout} />
          <Route exact path="/" component={SignUp} />
        </Switch>
      </Router>

    </div>
  );
}
