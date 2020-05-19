import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import AuthPage from "./pages/auth/auth.component";
import CheckoutPage from "./pages/checkout/checkout.component";

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          path="/signin"
          render={() =>
            this.props.currentUser ? <Redirect to="/" /> : <AuthPage />
          }
        />
      </Switch>
    </div>
  );
};

export default App;
