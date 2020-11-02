import React, {useContext} from "react";
import "./styles.css";
import StripeCheckout from './StripeCheckout';
import SignUp from './SignUp';
import { 
  Router,
  Switch,
  Route
} from "react-router-dom";
import UserContext from './UserProvider';
import { createBrowserHistory } from 'history';
import UserProvider from './UserProvider';
import Success from './Success';

// history allows us to change pages by pushing to history
export const page = createBrowserHistory();

export default function App() {
   
  return (
    <UserProvider>
    <div className="App">
      <h1>COMP 523 Team H Demo: Stripe</h1>
      <h2>Let's checkout!</h2>
      <Router history={page}>
        <Switch>
          <Route path="/checkout">
          {<StripeCheckout/>} 
            </Route>
          <Route path="/success">
          {<Success/>} 
            </Route> />
          <Route exact path="/">
          {<SignUp/>} 
            </Route>
        </Switch>
      </Router>
    </div>
    </UserProvider>
  );
}
